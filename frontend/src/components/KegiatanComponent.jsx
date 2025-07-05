import { addToast, Button, Card, CardBody, CardFooter, Image } from '@heroui/react';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchKegiatanThunk } from '../store/kegiatanSliceRedux';


const KegiatanComponent = () => {

  // data kegiatan redux
  const kegiatanData = useSelector((state) => state.kegiatan.data);
  const kegiatanStatus = useSelector((state) => state.kegiatan.status);
  const kegiatanError = useSelector((state) => state.kegiatan.error);
  const currentPage = useSelector((state) => state.kegiatan.currentPage);
  const limit = useSelector((state) => state.kegiatan.limit);


  const dispatch = useDispatch();
  const navigate = useNavigate();


  // Fungsi untuk memicu pengambilan data kegiatan dari Redux
  const refreshFetchKegiatanData = useCallback(async (pageToFetch, limitToFetch) => {

    // Dispatch thunk fetchKegiatanThunk dengan parameter page dan limit
    await dispatch(fetchKegiatanThunk({ page: pageToFetch, limit: limitToFetch }));
  }, [dispatch]);

  // panggil refreshFetchKegiatanData saat komponen dimuat
  useEffect(() => {
    // cek status kegiatan dan isi parameter
    if (currentPage && limit && (kegiatanStatus === 'idle' || kegiatanStatus === 'failed')) {
      // jika status idle atau failed, maka panggil refreshFetchKegiatanData
      refreshFetchKegiatanData(currentPage, limit);
    }
  }, [refreshFetchKegiatanData, currentPage, limit, kegiatanStatus]);

  // Tampilkan toast error jika ada error dari Redux
  useEffect(() => {
    if (kegiatanStatus === 'failed' && kegiatanError) {
      addToast({ title: `Error: ${kegiatanError}`, variant: 'error' });
    }
  }, [kegiatanStatus, kegiatanError]);


  const handleNavigateKegiatan = (kegiatanId) => {
    navigate(`/kegiatan/${kegiatanId._id}`);
  }


  return (
    <div className='h-auto'>

      <div className='flex justify-center items-center'>
        <h1 className='text-3xl font-bold text-emerald-600 '>Kegiatan</h1>
      </div>
      <div className='flex flex-col md:flex-row items-center justify-center gap-4 px-6 md:mx-20 my-4 py-6'>

        {
          // tampilkan hanya 3 kegiatan
          kegiatanData && kegiatanData.slice(0, 3).map((kegiatan, index) => (
            <div className='flex flex-col gap-3' key={index + kegiatan._id}>

              <Card
                className="py-4 w-80 h-[24rem] max-w-80 max-h-[24rem]"
              >
                <CardBody className="overflow-hidden items-center justify-center py-2 rounded-md">
                  <Image
                    alt="Card background"
                    className="object-cover w-96 h-96 "
                    src={kegiatan.image[0]}

                  />
                </CardBody>
                <CardFooter className="pb-0 pt-2 px-4 flex-col items-start h-full">
                  <h4 className="font-bold text-md text-wrap">{kegiatan.name}</h4>
                  <small className="text-default-500 line-clamp-4 text-justify">
                    {kegiatan.description}
                  </small>

                </CardFooter>
                <small
                  className='px-4 text-md text-emerald-600 hover:text-emerald-800 cursor-pointer'
                  onClick={() => handleNavigateKegiatan(kegiatan)}
                >
                  Lihat Selengkapnya
                </small>

              </Card>
            </div>
          ))
        }


      </div>
      <div className='mt-4 items-center flex justify-center'>
        <Button
          variant='bordered'
          color='success'
        >
          <Link to='/kegiatan'>
            Lihat Lainnya
          </Link>
        </Button>
      </div>


    </div >
  )
}

export default KegiatanComponent
