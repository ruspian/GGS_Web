import React, { useState } from 'react'
import { Upload, Image, Divider, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EditProfilAdminModalComponent from './EditProfilAdminModalComponent';
import { useForm } from 'antd/es/form/Form';


const ProfilAdminComponent = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // hook form dari antd
  const [form] = useForm();

  // fungsi change date
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };


  // fungsi tampilkan modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // fungsi handle klik ok
  const handleOk = () => {
    // ambil value dari form
    const value = form.getFieldsValue("name", "visi", "misi", 'date');
    console.log("value", value);
    setIsModalOpen(false);
  };

  // fungsi handle klik cancel
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // fungsi handle change gambar
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  // fungsi handle prefiew
  const handlePreview = file => {
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // fungsi tombol upload
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );


  return (
    <div className='container w-screen mx-auto py-4'>
      <div className='w-full'>
        <h1 className='text-3xl font-bold text-emerald-600'>Profil</h1>
        <hr className='border text-gray-400 w-full mt-2' />
      </div>
      <div className='my-4 w-full'>
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}

        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        {previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen,
              onVisibleChange: visible => setPreviewOpen(visible),
              afterOpenChange: visible => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 mr-7 '>
        <div className='px-3'>
          <Divider orientation="left" orientationMargin="0" className='text-gray-600 text-lg font-bold'>
            Nama Organisasi
          </Divider>
          <p className='text-sm'>
            Gorontalo Green School
          </p>
        </div>

        <div className='px-3'>
          <Divider orientation="left" orientationMargin="0" className='text-gray-600 text-lg font-bold'>
            Tanggal Berdiri
          </Divider>
          <p className='text-sm'>
            25-05-2025
          </p>
        </div>

        <div className='px-3'>
          <Divider orientation="left" orientationMargin="0" className='text-gray-600 text-lg font-bold text-justify'>
            Visi
          </Divider>
          <p className='text-sm'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum hic deserunt sint dignissimos odit nam, praesentium voluptate sit quasi fugit. Officia sit quaerat nam delectus, saepe aspernatur expedita earum amet?
          </p>
        </div>

        <div className='px-3'>
          <Divider orientation="left" orientationMargin="0" className='text-gray-600 text-lg font-bold text-justify'>
            Misi
          </Divider>
          <p className='text-sm'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum hic deserunt sint dignissimos odit nam, praesentium voluptate sit quasi fugit. Officia sit quaerat nam delectus, saepe aspernatur expedita earum amet?
          </p>
        </div>

        <div className='px-3'>
          <Divider orientation="left" orientationMargin="0" className='text-gray-600 text-lg font-bold text-justify'>
            Tetang
          </Divider>
          <p className='text-sm'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum hic deserunt sint dignissimos odit nam, praesentium voluptate sit quasi fugit. Officia sit quaerat nam delectus, saepe aspernatur expedita earum amet?
          </p>
        </div>
      </div>

      <div className='flex items-end justify-end my-4 gap-2 mx-12'>
        <Button color='green' variant='solid' size='large' onClick={showModal}>
          Edit Profil
        </Button>
        <EditProfilAdminModalComponent isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} form={form} onChange={onChange} />

      </div>

    </div>
  )
}

export default ProfilAdminComponent
