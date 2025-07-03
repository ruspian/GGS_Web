import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAboutThunk } from '../store/aboutSliceRedux';
import { addToast } from '@heroui/react';
import dayjs from 'dayjs';
import { Descriptions } from 'antd';

const AboutPage = () => {

  const dispatch = useDispatch();

  const aboutData = useSelector((state) => state.about.data);
  const aboutStatus = useSelector((state) => state.about.status);
  const aboutError = useSelector((state) => state.about.error);

  console.log('aboutData', aboutData[0]);
  console.log('aboutStatus', aboutStatus);
  console.log('aboutError', aboutError);

  const aboutItem = aboutData[0];

  console.log('aboutItem', aboutItem);




  const fetchAboutData = useCallback(async () => {
    await dispatch(fetchAboutThunk());
  }, [dispatch]);


  // panggil fetchAboutData saat komponen dimuat
  useEffect(() => {

    // cek status redux
    if (aboutStatus === 'idle' || aboutStatus === 'failed') {
      fetchAboutData();
    }
  }, [fetchAboutData, aboutStatus]);


  useEffect(() => {

    // cek error redux
    if (aboutError && aboutStatus === 'failed') {
      // tampilkan pesan error
      addToast({ message: aboutError, type: 'error' });
    }
  }, [aboutError, aboutStatus]);


  return (
    <div className='h-auto relative overflow-hidden py-12'>
      {/* Konten Utama */}
      <div className='container mx-auto px-6 md:px-20 py-6 relative z-20'>
        <div className='flex flex-col mb-8'>
          <h1 className='text-3xl font-bold text-emerald-600 '>Tentang Kami</h1>
          <hr className='text-emerald-600 w-full border mt-4' />
        </div>

        {/* Tampilkan deskripsi hanya jika aboutItem ada */}
        {aboutItem ? (
          <Descriptions className='w-full flex flex-col'>
            <Descriptions.Item label="Nama" span={3}>{aboutItem.name || 'N/A'}</Descriptions.Item>
            <Descriptions.Item
              label="Tanggal Berdiri"
              span={3}
            >
              {/* aboutItem.tanggal dan format */}
              {aboutItem.tanggal ? dayjs(aboutItem.tanggal).format('DD MMMM YYYY') : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item
              label="Visi"
              span={3}
            >
              {aboutItem.visi || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item
              label="Misi"
              span={3}
            >
              {/* PERBAIKAN: Pastikan misi adalah array sebelum map */}
              {aboutItem.misi && Array.isArray(aboutItem.misi) && aboutItem.misi.length > 0 ? (
                <ul className="list-disc list-inside pl-4"> {/* Gunakan unordered list untuk misi */}
                  {aboutItem.misi.map((misi, index) => (
                    <li key={index} className="mb-1">
                      {misi}
                    </li>
                  ))}
                </ul>
              ) : (
                'N/A'
              )}
            </Descriptions.Item>
            <Descriptions.Item
              label="Tentang"
              span={3}
            >
              {aboutItem.about || 'N/A'}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          // Fallback jika aboutItem null/undefined setelah loading selesai
          <div className='py-8 text-center text-gray-500'>
            <p>Tidak ada data profil untuk ditampilkan.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AboutPage
