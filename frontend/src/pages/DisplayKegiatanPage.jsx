import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { fetchKegiatanByIdThunk } from '../store/kegiatanSliceRedux';
import { Breadcrumb, Button, Carousel, Image, Input, Modal } from 'antd';
import dayjs from 'dayjs';
import { FaRegCommentDots } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
import { BiDislike, BiLike } from 'react-icons/bi';
import KomentarComponent from '../components/KomentarComponent';
import FormKomentarComponent from '../components/FormKomentarComponent';
import { addToast } from '@heroui/react'
import FetchFromAxios from '../utils/AxiosUtil';
import getAPI from '../common/getAPI';


const COMMENT_PER_LOAD = 3;

const DisplayKegiatanPage = () => {

  const [comment, setComment] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // state untuk like dan dislike
  const [currentLikeCount, setCurrentLikeCount] = useState(0);
  const [currentDislikeCount, setCurrentDislikeCount] = useState(0);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [userHasDisliked, setUserHasDisliked] = useState(false);

  // state untuk share
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState('');


  const params = useParams();
  const dispatch = useDispatch();

  const selectedKegiatanRedux = useSelector((state) => state.kegiatan.selectedKegiatan);
  const userRedux = useSelector((state) => state.user);


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


  // ambil komentar dari backend
  const fetchKomentar = useCallback(async (id, page = 1) => {
    // pastikan id kegiatan ada
    if (!id) {
      addToast({ title: "Kegiatan tidak ditemukan.", variant: 'error' });
      setComment([]);
      setCommentCount(0);
      return;
    }

    try {

      const skip = (page - 1) * COMMENT_PER_LOAD;

      // kirim request ke backend
      const response = await FetchFromAxios({
        ...getAPI.getComment,
        data: {
          kegiatanId: id,
          skip: skip,
          limit: COMMENT_PER_LOAD
        },
      });

      console.log('response', response);


      if (response.data.success) {
        setCommentCount(response.data.commentCount || 0); // Set total count dari backend

        if (page === 1) {
          // Jika ini permintaan halaman pertama, ganti komentar yang ada
          setComment(response.data.data || []);
        } else {
          // Jika ini permintaan "load more", tambahkan komentar baru ke yang sudah ada
          setComment(prevComments => [...prevComments, ...(response.data.data || [])]);
        }
        setCurrentPage(page); // Update halaman saat ini
      }
    } catch (error) {
      addToast({ title: error.response?.data?.message || "Kesalahan saat mengambil komentar.", variant: 'error' });
    }
  }, []);

  // panggil fetchKomentar saat komponen selectesKegiatanRedux berubah
  useEffect(() => {

    // pastikan id kegiatan ada
    if (selectedKegiatanRedux?._id) {
      fetchKomentar(selectedKegiatanRedux._id);
    } else {
      setComment([]);
    }
  }, [selectedKegiatanRedux, fetchKomentar]);

  const onSuccessAddComment = () => {
    fetchKomentar(selectedKegiatanRedux._id);
  };

  // fungsi handle load more comment
  const handleLoadMoreComment = () => {
    fetchKomentar(selectedKegiatanRedux._id, currentPage + 1);
  }

  // fungsi handle kembalikan ke tampilan sedikit
  const handleLoadLess = () => {
    fetchKomentar(selectedKegiatanRedux._id, 1);
  }

  // cek apakah masih ada comment
  const hasMoreComment = comment.length < commentCount;


  // fungsi handle like dan dislike
  const handleLikeDislike = useCallback(async (actionType) => {

    // pastikan user ada
    if (!userRedux || !userRedux._id) {
      addToast({ title: "Anda belum login, silahkan login terlebih dahulu!", variant: 'error' });
      return;
    }

    // cek juga id kegiatan
    if (!selectedKegiatanRedux?._id) {
      addToast({ title: "Kegiatan tidak ditemukan!", variant: 'error' });
      return;
    }

    // kirim request ke backend
    try {
      const response = await FetchFromAxios({
        ...getAPI.actionLikeDislikeKegiatan,
        data: {
          kegiatanId: selectedKegiatanRedux._id,
          action: actionType
        }
      })

      // jika sukses
      if (response.data.success) {
        // addToast({ title: response.data.message, variant: 'success' });
        setCurrentLikeCount(response.data.data.likeCount);
        setCurrentDislikeCount(response.data.data.dislikeCount);
        setUserHasLiked(response.data.data.userHasLiked);
        setUserHasDisliked(response.data.data.userHasDisliked);
      }
    } catch (error) {
      addToast({ title: error.response?.data?.message || "Kesalahan saat mengambil komentar.", variant: 'error' });
    }
  }, [selectedKegiatanRedux, userRedux]);

  useEffect(() => {
    if (selectedKegiatanRedux) {
      setCurrentLikeCount(selectedKegiatanRedux?.like?.length || 0);
      setCurrentDislikeCount(selectedKegiatanRedux?.dislike?.length || 0);

      const userId = userRedux?._id;
      // cek apakah user sudah like atau dislike
      setUserHasLiked(selectedKegiatanRedux?.like?.includes(userId));
      setUserHasDisliked(selectedKegiatanRedux?.dislike?.includes(userId));
    }
  }, [selectedKegiatanRedux, userRedux]);


  // --- FUNGSI SHARE ---
  const handleShareClick = () => {
    const currentUrl = window.location.href; // Dapatkan URL halaman saat ini
    setShareLink(currentUrl);
    setIsShareModalOpen(true);
  };

  const handleCopyLink = () => {
    if (shareLink) {
      // Gunakan document.execCommand('copy') karena navigator.clipboard mungkin tidak berfungsi di iframe
      const el = document.createElement('textarea');
      el.value = shareLink;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      addToast({ title: 'Link disalin ke clipboard', variant: 'success' });
    } else {
      addToast({ title: 'Link tidak tersedia', variant: 'error' });
    }
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
    setShareLink(''); // Bersihkan link saat modal ditutup
  };


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

          <small className='flex gap-2 cursor-pointer'>
            <FaRegCommentDots size={20} />
            {commentCount}
          </small>

          <small
            className={`flex gap-2 cursor-pointer `}
            onClick={() => handleLikeDislike('like')}
          >
            <BiLike size={21} className={`${userHasLiked ? 'text-blue-600' : 'text-gray-600'}`} />
            {currentLikeCount}
          </small>

          <small
            className={`flex gap-2 cursor-pointer `}
            onClick={() => handleLikeDislike('dislike')}
          >
            <BiDislike size={21} className={`${userHasDisliked ? 'text-red-600' : 'text-gray-600'}`} />
            {currentDislikeCount}
          </small>

          <small className='flex gap-2 cursor-pointer' onClick={handleShareClick}>
            <FiShare2 size={21} className='' />
          </small>
        </div>

        <div>
          <KomentarComponent comment={comment} />

          {
            // tampilkan komentar lainnya jika komentar lebih dari 3
            comment.length > 3 && (
              // tampilkan tombol load more jika masih ada comment
              hasMoreComment ? (
                <div className='flex items-center justify-center'>
                  <small
                    className='cursor-pointer text-sm text-gray-500'
                    onClick={handleLoadMoreComment}
                  >
                    Tampilkan lebih banyak komentar
                  </small>
                </div>
              ) : (
                <div className='flex items-center justify-center'>
                  <small
                    className='cursor-pointer text-sm text-gray-500'
                    onClick={handleLoadLess}
                  >
                    Tampilkan lebih sedikit komentar
                  </small>
                </div>
              )
            )
          }
        </div>

        <div>
          <FormKomentarComponent
            kegiatanId={selectedKegiatanRedux?._id || params.id}
            onSuccessAddComment={onSuccessAddComment} />
        </div>
      </div>

      {/* Share Modal */}
      <Modal
        title='Bagikan Kegiatan'
        open={isShareModalOpen}
        onCancel={handleCloseShareModal}
        footer={[
          <Button key="copy" type="primary" onClick={handleCopyLink}>
            Salin
          </Button>,
          <Button key="close" onClick={handleCloseShareModal}>
            Tutup
          </Button>,
        ]}
      >
        <Input
          value={shareLink}
          readOnly
          style={{ marginBottom: 16 }}
        />
        <p className="text-sm text-gray-500">
          Bagikan link kegiatan ini ke teman-teman Anda
        </p>
      </Modal>
    </div >
  )
}

export default DisplayKegiatanPage
