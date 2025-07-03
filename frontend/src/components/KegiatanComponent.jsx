import { addToast, Button, Card, CardBody, CardFooter, Image } from '@heroui/react';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchKegiatanThunk } from '../store/kegiatanSliceRedux';


const KegiatanComponent = () => {

  // data kegiatan redux
  const kegiatanData = useSelector((state) => state.kegiatan.data);
  const kegiatanStatus = useSelector((state) => state.kegiatan.status);
  const kegiatanError = useSelector((state) => state.kegiatan.error);
  // const totalPage = useSelector((state) => state.kegiatan.totalPage);
  // const totalCount = useSelector((state) => state.kegiatan.totalCount);
  const currentPage = useSelector((state) => state.kegiatan.currentPage);
  const limit = useSelector((state) => state.kegiatan.limit);


  const dispatch = useDispatch();


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
                className="py-4 max-w-80 max-h-[35rem] text-justify"
              >
                <CardBody className="overflow-hidden py-2 w-80 h-64">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl w-full h-full "
                    src={kegiatan.image[0]}

                  />
                </CardBody>
                <CardFooter className="pb-0 pt-2 px-4 flex-col items-start h-full">
                  <h4 className="font-bold text-large">{kegiatan.name}</h4>
                  <small className="text-default-500 line-clamp-4">
                    {kegiatan.description}
                  </small>
                </CardFooter>

                <Link
                  to='#'
                  className='pt-2 px-4 text-md text-emerald-600 hover:text-emerald-800'
                >
                  <small>Lihat Selengkapnya</small>
                </Link>
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
