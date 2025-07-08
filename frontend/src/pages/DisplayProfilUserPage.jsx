import { addToast, Image } from '@heroui/react';
import { useParams } from 'react-router-dom';
import FetchFromAxios from '../utils/AxiosUtil';
import getAPI from '../common/getAPI';
import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DisplayProfilUserPage = () => {
  const [anggota, setAnggota] = useState(null);
  const param = useParams();

  // Fetch data dari backend
  const fetchAnggotaFromUser = useCallback(async () => {
    try {
      const response = await FetchFromAxios({
        ...getAPI.getAnggotaFromUser,
        data: { _id: param.id }
      });

      if (response.data.success) {
        setAnggota(response.data.data);
      }
    } catch (error) {
      addToast({ title: error?.response?.data?.message || 'Terjadi kesalahan saat memuat data' });
    }
  }, [param.id]);

  useEffect(() => {
    fetchAnggotaFromUser();
  }, [fetchAnggotaFromUser]);

  return (
    <div className="pt-10 overflow-hidden bg-gray-50 dark:bg-gray-800 md:pt-0 sm:pt-16 2xl:pt-16">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {anggota && (
          <motion.div
            className="grid items-center grid-cols-1 md:grid-cols-2 gap-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Teks Kiri */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* <h2 className="text-xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">
                Halo 👋 Saya
              </h2> */}

              <motion.h2
                className="text-xl font-bold text-black dark:text-white sm:text-4xl lg:text-5xl mt-2"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {anggota.name}
              </motion.h2>

              <small className="text-gray-500 dark:text-gray-400 ml-1">
                {anggota.job}
              </small>

              <div className="mt-4 md:mt-8">
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                  {anggota.aboutme ? anggota.aboutme : '......'}
                </p>
              </div>

              <motion.p
                className="mt-6 text-xl text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {/* <span className="relative inline-block">
                  <span className="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300 dark:bg-gray-900"></span>
                  <span className="relative">Have a question?</span>
                </span>
                <br className="block sm:hidden" />
                Ask me on{' '}
                <a
                  href="#"
                  className="transition-all duration-200 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-500 hover:underline"
                >
                  Twitter
                </a> */}
              </motion.p>
            </motion.div>

            {/* Gambar Kanan */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <img
                className="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg"
                alt=""
              />

              <Image
                className="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110 rounded-lg"
                src={anggota.avatar}
                alt={anggota.name}
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DisplayProfilUserPage;
