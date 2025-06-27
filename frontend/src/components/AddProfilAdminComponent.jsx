import { DatePicker, Modal, Form, Input, Button } from 'antd';
import { useForm } from 'antd/es/form/Form';
import getAPI from '../common/getAPI';
import FetchFromAxios from '../utils/AxiosUtil';
import { addToast } from '@heroui/toast';
import dayjs from 'dayjs';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const AddProfilAdminComponent = ({ isModalOpenAdd, setIsModalOpenAdd, handleCancelAdd, onAddSuccess }) => {
  const { TextArea } = Input;


  // Inisialisasi hook form dari Ant Design
  const [form] = useForm();

  // Fungsi handle klik ok
  const handleOkAdd = async () => {
    try {
      const values = await form.validateFields();

      // Atur format tanggal
      const formattedTanggal = values.tanggal && dayjs.isDayjs(values.tanggal)
        ? values.tanggal.toISOString()
        : null;

      // Konfigurasi API untuk membuat profil baru
      let apiConfig = {
        ...getAPI.createAbout,
        data: {
          name: values.name,
          visi: values.visi,
          misi: values.misi,
          about: values.about,
          tanggal: formattedTanggal,
        }
      };

      // Panggil API untuk mengirim data
      const response = await FetchFromAxios(apiConfig);

      console.log("AddProfilAdminComponent: response =", response);

      // Jika operasi di backend gagal
      if (!response.data.success) {
        addToast({ title: response.data.message, variant: 'error' });
        return; // Hentikan eksekusi jika gagal
      }

      // Jika operasi berhasil
      addToast({ title: response.data.message, variant: 'success' });

      // Tutup modal
      setIsModalOpenAdd(false);
      // Kosongkan form
      form.resetFields();

      // Panggil callback onAddSuccess untuk memberitahu komponen induk
      // bahwa operasi berhasil, dan teruskan data yang baru dibuat.
      // Pastikan data yang diteruskan ke onAddSuccess sudah serializable 
      if (onAddSuccess) {
        const serializableResponseData = { ...response.data.data };
        if (serializableResponseData.tanggal && dayjs.isDayjs(serializableResponseData.tanggal)) {
          serializableResponseData.tanggal = serializableResponseData.tanggal.toISOString();
        }
        onAddSuccess(serializableResponseData);
      }


    } catch (errorInfo) {
      // Penanganan error
      let errorMessage = "Terjadi kesalahan. Silakan coba lagi nanti!";

      // Cek jika error berasal dari validasi form Ant Design
      if (errorInfo.errorFields) {
        errorMessage = "Mohon lengkapi semua field yang wajib.";
        errorInfo.errorFields.forEach(field => {
          addToast({ title: field.errors[0], variant: 'error' });
        });
      } else if (errorInfo.response && errorInfo.response.data && errorInfo.response.data.message) {
        // Error dari respons API
        errorMessage = errorInfo.response.data.message;
      } else if (errorInfo.message) {
        // Error umum Axios atau error lainnya
        errorMessage = errorInfo.message;
      }

      addToast({ title: errorMessage, variant: 'error' });
    }
  };


  return (
    <>
      <Modal
        title='Buat Profil'
        styles={{
          mask: {
            backdropFilter: 'blur(10px)'
          },
          content: {
            boxShadow: '0 0 30px #999',
          },
        }}
        closable={{ 'aria-label': 'Tombol Tutup Kustom' }}
        open={isModalOpenAdd}
        onOk={handleOkAdd}
        onCancel={handleCancelAdd}
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
        >
          {/* Nama Organisasi */}
          <Form.Item
            name="name"
            label="Nama Organisasi"
            rules={[{ required: true, message: 'Mohon masukkan nama organisasi!' }]}
          >
            <Input placeholder='Nama Organisasi' />
          </Form.Item>

          {/* tanggal */}
          <Form.Item
            name="tanggal"
            label="Tanggal Berdiri"
            rules={[{ required: true, message: 'Mohon pilih tanggal berdiri!' }]}
          >
            <DatePicker className='w-full' />
          </Form.Item>

          {/* Visi */}
          <Form.Item
            name="visi"
            label="Visi"
            rules={[{ required: true, message: 'Mohon masukkan visi!' }]}
          >
            <TextArea placeholder="Visi" autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>

          {/* Misi  */}
          <Form.List
            name="misi"
            rules={[
              {
                validator: async (_, misiItems) => {
                  if (!misiItems || misiItems.length === 0) {
                    return Promise.reject(new Error('Mohon masukkan setidaknya satu misi!'));
                  }
                  // Validasi setiap item misi agar tidak kosong
                  if (misiItems.some(item => !item || String(item).trim() === '')) {
                    return Promise.reject(new Error('Misi tidak boleh kosong!'));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }) => (
              <>
                {/* Judul untuk bagian Misi */}
                <div className="text-base font-medium text-gray-800 mb-2">Misi</div>
                {fields.map(({ key, name, ...restField }, index) => (
                  <div key={key} className="flex items-center gap-2 mb-2">
                    <Form.Item
                      {...restField}
                      name={[name]}
                      rules={[{ required: true, message: 'Misi tidak boleh kosong!' }]}
                      className="flex-1 mb-0"
                    >
                      <TextArea
                        placeholder={`Misi ${index + 1}`}
                        autoSize={{ minRows: 1, maxRows: 3 }}
                        className="w-full"
                      />
                    </Form.Item>
                    {/* Tombol Hapus Misi */}
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="text-gray-500 hover:text-red-500 cursor-pointer text-lg"
                        onClick={() => remove(name)}
                      />
                    ) : null}
                  </div>
                ))}
                {/* Tombol Tambah Misi */}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Tambah Misi
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* Tentang  */}
          <Form.Item
            name="about"
            label="Tentang"
            rules={[{ required: true, message: 'Mohon masukkan deskripsi tentang!' }]}
          >
            <TextArea placeholder="Tentang" autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddProfilAdminComponent;
