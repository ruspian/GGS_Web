import aboutImage from '../assets/aboutImage.png';
import { addToast, Button, Image } from '@heroui/react';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutThunk } from '../store/aboutSliceRedux';
import { Link } from 'react-router-dom';

const AboutComponent = () => {

  const dispatch = useDispatch();

  const aboutData = useSelector((state) => state.about.data);
  const aboutStatus = useSelector((state) => state.about.status);
  const aboutError = useSelector((state) => state.about.error);


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
    <div className='h-auto'>
      <div className='flex flex-col items-center justify-center md:flex-row gap-4 px-6 md:mx-20 my-8 py-6 border rounded-sm shadow-xl'>

        <div>
          <Image
            alt={`aboutImage-${aboutImage}`}
            src={aboutImage}
            className="w-full h-full object-cover rounded-md animate-float1"
          />
        </div>

        {
          aboutData[0] && (
            aboutData.map((about, index) => (
              <div key={about._id + index}>
                <h1 className='text-3xl font-bold text-emerald-600'>Tentang <span className='text-gray-800'>Kami</span></h1>
                <p className='my-4 text-gray-600 text-justify'>
                  {about.about}
                </p>

                <Button
                  variant='bordered'
                  color='success'
                  size='sm'
                  radius='sm'
                  className='text-xs text-gray-500 hover:text-gray-800 cursor-pointer py-3'
                >
                  <Link to={'/tentang'}>
                    Lihat Selengkapnya
                  </Link>
                </Button>
              </div>
            ))
          )
        }


      </div>
    </div>
  )
}

export default AboutComponent
