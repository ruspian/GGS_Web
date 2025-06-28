import { DatePicker, Modal, Form, Input, Button } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import getAPI from '../common/getAPI';
import FetchFromAxios from '../utils/AxiosUtil';
import { addToast } from '@heroui/toast';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { editAbout } from '../store/aboutSliceRedux'; // Pastikan action editAbout sudah benar

const EditProfilAdminModalComponent = ({ isModalOpenEdit, setIsModalOpenEdit, handleCancelEdit, initialValues, onEditSuccess }) => {
  const { TextArea } = Input;

  const dispatch = useDispatch();

  // Inisialisasi hook form dari Ant Design
  const [form] = useForm();

  // Gunakan useEffect untuk mengisi form ketika initialValues atau isModalOpenEdit berubah
  useEffect(() => {
    if (isModalOpenEdit && initialValues) {
      // Pastikan tanggal diformat sebagai objek dayjs
      const formattedInitialValues = {
        ...initialValues,
        tanggal: initialValues.tanggal ? dayjs(initialValues.tanggal) : null,
      };

      // Mengisi form dengan nilai-nilai awal
      form.setFieldsValue(formattedInitialValues);
    } else if (!isModalOpenEdit) {
      // Reset form ketika modal ditutup
      form.resetFields();
    }
  }, [isModalOpenEdit, initialValues, form]);

  // Fungsi handle klik ok
  const handleOkEdit = async () => {
    try {
      // validasi semua field form dan mengambil nilainya
      const values = await form.validateFields();

      // konversi objek dayjs dari DatePicker menjadi ISO string untuk backend
      const formattedTanggal = values.tanggal && dayjs.isDayjs(values.tanggal)
        ? values.tanggal.toISOString()
        : null;

      // config data UPDATE
      let apiConfig = {
        ...getAPI.editAbout,
        data: {
          _id: initialValues._id,
          name: values.name,
          visi: values.visi,
          misi: values.misi,
          about: values.about,
          tanggal: formattedTanggal,
        }
      };

      // Memanggil API untuk mengirim data
      const response = await FetchFromAxios(apiConfig);

      // Jika operasi di backend gagal
      if (!response.data.success) {
        addToast({ title: response.data.message, variant: 'error' });
        return; // Hentikan eksekusi jika gagal
      }


      // Jika operasi berhasil
      addToast({ title: response.data.message, variant: 'success' });

      // Pastikan data yang didispatch ke Redux sudah serializable
      const serializableResponseData = { ...response.data.data };
      if (serializableResponseData.tanggal && dayjs.isDayjs(serializableResponseData.tanggal)) {
        serializableResponseData.tanggal = serializableResponseData.tanggal.toISOString();
      }


      dispatch(editAbout(serializableResponseData)); // Dispatch data yang sudah serializable

      setIsModalOpenEdit(false);
      form.resetFields();

      // Pastikan data yang diteruskan ke onEditSuccess juga serializable
      if (onEditSuccess) {
        onEditSuccess(serializableResponseData);
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
        title='Edit Profil'
        styles={{
          mask: {
            backdropFilter: 'blur(10px)'
          },
          content: {
            boxShadow: '0 0 30px #999',
          },
        }}
        closable={{ 'aria-label': 'Tombol Tutup Kustom' }}
        open={isModalOpenEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
        >
          {/* Field Nama Organisasi */}
          <Form.Item
            name="name"
            label="Nama Organisasi"
            rules={[{ required: true, message: 'Mohon masukkan nama organisasi!' }]}
          >
            <Input placeholder='Nama Organisasi' />
          </Form.Item>

          {/* Field Tanggal Berdiri */}
          <Form.Item
            name="tanggal"
            label="Tanggal Berdiri"
            rules={[{ required: true, message: 'Mohon pilih tanggal berdiri!' }]}
          >
            <DatePicker className='w-full' />
          </Form.Item>

          {/* Field Visi */}
          <Form.Item
            name="visi"
            label="Visi"
            rules={[{ required: true, message: 'Mohon masukkan visi!' }]}
          >
            <TextArea placeholder="Visi" autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>

          {/* Dynamic Field: Misi */}
          <Form.List
            name="misi"
            rules={[
              {
                validator: async (_, misiItems) => {
                  // Validasi untuk memastikan setidaknya ada satu misi
                  if (!misiItems || misiItems.length === 0) {
                    return Promise.reject(new Error('Mohon masukkan setidaknya satu misi!'));
                  }
                  // Pastikan tidak ada field misi yang kosong
                  if (misiItems.some(item => !item || String(item).trim() === '')) {
                    return Promise.reject(new Error('Misi tidak boleh kosong!'));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }) => (
              <>
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
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="text-gray-500 hover:text-red-500 cursor-pointer text-lg"
                        onClick={() => remove(name)}
                      />
                    ) : null}
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Tambah Misi
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* Field Tentang */}
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

export default EditProfilAdminModalComponent;
