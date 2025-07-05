import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, Image, Tooltip, Pagination, addToast } from '@heroui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKegiatanThunk } from '../store/kegiatanSliceRedux';

const GaleryComponent = () => {

  const [currentPage, setCurrentPage] = useState(1);

  // const kegiatanData = useSelector((state) => state.kegiatan.data);
  const kegiatanStatus = useSelector((state) => state.kegiatan.status);
  const kegiatanError = useSelector((state) => state.kegiatan.error);
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


  const imagesPerPage = 5;

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = allGalleryItems.slice(indexOfFirstImage, indexOfLastImage);

  const totalPages = Math.ceil(allGalleryItems.length / imagesPerPage);

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
              <motion.div key={`image-${image.src + index}`} id={image.id} variants={itemVariants} className={cardLayoutClasses[index]}>
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