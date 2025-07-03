import { Image, List, Skeleton, Empty, Typography, Button } from 'antd';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKegiatanThunk } from '../store/kegiatanSliceRedux';
import { addToast, Spinner } from '@heroui/react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
// import { setGaleri } from '../store/galeriSliceRedux';

dayjs.locale('id');

const GaleriAdminComponent = () => {

  const kegiatanData = useSelector((state) => state.kegiatan.data);
  const kegiatanStatus = useSelector((state) => state.kegiatan.status);
  const kegiatanError = useSelector((state) => state.kegiatan.error);
  const currentPage = useSelector((state) => state.kegiatan.currentPage);
  const limit = useSelector((state) => state.kegiatan.limit);
  const imageKegiatan = useSelector((state) => state.kegiatan.image);

  const dispatch = useDispatch();





  // Fungsi untuk memuat data galeri
  const dataGaleriFromKegiatan = useCallback(async (pageToFetch, limitToFetch) => {

    await dispatch(fetchKegiatanThunk({ page: pageToFetch, limit: limitToFetch }));
  }, [dispatch]);

  // Panggil data galeri saat komponen dimuat
  useEffect(() => {

    // cek status kegiatan dan isi parameter
    if (currentPage && limit && (kegiatanStatus === 'idle' || kegiatanStatus === 'failed')) {
      dataGaleriFromKegiatan(currentPage, limit);
    };
  }, [dataGaleriFromKegiatan, currentPage, limit, kegiatanStatus]);

  // Tampilkan toast error jika ada error dari Redux
  useEffect(() => {
    if (kegiatanStatus === 'failed' && kegiatanError) {
      addToast({ title: `Error: ${kegiatanError}`, variant: 'error' });
    }
  }, [kegiatanStatus, kegiatanError]);


  // Menggabungkan semua gambar dari semua kegiatan menjadi satu daftar datar
  const allGalleryItems = useMemo(() => {
    const images = [];
    imageKegiatan.forEach(kegiatan => {
      // Pastikan kegiatan.image adalah array sebelum melakukan iterasi
      if (imageKegiatan) {
        kegiatan.image.forEach((imageUrl, index) => {

          // Tambahkan gambar ke daftar
          images.push({
            key: `${kegiatan._id}-${index}`,
            src: imageUrl,
          });
        });
      }
    });


    // kembalikan daftar gambar
    return images;
  }, [imageKegiatan]);



  // Tampilkan loading state
  if (kegiatanStatus === 'loading') {
    return (
      <div className='container mx-auto px-4 py-8 min-h-screen flex items-center justify-center'>
        <Spinner size='lg' color='emerald' label='Memuat galeri...' />
      </div>
    );
  }

  // Tampilkan error state jika gagal memuat dan tidak ada data
  if (kegiatanStatus === 'failed' && (!kegiatanData || kegiatanData.length === 0)) {
    return (
      <div className='container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center text-red-600'>
        <p className='text-lg'>Gagal memuat data galeri kegiatan.</p>
        <p className='text-sm'>{kegiatanError}</p>
        <Button onClick={() => dispatch(fetchKegiatanThunk(true))} type='primary' className='mt-4'>
          Coba Lagi
        </Button>
      </div>
    );
  }

  // Tampilkan empty state jika tidak ada data setelah sukses memuat
  if (kegiatanStatus === 'succeeded' && (!kegiatanData || kegiatanData.length === 0)) {
    return (
      <div className='container mx-auto px-4 py-8 min-h-screen flex items-center justify-center'>
        <Empty description="Tidak ada kegiatan yang tersedia di galeri." />
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6'>
        <h1 className='text-3xl font-extrabold text-emerald-700'>Galeri Kegiatan</h1>
        <hr className='border-t-2 border-emerald-400 w-24 mt-2 mb-4' />
      </div>

      <div className='my-4 w-full'>
        {/* Ant Design Image.PreviewGroup untuk fitur pratinjau penuh layar */}
        <Image.PreviewGroup>
          <List
            grid={{
              gutter: 16, // Jarak antar item
              xs: 3,
              sm: 3,
              md: 3,
              lg: 4,
              xl: 7,
              xxl: 8,
            }}
            dataSource={allGalleryItems} // Gunakan daftar gambar yang sudah disatukan
            pagination={{
              pageSize: 14,
              position: 'bottom',
            }}
            renderItem={(item) => (
              <List.Item key={item.key} className=''>
                <div className='rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 duration-300 w-40 h-40'>
                  <div className='relative w-full h-full '>
                    <Image
                      alt={item.src}
                      src={item.src}
                      className="inset-0 w-full h-full object-fill rounded-lg"
                      fallback="https://placehold.co/600x450/cccccc/000000?text=No+Image" // Placeholder jika gambar gagal dimuat
                    />
                  </div>
                </div>
              </List.Item>
            )}
          />
        </Image.PreviewGroup>
      </div>
    </div>
  );
};

export default GaleriAdminComponent;