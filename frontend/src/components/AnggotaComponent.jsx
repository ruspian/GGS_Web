import { Button, Card, CardBody, CardFooter, CardHeader, Image } from '@heroui/react';
import React from 'react';
import { FaFacebook, FaWhatsapp, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AnggotaComponent = () => {
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


          {/* card 1 */}
          <motion.div variants={cardVariants} className="py-2 max-w-xs max-h-xs ">
            <Card>
              <CardHeader className="flex items-start w-full h-24 justify-between">
                <div>
                  <h4 className="font-bold text-md">Otong Surotong</h4>
                  <small className='text-gray-500 line-clamp-1'>CEO Grub Jamal</small>
                </div>
                <Button variant='bordered' size='sm' color='success'>Profil</Button>
              </CardHeader>
              <CardBody className="w-full h-64 overflow-hidden my-2">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1669703777437-27602d656c27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Foto Otong Surotong"
                  className="object-cover w-full h-full rounded-md"
                />
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

          {/* card 2 */}
          <motion.div variants={cardVariants} className="py-2 max-w-xs max-h-xs">
            <Card>
              <CardHeader className="flex items-start w-full h-24 justify-between">
                <div>
                  <h4 className="font-bold text-md">Ucup Surucup</h4>
                  <small className='text-gray-500 line-clamp-1'>Ketua Organisasi Naga</small>
                </div>
                <Button variant='bordered' size='sm' color='success'>Profil</Button>
              </CardHeader>
              <CardBody className="w-full h-64 overflow-hidden my-2">
                <Image
                  src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Foto Otong Surotong"
                  className="object-cover w-full h-full  rounded-md"
                />
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

          {/* card 3 */}
          <motion.div variants={cardVariants} className="py-2 max-w-xs max-h-xs">
            <Card>
              <CardHeader className="flex items-start w-full h-24 justify-between">
                <div>
                  <h4 className="font-bold text-md">Santi Susanti</h4>
                  <small className='text-gray-500 line-clamp-1'>CEO Grub Laguna</small>
                </div>
                <Button variant='bordered' size='sm' color='success'>Profil</Button>
              </CardHeader>
              <CardBody className="w-full  h-64 overflow-hidden my-2">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww"
                  alt="Foto Otong Surotong"
                  className="object-fill w-full h-full rounded-md"
                />
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

          {/* card 4 */}
          <motion.div variants={cardVariants} className="py-2 max-w-xs max-h-xs">
            <Card>
              <CardHeader className="flex items-start w-full h-24 justify-between">
                <div>
                  <h4 className="font-bold text-md">Sari Sunari</h4>
                  <small className='text-gray-500 line-clamp-1'>CEO Grub Sari</small>
                </div>
                <Button variant='bordered' size='sm' color='success'>Profil</Button>
              </CardHeader>
              <CardBody className="w-full h-64 overflow-hidden my-2">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww"
                  alt="Foto Otong Surotong"
                  className="object-fill w-full h-full rounded-md"
                />
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