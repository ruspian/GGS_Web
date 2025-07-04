import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { FaRegAddressBook } from 'react-icons/fa';
import { MdOutlineAttachEmail, MdPhoneInTalk } from 'react-icons/md';
import { Button, Form, Input, Textarea } from '@heroui/react';


const ContactPage = () => {

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
          <h1 className='text-3xl font-bold text-emerald-600 '>Hubungi Kami</h1>
          <hr className='text-emerald-600 w-full border mt-4' />
        </motion.div>

        {/* gunakan AnimatePresence agar konten tidak hilang ketika pindah halaman */}
        {/* mode='wait' memastikan satu set keluar sebelum set berikutnya masuk */}
        <AnimatePresence mode='wait'>
          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4 py-6'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div className='mb-4' variants={containerVariants}>
              <Form
                className="w-full flex flex-col gap-4"
                validationErrors={'errors'}
                onSubmit={'onSubmit'}
              >
                <Input
                  label="Email Anda"
                  labelPlacement="outside"
                  name="email"
                  placeholder="Masukkan Nama"
                />
                <Input
                  label="Subject"
                  labelPlacement="outside"
                  name="subject"
                  placeholder="Ada yang bisa kami bantu?"
                />
                <Textarea
                  label="Pesan Anda"
                  labelPlacement="outside"
                  name="message"
                  placeholder="Masukkan Pesan"
                />
                <Button type="submit" variant="bordered" color='success' radius='sm'>
                  Submit
                </Button>
              </Form>
            </motion.div>

            <div className='flex flex-col gap-4'>
              <motion.div
                className='flex flex-row md:items-start gap-4 pt-4'
                variants={cardVariants}
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
                variants={cardVariants}
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
                variants={cardVariants}
              >
                <MdOutlineAttachEmail className='text-2xl text-emerald-600 shrink-0' />
                <div>
                  <h2 className='text-xl font-bold text-gray-800'>Email</h2>
                  <p className='text-gray-600 text-base'>info@gorontalogreenschool.com</p>
                  <p className='text-gray-600 text-base'>gorontalogreenschool@gmail.com</p>
                  <p className='text-gray-600 text-base'>support@gorontalogreenschool.com</p>
                </div>
              </motion.div>
            </div>


          </motion.div>
        </AnimatePresence>
      </div>
    </div >
  )
}

export default ContactPage
