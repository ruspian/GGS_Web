import { addToast, Button, Card, CardBody, CardFooter, CardHeader, Image } from '@heroui/react';
import React, { useCallback, useEffect } from 'react';
import { FaFacebook, FaWhatsapp, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnggotaThunk } from '../store/anggotaSliceRedux';
import { Tooltip } from 'antd';

const AnggotaComponent = () => {

  const dispatch = useDispatch();

  const dataAnggota = useSelector((state) => state.anggota.data);
  const anggotaStatus = useSelector((state) => state.anggota.status);
  const anggotaError = useSelector((state) => state.anggota.error);
  const limit = useSelector((state) => state.anggota.limit);
  const currentPage = useSelector((state) => state.anggota.currentPage);


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


  // Variants untuk animasi kontainer kartu 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Jeda 0.2 detik antar animasi 
      },
    },
  };

  // Variants untuk animasi card
  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Mulai dari bawah, tidak terlihat
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }, // Geser ke atas dan muncul
  };

  return (
    <div className='h-auto relative overflow-hidden py-12'>

      {/*  ANIMASI LATAR BELAKANG GRADIENT  */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full  z-0"

        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '200% 200%' }}
      />
      {/* AKHIR ANIMASI BG */}

      {/* Konten Utama Anggota Component */}
      <div className='container mx-auto px-6 md:px-20 py-6 relative z-10'>
        <div className='flex justify-center items-center'>
          <div className='flex flex-col px-6 md:mx-20 items-center justify-center text-center'>
            <h1 className='text-3xl font-bold text-gray-600'>Anggota <span className='text-emerald-600'>Gorontalo Green School</span></h1>
            <p className='text-gray-600 text-base py-2 leading-relaxed max-w-2xl'>
              Berikut adalah anggota-anggota hebat yang membentuk Gorontalo Green School. Mereka adalah individu-individu berdedikasi yang berkontribusi pada visi dan misi.
            </p>
          </div>
        </div>

        {/* card anggota, dengan animasi */}
        <motion.div
          className='flex flex-col md:flex-row items-center justify-center gap-6 px-6 md:mx-20 my-8 py-6'
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >

          {
            // card anggota
            dataAnggota && dataAnggota.slice(0, 4).map((anggota, index) => (
              <motion.div
                key={index + anggota.user_id._id}
                variants={cardVariants}
                className="py-2 max-w-xs max-h-xs "
              >
                <Card>
                  <CardHeader className="flex items-start w-full h-16 justify-between">
                    <div>
                      <h4 className="font-bold text-md">{anggota.user_id.name}</h4>
                      <small className='text-gray-500 line-clamp-1'>{anggota.user_id.email}</small>
                    </div>
                    <Button variant='bordered' size='sm' color='success'>Profil</Button>
                  </CardHeader>
                  <CardBody className="w-full h-64 overflow-hidden my-2">
                    <Image
                      src={anggota.user_id.avatar}
                      alt={`Foto ${anggota.user_id.name}`}
                      className="object-cover w-full h-full rounded-md"
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

            ))
          }

        </motion.div>

        <div className='flex justify-center pb-8'>
          <Button variant='bordered' color='success'>
            <Link to={'/anggota'}>
              Lihat Semua Anggota
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnggotaComponent;