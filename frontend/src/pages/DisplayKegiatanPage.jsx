import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { fetchKegiatanByIdThunk } from '../store/kegiatanSliceRedux';
import { Breadcrumb, Button, Carousel, Form, Image, Input } from 'antd';
import dayjs from 'dayjs';
import { FaRegCommentDots } from 'react-icons/fa';
import { BiDislike, BiLike } from 'react-icons/bi';
import TextArea from 'antd/es/input/TextArea';

const DisplayKegiatanPage = () => {

  const params = useParams();
  const dispatch = useDispatch();

  const selectedKegiatanRedux = useSelector((state) => state.kegiatan.selectedKegiatan);


  // fetch data kegiatan dengan thunk
  const fetchKegiatanById = useCallback(async (id) => {
    await dispatch(fetchKegiatanByIdThunk({ _id: id }));
  }, [dispatch]);

  // panggil fetchKegiatanById saat komponen dimuat
  useEffect(() => {
    // pastikan id kegiatan ada dalam params
    if (params.id) {
      fetchKegiatanById(params.id);
    }
  }, [fetchKegiatanById, params.id]);


  console.log("selectedKegiatanRedux", selectedKegiatanRedux);

  return (
    <div className='h-auto'>

      <div className='flex mx-auto justify-start items-start px-6 md:mx-20 my-4 py-6'>
        {/* navigasi Breadcrumb */}
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Beranda</Link>,
            },
            {
              title: <Link to="/kegiatan">Kegiatan</Link>,
            },
          ]}
        />
      </div>

      <div className='flex flex-col gap-4 px-6 md:mx-20 my-4 py-6'>
        {/* judul kegiatan */}
        <div>
          <h2 className='text-3xl font-bold'>{selectedKegiatanRedux?.name}</h2>
          <small
            className='text-xs text-gray-500'
          >
            {dayjs(selectedKegiatanRedux?.date).format('dddd, DD MMMM YYYY')}
          </small>
        </div>

        {/* gambar kegiatan */}
        <div>
          <Carousel autoplay className='max-w-[45rem] max-h-[30rem]'>
            {
              selectedKegiatanRedux?.image && selectedKegiatanRedux?.image.map((img, index) => (
                <div key={`image-${index}`} className='w-96 h-96 items-center justify-center'>
                  <Image
                    src={img}
                    alt={`image-${img}`}
                    style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                  />
                </div>
              ))
            }
          </Carousel>
        </div>

        <div className='p-[0.5px] bg-slate-300 my-2'></div>

        {/* deskripsi kegiatan */}
        <div>
          <p className='text-justify'>{selectedKegiatanRedux?.description}</p>
        </div>

        <div className='p-[0.5px] bg-slate-300 my-2'></div>

        {/* komentar kegiatan */}
        <div className='flex justify-end px-4 gap-4'>
          <small className='flex gap-2'>
            <FaRegCommentDots size={20} />
            {selectedKegiatanRedux?.comment}
          </small>

          <small className='flex gap-2'>
            <BiLike size={21} className='' />
            {selectedKegiatanRedux?.like}
          </small>

          <small className='flex gap-2'>
            <BiDislike size={21} className='' />
            {selectedKegiatanRedux?.dislike}
          </small>
        </div>

        <div className=''>
          <Form
            name="komentar"
            layout="vertical"
            className='w-full'
          >
            <Form.Item name="coment" label="Komentar" className='w-full'>
              <TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Komentar
              </Button>
            </Form.Item>
          </Form>
        </div>

      </div>
    </div >
  )
}

export default DisplayKegiatanPage
