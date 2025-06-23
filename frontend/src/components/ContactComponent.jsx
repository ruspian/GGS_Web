import { Image } from '@heroui/react';
import React from 'react';
import fullContactImage from '../assets/fullContactImage.png';
import { FaRegAddressBook } from "react-icons/fa";
import { MdOutlineAttachEmail, MdPhoneInTalk } from "react-icons/md";
import { motion } from 'framer-motion'; // Import motion

// Assuming you have these assets in your '../assets/' directory
import buble from '../assets/buble.png';
import bubleKotak from '../assets/bubleKotak.png';

const ContactComponent = () => {
  // Define animation variants for a staggered effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between child animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const textBlockVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.div
      className='h-auto relative overflow-hidden py-12'
      variants={containerVariants}
      initial="hidden"
      whileInView="visible" // Animasi berjalan saat elemen terlihat
      viewport={{ once: false, amount: 0.3 }} // Animasi hanya berjalan sekali saat 30% elemen terlihat
    >
      {/* awal animasi bg */}
      <motion.img
        src={buble}
        alt="Animasi2"
        className='absolute top-10 left-0 w-48 h-48 md:w-64 md:h-64 z-0 opacity-20 mix-blend-multiply blur-lg'
        animate={{ x: [0, 20, 0], y: [0, -20, 0], rotate: [0, 360, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={bubleKotak}
        alt="Animasi"
        className='absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 z-0 opacity-20 mix-blend-multiply blur-lg'
        animate={{ x: [0, -20, 0], y: [0, 20, 0], rotate: [0, -360, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* akhir animasi bg */}

      {/* Content */}
      <motion.div
        className='container mx-auto px-6 md:px-20  py-6 relative z-10'

      >
        <div className='flex flex-col md:flex-row items-center md:items-start  md:justify-beetwen justify-center gap-8'>

          {/* Gambar Kontak */}
          <motion.div
            className='w-full md:w-1/2 flex justify-center relative overflow-hidden '
            variants={imageVariants}
          >
            <Image
              src={fullContactImage}
              className='w-4/5 max-w-lg animate-float1'
              alt="Ilustrasi orang sedang menghubungi, melambangkan komunikasi."
            />

          </motion.div>

          {/* Informasi Kontak */}
          <motion.div
            className='w-full md:w-1/2 text-left space-y-6'
            variants={textBlockVariants}
          >
            <h1 className='text-4xl md:text-5xl font-bold text-emerald-600 mb-4'>Hubungi Kami</h1>
            <p className='text-gray-600 text-base leading-relaxed'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium eligendi iste deserunt repudiandae voluptatem, praesentium harum iusto mollitia veritatis obcaecati odio, cum officia, at odit minus sed sapiente error nobis.
            </p>

            {/* Alamat Kantor */}
            <motion.div
              className='flex flex-row md:items-start gap-4 pt-4'
              variants={itemVariants}
            >
              <FaRegAddressBook className='text-2xl text-emerald-600 shrink-0' />
              <div>
                <h2 className='text-xl font-bold text-gray-800'>Alamat Kantor</h2>
                <p className='text-gray-600 text-base'>
                  Jln. KH. Abdul Ghofir Nawawi Desa
                </p>
                <p className='text-gray-600 text-base'>
                  Banuroja, Randangan, Pohuwato, Gorontalo, Indonesia
                </p>
              </div>
            </motion.div>

            {/* Telepon */}
            <motion.div
              className='flex flex-row items-start gap-4'
              variants={itemVariants}
            >
              <MdPhoneInTalk className='text-2xl text-emerald-600 shrink-0' />
              <div>
                <h2 className='text-xl font-bold text-gray-800'>Telepon</h2>
                <p className='text-gray-600 text-base'>+62 812-12121212</p>
                <p className='text-gray-600 text-base'>+62 812-13131313</p>
                <p className='text-gray-600 text-base'>+62 812-14141414</p>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              className='flex flex-row items-start gap-4'
              variants={itemVariants}
            >
              <MdOutlineAttachEmail className='text-2xl text-emerald-600 shrink-0' />
              <div>
                <h2 className='text-xl font-bold text-gray-800'>Email</h2>
                <p className='text-gray-600 text-base'>info@gorontalogreenschool.com</p>
                <p className='text-gray-600 text-base'>gorontalogreenschool@gmail.com</p>
                <p className='text-gray-600 text-base'>support@gorontalogreenschool.com</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactComponent;