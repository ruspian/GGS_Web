import React, { useState, useMemo } from 'react';
import { Card, CardBody, CardFooter, Image, Pagination } from '@heroui/react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const allActivities = [

  {
    id: 1,
    src: "https://plus.unsplash.com/premium_photo-1724129051975-113ea0537676?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB4MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Program Penanaman Bibit Mangrove",
    description: "Kegiatan penanaman bibit mangrove di pesisir pantai untuk menjaga ekosistem dan mencegah abrasi. Dihadiri oleh siswa, guru, dan komunitas lokal."
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1505471768190-275e2ad7b3f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB4MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
    title: "Workshop Daur Ulang Kreatif",
    description: "Siswa belajar mengubah sampah plastik menjadi karya seni yang indah dan bermanfaat, menumbuhkan kesadaran akan pentingnya daur ulang."
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1614157606535-2f3990b919a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGluZG9uZXNpYW58ZW52MHx8MHx8fDA%3D",
    title: "Pembersihan Lingkungan Sekolah",
    description: "Gotong royong membersihkan area sekolah, menciptakan lingkungan belajar yang bersih, nyaman, dan sehat bagi seluruh warga sekolah."
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1560190113-6fa325e052d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGluZG9uZXNpYW58ZW52MHx8MHx8fDA%3D",
    title: "Edukasi Konservasi Air",
    description: "Sesi edukasi interaktif mengenai pentingnya hemat air dan cara-cara sederhana untuk menghemat penggunaan air di kehidupan sehari-hari."
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1598063413828-0d42356b9573?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kb25lc2lhfGVufDB8fHwwfHw%3D",
    title: "Kunjungan ke Pusat Daur Ulang",
    description: "Siswa diajak mengunjungi fasilitas daur ulang untuk melihat langsung proses pengolahan sampah dan dampaknya bagi lingkungan."
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1620634008561-c1b8b6584aa0?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB4MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Gerakan Hemat Energi di Sekolah",
    description: "Kampanye kesadaran untuk mematikan lampu dan perangkat elektronik yang tidak terpakai guna mengurangi konsumsi energi."
  },
  {
    id: 7,
    src: "https://plus.unsplash.com/premium_photo-1742571761627-fe5f59126c38?q=80&w=812&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Proyek Kebun Hidroponik",
    description: "Siswa membuat dan merawat kebun hidroponik di sekolah, belajar tentang pertanian berkelanjutan dan pangan sehat."
  },
  {
    id: 8,
    src: "https://plus.unsplash.com/premium_photo-1663126808705-6a45e3b10922?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMwfHx8ZW58MHx8fHx8",
    title: "Diskusi Lingkungan dengan Ahli",
    description: "Sesi tanya jawab dengan pakar lingkungan untuk memperdalam pemahaman siswa tentang isu-isu lingkungan global dan lokal."
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1587488787062-9cab6ee9abc7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzYXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Lomba Kreasi Barang Bekas",
    description: "Kompetisi antar kelas untuk menciptakan inovasi dari barang bekas, mendorong kreativitas dan praktik ramah lingkungan."
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1619918456538-df5b5290950b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVzYXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Ekskursi Lingkungan ke Hutan Lindung",
    description: "Siswa diajak menjelajahi hutan lindung, belajar langsung tentang keanekaragaman hayati dan pentingnya menjaga kelestarian alam."
  },
  {
    id: 11,
    src: "https://plus.unsplash.com/premium_photo-1680322466240-5432df49a01e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
    title: "Kelas Memasak Makanan Sehat Berbahan Lokal",
    description: "Mengajarkan siswa cara mengolah bahan pangan lokal menjadi hidangan sehat, mendukung pertanian berkelanjutan."
  },
  {
    id: 12,
    src: "https://plus.unsplash.com/premium_photo-1723925013191-266b01338b96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDY1fHx8ZW58MHx8fHx8",
    title: "Festival Lingkungan Tahunan",
    description: "Acara tahunan yang menampilkan proyek lingkungan siswa, pertunjukan seni, dan pameran inovasi hijau."
  },
];

const ITEMS_PER_PAGE = 6; // Menampilkan 6 card per halaman

const SemuaKegiatanComponent = () => {
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
                  <CardBody className="overflow-hidden w-full h-[200px] py-2">
                    <Image
                      alt={activity.title}
                      className="object-cover w-full h-full"
                      src={activity.src}
                      onError={(e) => {
                        console.error(`Gagal memuat gambar untuk kegiatan ID ${activity.id}:`, e.target.src);
                        e.target.src = "https://via.placeholder.com/400x300?text=Gambar+Gagal+Dimuat";
                      }}

                    />
                  </CardBody>
                  <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">{activity.title}</h4>
                    <small className="text-default-500 line-clamp-2">{activity.description}</small>
                  </CardFooter>
                  <Link
                    to={`/kegiatan/${activity.id}`}
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

export default SemuaKegiatanComponent;