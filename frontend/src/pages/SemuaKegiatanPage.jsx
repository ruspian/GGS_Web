import React, { useCallback, useEffect } from 'react';
import { addToast, Card, CardBody, CardFooter, Image, Pagination } from '@heroui/react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKegiatanThunk, setCurrentPage } from '../store/kegiatanSliceRedux';
import { Empty } from 'antd';


const SemuaKegiatanComponent = () => {

  // data kegiatan redux
  const kegiatanData = useSelector((state) => state.kegiatan.data);
  const kegiatanStatus = useSelector((state) => state.kegiatan.status);
  const kegiatanError = useSelector((state) => state.kegiatan.error);
  const totalPage = useSelector((state) => state.kegiatan.totalPage);
  const currentPage = useSelector((state) => state.kegiatan.currentPage);
  const limit = 9;


  const dispatch = useDispatch();


  // Fungsi untuk memicu pengambilan data kegiatan dari Redux
  const refreshFetchKegiatanData = useCallback(async (pageToFetch, limitToFetch) => {

    // Dispatch thunk fetchKegiatanThunk dengan parameter page dan limit
    await dispatch(fetchKegiatanThunk({ page: pageToFetch, limit: limitToFetch }));
  }, [dispatch]);

  // panggil refreshFetchKegiatanData saat komponen dimuat
  useEffect(() => {
    // cek status kegiatan dan isi parameter
    if (currentPage && limit && (kegiatanStatus === 'idle' || kegiatanStatus === 'failed')) {
      // jika status idle atau failed, maka panggil refreshFetchKegiatanData
      refreshFetchKegiatanData(currentPage, limit);
    }
  }, [refreshFetchKegiatanData, currentPage, limit, kegiatanStatus]);

  // Tampilkan toast error jika ada error dari Redux
  useEffect(() => {
    if (kegiatanStatus === 'failed' && kegiatanError) {
      addToast({ title: `Error: ${kegiatanError}`, variant: 'error' });
    }
  }, [kegiatanStatus, kegiatanError]);



  // Handler untuk mengubah halaman
  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    refreshFetchKegiatanData(pageNumber, limit);
  };

  // animasi untuk kontainer kartu
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3, ease: 'easeIn' } }
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };


  // Tampilkan empty state jika tidak ada data setelah sukses memuat
  if (kegiatanStatus === 'succeeded' && (!kegiatanData || kegiatanData.length === 0)) {
    return (
      <div className='container mx-auto px-4 py-8 min-h-screen flex items-center justify-center'>
        <Empty description="Belum ada kegiatan yang tersedia." />
      </div>
    );
  }

  return (
    <div className='h-auto relative overflow-hidden py-12'>

      {/* Konten Utama */}
      <div className='container mx-auto px-6 md:px-20 py-6 relative z-20'>
        <motion.div
          className='flex flex-col mb-8'
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1 className='text-3xl font-bold text-emerald-600 '>Kegiatan</h1>
          <hr className='text-emerald-600 w-full border mt-4' />
        </motion.div>

        {/* gunakan AnimatePresence agar konten tidak hilang ketika pindah halaman */}
        {/* mode='wait' memastikan satu set keluar sebelum set berikutnya masuk */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentPage}
            className='grid grid-cols-1 items-center justify-center sm:grid-cols-2 md:grid-cols-3 gap-6 my-4 py-6'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {
              kegiatanData.map((kegiatan, index) => (
                <motion.div
                  key={index}
                  className="col-span-1 items-center justify-center"
                  variants={cardVariants}

                >
                  <Card className="py-4 h-full flex flex-col">
                    <CardBody className="overflow-hidden w-full h-[200px] py-2">
                      <Image
                        alt={kegiatan.name}
                        className="object-cover w-full h-full"
                        src={kegiatan.image[0]}
                        onError={(e) => {
                          console.error(`Gagal memuat gambar untuk kegiatan ID ${kegiatan.id}:`, e.target.src);
                          e.target.src = "https://via.placeholder.com/400x300?text=Gambar+Gagal+Dimuat";
                        }}

                      />
                    </CardBody>
                    <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
                      <h4 className="font-bold text-large">{kegiatan.name}</h4>
                      <small className="text-default-500 line-clamp-2">{kegiatan.description}</small>
                    </CardFooter>
                    <Link
                      to={`/kegiatan/${kegiatan.id}`}
                      className='pt-2 px-4 pb-4 text-md text-emerald-600 hover:text-emerald-800'
                    >
                      <small>Lihat Selengkapnya</small>
                    </Link>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>

        {/* Kontrol Pagination */}
        <motion.div
          className='flex justify-center mt-8 space-x-2'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {
            kegiatanData.length > 0 && totalPage > 1 && (
              <Pagination
                showShadow
                color="success"
                size='md'
                total={totalPage}
                page={currentPage}
                onChange={handlePageChange}
                limit={limit}
              />
            )
          }

        </motion.div>
      </div>
    </div>
  );
};

export default SemuaKegiatanComponent;