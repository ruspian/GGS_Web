import React, { useState, useEffect } from 'react';
import { Upload, Image, Divider, Button, Skeleton, List, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EditProfilAdminModalComponent from './EditProfilAdminModalComponent';
import AddProfilAdminComponent from './AddProfilAdminComponent';
import { useForm } from 'antd/es/form/Form'; // Pastikan useForm diimpor dari sini
import { addToast } from '@heroui/toast';
import FetchFromAxios from '../utils/AxiosUtil';
import getAPI from '../common/getAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setAbout } from '../store/aboutSliceRedux';
import dayjs from 'dayjs';

const ProfilAdminComponent = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [loadingProfil, setLoadingProfil] = useState(true);
  const [profilData, setProfilData] = useState(null); // Akan menyimpan satu objek profil atau null

  // Perbaikan: Destructure array dari useForm()
  const [form] = useForm(); // Ini adalah instance form untuk EditProfilAdminModalComponent

  const dispatch = useDispatch();

  const aboutRedux = useSelector((state) => state.about);
  console.log("ProfilAdminComponent: aboutRedux =", aboutRedux);


  // Fungsi untuk mengambil data profil dari backend
  const fetchAboutData = async () => {
    setLoadingProfil(true);
    try {
      const response = await FetchFromAxios({
        ...getAPI.getAbout
      });

      if (response.data.success && response.data.data) {
        let fetchedData = response.data.data;
        // Jika backend mengembalikan array, ambil elemen pertama
        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          fetchedData = fetchedData[0];
        } else if (Array.isArray(fetchedData) && fetchedData.length === 0) {
          fetchedData = null; // Jika array kosong, set ke null
        }



        setProfilData(fetchedData); // Simpan data profil ke state lokal 
        dispatch(setAbout(fetchedData)); // Dispatch data  ke Redux

      } else {
        setProfilData(null); // Tidak ada data profil atau gagal
      }
    } catch (error) {
      console.error("Error fetching profil data:", error);
      setProfilData(null); // Pastikan data kosong jika ada error
      const errorMessage = error.response?.data?.message || "Kesalahan mengambil data profil.";
      addToast({ title: errorMessage, variant: 'error' });
    } finally {
      setLoadingProfil(false);

    }
  };

  // Panggil fungsi fetchAboutData saat komponen pertama kali dimuat
  useEffect(() => {
    fetchAboutData();
  }, [dispatch]); // Ditambahkan dispatch ke dependencies

  console.log("ProfilAdminComponent: profilData =", profilData);

  // Fungsi untuk menampilkan modal "Buat Profil"
  const showModalAdd = () => {
    setIsModalOpenAdd(true);
  };

  // Fungsi untuk menangani pembatalan di modal "Buat Profil"
  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  // Fungsi untuk menangani sukses pembuatan profil dari AddProfilAdminComponent
  const handleAddSuccess = (newProfileData) => {
    // Refresh data setelah berhasil membuat profil baru
    fetchAboutData();
    setProfilData(newProfileData);
    setIsModalOpenAdd(false);
  };

  // Fungsi untuk menampilkan modal "Edit Profil"
  const showModalEdit = () => {
    // Hanya buka modal edit jika ada data profil yang tersedia
    if (profilData) {
      setIsModalOpenEdit(true);
    } else {
      addToast({ title: "Tidak ada profil untuk diedit. Buat profil terlebih dahulu.", variant: "info" });
    }
  };

  // Fungsi untuk menangani pembatalan di modal "Edit Profil"
  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
  };

  // Fungsi untuk menangani sukses edit profil dari EditProfilAdminModalComponent
  const handleEditSuccess = (updatedProfileData) => {
    // Refresh data setelah berhasil mengedit profil
    fetchAboutData();
    setProfilData(updatedProfileData);
    setIsModalOpenEdit(false);
  };

  // Fungsi handle change gambar (untuk Upload Ant Design)
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  // Fungsi handle preview gambar
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // Fungsi helper untuk konversi file ke base64 
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Fungsi tombol upload untuk Ant Design Upload
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  // Tampilkan skeleton/loading state jika data profil sedang diambil
  if (loadingProfil) {
    return (
      <div className='container w-screen mx-auto py-4'>
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  return (
    <div className='container w-screen mx-auto py-4'>
      <div className='w-full'>
        <h1 className='text-3xl font-bold text-emerald-600'>Profil</h1>
        <hr className='border text-gray-400 w-full mt-2' />
      </div>
      <div className='my-4 w-full'>
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload" // Ganti dengan endpoint upload gambar Anda yang sebenarnya
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          maxCount={1} // Batasi hanya satu gambar profil
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

      {/* Hanya tampilkan jika profilData ada */}
      {profilData ? (
        <div className='grid grid-cols-1 mr-7'>
          <div className='px-3'>
            <Divider orientation="left" orientationMargin="0" className='text-gray-600 text-lg font-bold'>
              Nama Organisasi
            </Divider>
            <p className='text-sm'>
              {profilData?.name || 'Belum ada data'}
            </p>
          </div>

          <div className='px-3'>
            <Divider orientation="left" orientationMargin="0" className='text-gray-600 text-lg font-bold'>
              Tanggal Berdiri
            </Divider>
            <p className='text-sm'>
              {profilData?.tanggal ? dayjs(profilData.tanggal).format('DD-MM-YYYY') : 'Belum ada data'}
            </p>
          </div>

          <div className='px-3'>
            <Divider orientation="left" orientationMargin="0" className='text-gray-600 text-lg font-bold text-justify'>
              Visi
            </Divider>
            <p className='text-sm'>
              {profilData?.visi || 'Belum ada data'}
            </p>
          </div>

          <div className='px-3'>
            <Divider orientation="left" orientationMargin="0" className='text-gray-600 text-lg font-bold text-justify'>
              Misi
            </Divider>
            {/* Jika misi adalah array, tampilkan sebagai daftar */}
            {profilData?.misi && Array.isArray(profilData.misi) && profilData.misi.length > 0 ? (
              <List
                bordered
                size="small"
                dataSource={profilData.misi}
                renderItem={(item, index) => (
                  <List.Item>
                    <Typography.Text mark>{index + 1}. </Typography.Text>{item}
                  </List.Item>
                )}
              />
            ) : (
              <p className='text-sm'>Belum ada misi</p>
            )}
          </div>

          <div className='px-3'>
            <Divider orientation="left" orientationMargin="0" className='text-gray-600 text-lg font-bold text-justify'>
              Tentang
            </Divider>
            <p className='text-sm text-justify'>
              {profilData?.about || 'Belum ada data'}
            </p>
          </div>
        </div>
      ) : (
        // Tampilkan pesan jika tidak ada data profil
        <div className='py-8 text-center text-gray-500'>
          <p>Belum ada data profil. Silakan buat profil baru.</p>
        </div>
      )}


      <div className='flex items-end justify-end my-8 gap-2 mx-12'>
        {/* Tombol "Buat Profil" hanya muncul jika belum ada profil */}
        {!profilData && (
          <Button type='primary' size='large' onClick={showModalAdd}>
            Buat Profil
          </Button>
        )}
        {/* Tombol "Edit Profil" hanya muncul jika sudah ada profil */}
        {profilData && (
          <Button type='primary' size='large' onClick={showModalEdit}>
            Edit Profil
          </Button>
        )}

        {/* Modal "Edit Profil"  */}
        {isModalOpenEdit && (
          <EditProfilAdminModalComponent
            isModalOpenEdit={isModalOpenEdit}
            setIsModalOpenEdit={setIsModalOpenEdit}
            handleCancelEdit={handleCancelEdit}
            initialValues={profilData} // Meneruskan data profil untuk diisi di form edit
            form={form} // Meneruskan instance form
            onEditSuccess={handleEditSuccess} // Callback saat edit berhasil
          />
        )}

        {/* Modal "Buat Profil"  */}
        {isModalOpenAdd && (
          <AddProfilAdminComponent
            isModalOpenAdd={isModalOpenAdd}
            setIsModalOpenAdd={setIsModalOpenAdd}
            handleCancelAdd={handleCancelAdd}
            initialValues={{}}
            onAddSuccess={handleAddSuccess} // Callback saat profil berhasil dibuat
          />
        )}
      </div>
    </div>
  );
}

export default ProfilAdminComponent;
