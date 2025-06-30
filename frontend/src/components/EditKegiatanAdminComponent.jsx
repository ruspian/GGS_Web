import { DatePicker, Modal, Form, Input, Button, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import getAPI from '../common/getAPI';
import FetchFromAxios from '../utils/AxiosUtil';
import { addToast } from '@heroui/toast';
import dayjs from 'dayjs';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { uploadFileToBackend } from '../utils/uploadImageToBackend'; // Import utilitas upload

const EditKegiatanAdminComponent = ({ isModalOpen, initialValues, onEditSuccess, handleCancel }) => {
  const { TextArea } = Input;
  const [form] = useForm();

  const [fileList, setFileList] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);


  // Efek untuk mengisi form dan fileList ketika modal dibuka atau initialValues berubah
  useEffect(() => {
    if (isModalOpen && initialValues) {

      // Pastikan tanggal diformat sebagai objek dayjs
      const formattedInitialValues = {
        ...initialValues,
        date: initialValues.date ? dayjs(initialValues.date) : null,
      };
      form.setFieldsValue(formattedInitialValues);

      // Menginisialisasi fileList dan uploadedImageUrls dengan gambar yang sudah ada
      if (initialValues.image && Array.isArray(initialValues.image) && initialValues.image.length > 0) {
        const existingFiles = initialValues.image.map((url, index) => ({
          uid: `${initialValues._id || 'temp'}-${index}-${Math.random().toString(36).substring(7)}`,// UID unik
          name: `foto-${index + 1}.png`,
          status: 'done',
          url: url,
          response: { url: url }
        }));
        setFileList(existingFiles);
        setUploadedImageUrls(initialValues.image);
      } else {
        setFileList([]);
        setUploadedImageUrls([]);
      }
    } else if (!isModalOpen) {
      // Reset form dan state fileList/uploadedImageUrls saat modal ditutup
      form.resetFields();
      setFileList([]);
      setUploadedImageUrls([]);
    }
  }, [isModalOpen, initialValues, form]);



  // Fungsi customRequest untuk mengunggah SATU file menggunakan Axios
  const handleUploadImage = async (options) => {
    const { file, onSuccess, onError } = options;

    try {
      const resultUrl = await uploadFileToBackend(file, 'kegiatan_foto');

      if (resultUrl) {
        onSuccess({ url: resultUrl }, file);
      } else {
        onError(new Error("URL gambar tidak ditemukan setelah unggah."));
      }
    } catch (error) {
      onError(error);
      addToast({ title: error.message || "Gagal mengunggah gambar." });
    }
  };

  // Fungsi onChange untuk Ant Design Upload
  const handleChange = async ({ file, fileList: newFileList }) => {
    setFileList(newFileList); // Update state fileList

    if (file.status === 'done') {
      const uploadedUrl = file.response?.url; // Ambil URL dari respons customRequest Anda
      if (uploadedUrl) {
        setUploadedImageUrls(prevUrls => {
          // Hanya tambahkan jika belum ada 
          if (!prevUrls.includes(uploadedUrl)) {
            return [...prevUrls, uploadedUrl];
          }
          return prevUrls;
        });
        addToast({ title: "Gambar berhasil diunggah!", variant: 'success' });
      } else {
        addToast({ title: "URL gambar tidak ditemukan dari respons unggahan.", variant: 'error' });
      }
    } else if (file.status === 'error') {
      addToast({ title: file.response?.message || "Gagal mengunggah gambar.", variant: 'error' });
    } else if (file.status === 'removed') {
      const removedUrl = file.url || file.response?.url;
      if (removedUrl) {
        setUploadedImageUrls(prevUrls => prevUrls.filter(url => url !== removedUrl));
      }
      addToast({ title: "Gambar dihapus.", variant: 'info' });
    }
  };


  // Fungsi handle klik ok untuk submit edit kegiatan
  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Validasi semua field form

      const formattedDate = values.date && dayjs.isDayjs(values.date)
        ? values.date.toISOString()
        : null;

      const dataToUpdate = {
        _id: initialValues._id,
        name: values.name,
        date: formattedDate,
        description: values.description,
        image: uploadedImageUrls,
      };


      // Panggil API untuk mengupdate data kegiatan
      const response = await FetchFromAxios({
        ...getAPI.editKegiatan,
        data: dataToUpdate,
      });


      if (!response.data.success) {
        addToast({ title: response.data.message, variant: 'error' });
        return;
      }

      addToast({ title: response.data.message, variant: 'success' });

      handleCancel();
      if (onEditSuccess) {
        onEditSuccess(response.data.data);
      }

    } catch (errorInfo) {
      let errorMessage = "Terjadi kesalahan. Silakan coba lagi nanti!";
      if (errorInfo.errorFields) {
        errorMessage = "Mohon lengkapi semua field yang wajib.";
        errorInfo.errorFields.forEach(field => {
          console.error(`Validasi Gagal pada field: ${field.name.join('.')}, Pesan: ${field.errors.join(', ')}`);
        });
      } else if (errorInfo.response && errorInfo.response.data && errorInfo.response.data.message) {
        errorMessage = errorInfo.response.data.message;
      } else if (errorInfo.message) {
        errorMessage = errorInfo.message;
      }
      addToast({ title: errorMessage, variant: 'error' });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Modal
      title="Edit Kegiatan"
      styles={{
        mask: { backdropFilter: 'blur(10px)' },
        content: { boxShadow: '0 0 30px #999' },
      }}
      closable={{ 'aria-label': 'Tombol Tutup Kustom' }}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item name="name" label="Nama Kegiatan" rules={[{ required: true, message: 'Mohon masukkan nama kegiatan!' }]}>
          <Input placeholder='Nama Kegiatan' />
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
            customRequest={handleUploadImage}
            fileList={fileList}
            onChange={handleChange}
            listType="picture-card"
            multiple={true}
            beforeUpload={(file) => {
              const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
              if (!isJpgOrPng) {
                addToast({ title: 'Anda hanya bisa mengunggah file JPG/PNG!', variant: 'error' });
              }
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isLt2M) {
                addToast({ title: 'Ukuran gambar tidak boleh lebih dari 2MB!', variant: 'error' });
              }
              return (isJpgOrPng && isLt2M) || Upload.LIST_IGNORE;
            }}
          >

            {fileList.length < 5 && uploadButton}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditKegiatanAdminComponent;