import React, { useState, useMemo } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Pagination } from '@heroui/react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const allActivities = [

  {
    id: 1,
    nama: "Otong Surotong",
    profesi: "COE Grub Jamal",
    img: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTUxfHxwZW9wbGV8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 2,
    nama: "Ucup Surucup",
    profesi: "Ketua Organisasi Naga",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHxwZW9wbGV8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 3,
    nama: "Santi Susanti",
    profesi: "COE Grub Laguna",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU1fHxwZW9wbGV8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 4,
    nama: "Sari Sunari",
    profesi: "COE Grub Sari",
    img: "https://images.unsplash.com/photo-1592621385612-4d7129426394?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQzfHxwZW9wbGV8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 5,
    nama: "Otong Surotong",
    profesi: "COE Grub Jamal",
    img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 6,
    nama: "Otong Surotong",
    profesi: "COE Grub Jamal",
    img: "https://plus.unsplash.com/premium_photo-1681880949962-44fd8757cf53?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 7,
    nama: "Otong Surotong",
    profesi: "COE Grub Jamal",
    img: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 8,
    nama: "Otong Surotong",
    profesi: "COE Grub Jamal",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 9,
    nama: "Otong Surotong",
    profesi: "COE Grub Jamal",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 10,
    nama: "Otong Surotong",
    profesi: "COE Grub Jamal",
    img: "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 11,
    nama: "Otong Surotong",
    profesi: "COE Grub Jamal",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 12,
    nama: "Otong Surotong",
    profesi: "COE Grub Jamal",
    img: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
  },
];

const ITEMS_PER_PAGE = 6; // Menampilkan 6 card per halaman

const AnggotaPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Hitung total halaman
  const totalPages = useMemo(() => Math.ceil(allActivities.length / ITEMS_PER_PAGE), [allActivities.length]);

  // Hitung indeks awal dan akhir untuk item yang akan ditampilkan di halaman saat ini
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const activitiesToDisplay = allActivities.slice(startIndex, endIndex);

  // Handler untuk mengubah halaman
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
          <h1 className='text-3xl font-bold text-emerald-600 '>Kegiatan</h1>
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
            {activitiesToDisplay.map((activity) => (
              <motion.div
                key={activity.id}
                className="col-span-1"
                variants={cardVariants}

              >
                <Card className="py-4 h-full flex flex-col">
                  <CardHeader className="flex items-start w-full justify-between">
                    <div>
                      <h4 className="font-bold text-md">{activity.nama}</h4>
                      <small className='text-gray-500 line-clamp-1'>{activity.profesi}</small>
                    </div>
                    <Button variant='bordered' size='sm' color='success'>Profil</Button>
                  </CardHeader>
                  <CardBody className="overflow-hidden w-full h-[400px] py-2">
                    <div className='w-full h-full object-cover'>
                      <Image
                        src={activity.img}
                        alt="Foto Otong Surotong"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </CardBody>
                  <CardFooter className='flex gap-4 items-center justify-center '>
                    <FaFacebook size={20} className='hover:text-emerald-600 cursor-pointer' />
                    <FaWhatsapp size={20} className='hover:text-emerald-600 cursor-pointer' />
                    <FaInstagram size={20} className='hover:text-emerald-600 cursor-pointer' />
                    <FaTwitter size={20} className='hover:text-emerald-600 cursor-pointer' />
                    <FaTiktok size={20} className='hover:text-emerald-600 cursor-pointer' />
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
            total={totalPages}
            size='md'
            page={currentPage}
            onChange={handlePageChange}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AnggotaPage;