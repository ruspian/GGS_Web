import { Button, DatePicker, Modal, Upload, Form, Input } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import { uploadFileToBackend } from '../utils/uploadImageToBackend';
import { addToast } from '@heroui/react';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import FetchFromAxios from '../utils/AxiosUtil';
import dayjs from 'dayjs';
import getAPI from '../common/getAPI';
// import { useDispatch } from 'react-redux';
// import { addKegiatanThunk } from '../store/kegiatanSliceRedux';


const AddKegiatanAdminComponent = ({ isAddModalOpen, handleCancelAdd, onAddSuccess }) => {
  const [fileList, setFileList] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);


  // const dispatch = useDispatch();
  const { TextArea } = Input;

  const [form] = useForm();

  // fungsi upload gambar
  const handleUpladImage = async (options) => {
    const { file, onSuccess, onError } = options;

    try {
      // upload gambar ke backend
      const uploadUrl = await uploadFileToBackend(file, 'kegiatan');

      // jika gagal upload, tampilkan error
      if (!uploadUrl) {
        onError(new Error('Gagal mengupload gambar'));
      }

      // jika berhasil upload
      onSuccess({ url: uploadUrl }, file);  // url adalah URL gambar yang diupload


    } catch (error) {
      onError(error);
      addToast({ title: error })
    }

  }

  const handleUploadChange = ({ file, fileList: newFileList }) => {
    setFileList(newFileList);

    // cek status file
    if (file.status === 'done') {
      const uploadedUrl = file.response?.url;
      if (uploadedUrl) {
        // Tambahkan URL gambar yang berhasil ke state uploadedImageUrls
        setUploadedImageUrls(prevUrls => {
          // Pastikan tidak ada duplikasi URL jika file diganti
          if (!prevUrls.includes(uploadedUrl)) {
            return [...prevUrls, uploadedUrl];
          }
          return prevUrls;
        });

      } else {
        addToast({ title: "URL gambar tidak ditemukan dari respons unggahan.", variant: 'error' });
      }
    } else if (file.status === 'removed') {
      // Jika file dihapus dari daftar unggahan
      const removedUrl = file.url || file.response?.url; // Ambil URL file yang dihapus
      if (removedUrl) {
        setUploadedImageUrls(prevUrls => prevUrls.filter(url => url !== removedUrl));
      }

    } else if (file.status === 'error') {
      // Tampilkan pesan error 
      addToast({ title: file.response?.message || "Gagal mengunggah gambar.", variant: 'error' });
    }
  };



  const handleOkAdd = async () => {
    try {
      const values = await form.validateFields(); // Validasi semua field form

      // Atur format tanggal ke ISO string
      const formattedDate = values.date && dayjs.isDayjs(values.date)
        ? values.date.toISOString()
        : null;

      // Data yang akan dikirim ke backend
      const dataToSend = {
        name: values.name,
        date: formattedDate,
        description: values.description,
        image: uploadedImageUrls,
      };


      const response = await FetchFromAxios({
        ...getAPI.createKegiatan,
        data: dataToSend,
      });

      if (!response.data.success) {
        addToast({ title: response.data.message, variant: 'error' });
        return;
      }

      addToast({ title: response.data.message, variant: 'success' });

      // panggil thunk redux
      // const addKegiatanFromThunkRedux = await dispatch(addKegiatanThunk(dataToSend));

      // // jika berhasil
      // if (addKegiatanThunk.fulfilled.match(addKegiatanFromThunkRedux)) {
      //   addToast({ title: addKegiatanFromThunkRedux.payload, variant: 'success' });
      // } else {
      //   // jika gagal
      //   const errorMessage = addKegiatanFromThunkRedux.payload || "Gagal menambahkan kegiatan!";
      //   addToast({ title: errorMessage, variant: 'error' });
      //   console.log(errorMessage);

      //   return
      // }

      form.resetFields();  // kosokan form setelah sukses
      setFileList([]); // Kosongkan tampilan Upload
      setUploadedImageUrls([]); // Kosongkan URL gambar yang diunggah

      // Tutup modal setelah sukses
      handleCancelAdd();

      if (onAddSuccess) {
        onAddSuccess();
      }

    } catch (errorInfo) {
      let errorMessage = "Terjadi kesalahan. Silakan coba lagi nanti!";
      if (errorInfo.errorFields) {
        errorMessage = "Mohon lengkapi semua field yang wajib.";
        errorInfo.errorFields.forEach(field => {
          addToast({ title: field.errors[0], variant: 'error' });
          console.log(field.errors[0]);

        });
      } else if (errorInfo.response && errorInfo.response.data && errorInfo.response.data.message) {
        console.log(errorInfo.response.data.message);

        errorMessage = errorInfo.response.data.message;
      } else if (errorInfo.message) {
        console.log(errorInfo.message);

        errorMessage = errorInfo.message;
      }
      addToast({ title: errorMessage, variant: 'error' });

    }
  };

  return (
    <>
      <Modal
        title="Tambah Kegiatan"
        styles={{
          mask: {
            backdropFilter: 'blur(10px)'
          },
          content: {
            boxShadow: '0 0 30px #999',
          },
        }}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isAddModalOpen}
        onOk={handleOkAdd}
        onCancel={handleCancelAdd}
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item name="name" label="Nama Kegiatan" rules={[{ required: true, message: 'Mohon masukkan nama kegiatan!' }]}>
            <Input placeholder='Nama' />
          </Form.Item>
          <Form.Item name="date" label="Tanggal Kegiatan" rules={[{ required: true, message: 'Mohon pilih tanggal kegiatan!' }]}>
            <DatePicker className='w-full' />
          </Form.Item>
          <Form.Item name="description" label="Deskripsi" rules={[{ required: true, message: 'Mohon masukkan deskripsi kegiatan!' }]}>
            <TextArea placeholder="Deskripsi Kegiatan" autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>
          <Form.Item label="Foto Kegiatan" rules={[{
            validator: () => (fileList.length > 0 ? Promise.resolve() : Promise.reject('Mohon unggah setidaknya satu foto!')),
          }]}>
            <Upload
              customRequest={handleUpladImage}
              fileList={fileList} // state fileList 
              onChange={handleUploadChange}
              listType="picture-card"
              multiple={true}
              beforeUpload={(file) => {
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                  addToast({ title: 'Anda hanya bisa mengunggah file JPG/PNG!', variant: 'error' });
                }
                const isLt2M = file.size / 1024 / 1024 < 2; // Batasi 2MB per file
                if (!isLt2M) {
                  addToast({ title: 'Ukuran gambar tidak boleh lebih dari 2MB!', variant: 'error' });
                }
                // Abaikan file jika validasi gagal
                return (isJpgOrPng && isLt2M) || Upload.LIST_IGNORE;
              }}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddKegiatanAdminComponent
