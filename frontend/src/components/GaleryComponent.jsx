import React, { useState } from 'react';
import { Card, Image, Tooltip, Pagination } from '@heroui/react';
import { AnimatePresence, motion } from 'framer-motion';

const GaleryComponent = () => {
  const allImages = [
    { id: 1, src: "https://plus.unsplash.com/premium_photo-1724129051975-113ea0537676?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB4MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Gambar Kegiatan 1" },
    { id: 2, src: "https://images.unsplash.com/photo-1505471768190-275e2ad7b3f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB4MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D", alt: "Gambar Kegiatan 2" },
    { id: 3, src: "https://images.unsplash.com/photo-1614157606535-2f3990b919a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGluZG9uZXNpYW58ZW52MHx8MHx8fDA%3D", alt: "Gambar Kegiatan 3" },
    { id: 4, src: "https://images.unsplash.com/photo-1560190113-6fa325e052d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGluZG9uZXNpYW58ZW52MHx8MHx8fDA%3D", alt: "Gambar Kegiatan 4" },
    { id: 5, src: "https://images.unsplash.com/photo-1598063413828-0d42356b9573?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kb25lc2lhfGVufDB8fHwwfHw%3D", alt: "Gambar Kegiatan 5" },
    { id: 6, src: "https://images.unsplash.com/photo-1620634008561-c1b8b6584aa0?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB4MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Gambar Kegiatan 6" },
    { id: 7, src: "https://images.unsplash.com/photo-1584792323921-5b1a9f1b60ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB4MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8", alt: "Gambar Kegiatan 7" },
    { id: 8, src: "https://images.unsplash.com/photo-1599717460927-8101594d1418?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB4MHxwaG90by1yZWxhdGVkfDc2fHx8ZW58MHx8fHx8", alt: "Gambar Kegiatan 8" },
    { id: 9, src: "https://plus.unsplash.com/premium_photo-1693143159435-96b250a9ee2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB4MHxwaG90by1yZWxhdGVkfDIwNnx8fGVufDB8fHx8fA%3D%3D", alt: "Gambar Kegiatan 9" },
    { id: 10, src: "https://images.unsplash.com/photo-1596609703724-d5335034ef54?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB4MHxwaG90by1yZWxhdGVkfDIzNnx8fGVufDB8fHx8fA%3D%3D", alt: "Gambar Kegiatan 10" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 5;

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = allImages.slice(indexOfFirstImage, indexOfLastImage);

  const totalPages = Math.ceil(allImages.length / imagesPerPage);

  const cardLayoutClasses = [
    "col-span-12 sm:col-span-4 h-[300px]",
    "col-span-12 sm:col-span-4 h-[300px]",
    "col-span-12 sm:col-span-4 h-[300px]",
    "col-span-12 sm:col-span-5 h-[300px]",
    "col-span-12 sm:col-span-7 h-[300px]",
  ];

  // animasi untuk kontainer
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Jeda antar item galeri
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const backgroundBlobVariants = {
    animate: () => ({
      x: [0, Math.random() * 50 - 25, 0], // Gerak X random
      y: [0, Math.random() * 50 - 25, 0], // Gerak Y random
      scale: [1, 1 + Math.random() * 0.2, 1], // Skala random
      rotate: [0, Math.random() * 360, 0], // Rotasi random
      borderRadius: [`${Math.random() * 50 + 20}%`, `${Math.random() * 50 + 20}%`, `${Math.random() * 50 + 20}%`], // Bentuk random
    }),
    transition: {
      duration: Math.random() * 10 + 5, // Durasi random 5-15 detik
      repeat: Infinity,
      ease: "easeInOut",
      delay: Math.random() * 2 // Delay awal random
    }
  };

  return (
    <div className='h-auto relative overflow-hidden py-12'>
      {/* ANIMASI BACKGROUND  */}
      <motion.div
        className="absolute w-64 h-64 bg-emerald-300 opacity-20 rounded-full mix-blend-multiply blur-3xl z-0"
        variants={backgroundBlobVariants}
        initial={{ opacity: 0 }}
        animate="animate"
        custom={1}
        style={{ top: '10%', left: '5%' }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-green-200 opacity-20 rounded-full mix-blend-multiply blur-3xl z-0"
        variants={backgroundBlobVariants}
        initial={{ opacity: 0 }}
        animate="animate"
        custom={2}
        style={{ bottom: '5%', right: '10%' }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-emerald-400 opacity-20 rounded-full mix-blend-multiply blur-3xl z-0"
        variants={backgroundBlobVariants}
        initial={{ opacity: 0 }}
        animate="animate"
        custom={3}
        style={{ top: '40%', right: '25%' }}
      />
      {/* AKHIR ANIMASI BG */}

      <div className='container mx-auto px-6 md:px-20 py-6 relative z-10'>
        <div className='flex justify-center items-center mb-8'>
          <h1 className='text-3xl font-bold text-emerald-600 '>Galeri</h1>
        </div>

        {/* Gallery */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8 w-full mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {currentImages.map((image, index) => (
              <motion.div key={image.id} variants={itemVariants} className={cardLayoutClasses[index]}>
                <Tooltip
                  showArrow={true}
                  offset={-7}
                  placement='bottom'
                  classNames={{
                    base: ["before:bg-neutral-400 dark:before:bg-white"],
                    content: ["py-2 px-4 shadow-xl", "text-black bg-gradient-to-br from-white to-neutral-400"],
                  }}
                  content={
                    <div className="px-1 py-2 max-w-56">
                      <div className="text-small font-bold">{image.alt}</div>
                      <div className="text-tiny line-clamp-3">{image.src}</div>
                    </div>
                  }
                >
                  <Card className="w-full h-full">
                    <Image
                      removeWrapper
                      alt={image.alt}
                      className={`z-0 w-full h-full object-cover rounded-xl ${index === 3 ? 'scale-110' : ''}`}
                      src={image.src}
                    />
                  </Card>
                </Tooltip>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center">
          <Pagination
            showShadow
            color="warning"
            total={totalPages}
            size='sm'
            page={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default GaleryComponent;