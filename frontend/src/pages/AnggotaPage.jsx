import React, { useCallback, useEffect } from 'react';
import { addToast, Button, Card, CardBody, CardFooter, CardHeader, Image, Pagination } from '@heroui/react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnggotaThunk, setCurrentPage } from '../store/anggotaSliceRedux';
import { Tooltip } from 'antd';


const AnggotaPage = () => {

  const dispatch = useDispatch();

  const dataAnggota = useSelector((state) => state.anggota.data);
  const anggotaStatus = useSelector((state) => state.anggota.status);
  const anggotaError = useSelector((state) => state.anggota.error);
  const limit = useSelector((state) => state.anggota.limit);
  const currentPage = useSelector((state) => state.anggota.currentPage);
  const totalPage = useSelector((state) => state.anggota.totalPage);


  // fungsi ambil semua data anggota dari redux
  const fetchAllDataAnggota = useCallback(async (pageToFetch, limitToFetch) => {

    await dispatch(fetchAnggotaThunk({ page: pageToFetch, limit: limitToFetch }));
  }, [dispatch]);


  // panggil fungsi ambil semua data anggota saat komponen dimuat
  useEffect(() => {

    // cek redux
    if (currentPage && limit && (anggotaStatus === "idle" || anggotaStatus === "failed")) {
      fetchAllDataAnggota(currentPage, limit);
    }
  }, [currentPage, limit, anggotaStatus, fetchAllDataAnggota]);

  // tampilkan error jika gagal ambil data anggota
  useEffect(() => {
    if (anggotaError && anggotaStatus === "failed") {
      addToast({ title: `Error: ${anggotaError}`, variant: 'error' });
    }
  })


  // Handler untuk mengubah halaman
  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    fetchAllDataAnggota(pageNumber, limit);
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
          <h1 className='text-3xl font-bold text-emerald-600 '>Anggota</h1>
          <hr className='text-emerald-600 w-full border mt-4' />
        </motion.div>

        {/* gunakan AnimatePresence agar konten tidak hilang ketika pindah halaman */}
        {/* mode='wait' memastikan satu set keluar sebelum set berikutnya masuk */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentPage}
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-4 py-6'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {dataAnggota && dataAnggota.map((anggota, index) => (
              <motion.div
                key={anggota.user_id._id + index}
                className="col-span-1"
                variants={cardVariants}

              >
                <Card className="py-4 w-full h-full flex flex-col">
                  <CardHeader className="flex items-start w-full justify-between">
                    <div>
                      <h4 className="font-bold text-md">{anggota.user_id.name}</h4>
                      <small className='text-gray-500 line-clamp-1'>{anggota.user_id.email}</small>
                    </div>
                    <Button variant='bordered' size='sm' color='success'>Profil</Button>
                  </CardHeader>
                  <CardBody className="overflow-hidden items-center justify-center w-full h-[400px] py-2">
                    <Image
                      src={anggota.user_id.avatar}
                      alt={`Foto ${anggota.user_id.name}`}
                      className="object-cover w-[400px] h-[400px] bg-emerald-500"
                    />
                  </CardBody>
                  <CardFooter className='flex gap-4 items-center justify-center '>
                    <Tooltip title={anggota.user_id.social_media.facebook || 'Belum ada'} placement='bottom'>
                      <FaFacebook size={20} className='hover:text-emerald-600 cursor-pointer' />
                    </Tooltip>

                    <Tooltip title={anggota.user_id.social_media.whatsapp || 'Belum ada'} placement='bottom'>
                      <FaWhatsapp size={20} className='hover:text-emerald-600 cursor-pointer' />
                    </Tooltip>

                    <Tooltip title={anggota.user_id.social_media.instagram || 'Belum ada'} placement='bottom'>
                      <FaInstagram size={20} className='hover:text-emerald-600 cursor-pointer' />
                    </Tooltip>

                    <Tooltip title={anggota.user_id.social_media.twitter || 'Belum ada'} placement='bottom'>
                      <FaTwitter size={20} className='hover:text-emerald-600 cursor-pointer' />
                    </Tooltip>

                    <Tooltip title={anggota.user_id.social_media.tiktok || 'Belum ada'} placement='bottom'>
                      <FaTiktok size={20} className='hover:text-emerald-600 cursor-pointer' />
                    </Tooltip>
                  </CardFooter>
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

          <Pagination
            showShadow
            color="success"
            total={totalPage}
            size='md'
            page={currentPage}
            onChange={handlePageChange}
            limit={limit}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AnggotaPage;