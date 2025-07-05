import React, { useEffect, useState, useCallback } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Image,
  Button,
  Modal,
  addToast
} from "@heroui/react";
import dayjs from 'dayjs';
import DeleteAnggotaAdminComponent from './DeleteAnggotaAdminComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnggotaThunk, setCurrentPage } from '../store/anggotaSliceRedux';



const AnggotaAdminComponent = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAnggota, setSelectedAnggota] = useState(null);

  const dispatch = useDispatch();

  // ambil data anggota dari redux
  const dataAnggota = useSelector((state) => state.anggota.data);
  const anggotaStatus = useSelector((state) => state.anggota.status);
  const anggotaError = useSelector((state) => state.anggota.error);
  const totalPage = useSelector((state) => state.anggota.totalPage);
  const totalCount = useSelector((state) => state.anggota.totalCount);
  const limit = useSelector((state) => state.anggota.limit);
  const currentPage = useSelector((state) => state.anggota.currentPage);


  // fungsi ambil semua data anggota dari redux
  const fetchAllDataAnggota = useCallback(async (pageToFetch, limitToFetch) => {

    await dispatch(fetchAnggotaThunk({ page: pageToFetch, limit: limitToFetch }));
  }, [dispatch]);


  // panggil fungsi ambil semua data anggota saat komponen dimuat
  useEffect(() => {

    // cek redux
    if (currentPage && limit && (anggotaStatus === "idle" || anggotaStatus === "failed")) {
      fetchAllDataAnggota(currentPage, limit);
    }
  }, [currentPage, limit, anggotaStatus, fetchAllDataAnggota]);

  // tampilkan error jika gagal ambil data anggota
  useEffect(() => {
    if (anggotaError && anggotaStatus === "failed") {
      addToast({ title: `Error: ${anggotaError}`, variant: 'error' });
    }
  })

  // fungsi tamppilkan modal hapus
  const showModalDelete = (anggota) => {
    setSelectedAnggota(anggota);
    setIsDeleteModalOpen(true);
  }

  // fungsi tutup modal hapus
  const handleCancelDelete = () => {
    setSelectedAnggota(null);
    setIsDeleteModalOpen(false);
  }

  // fungsi jika hapus berhasil
  const onDeleteSuccess = () => {
    setSelectedAnggota(null);
    setIsDeleteModalOpen(false);
    fetchAllDataAnggota(currentPage, limit);
  }

  const handleChangePage = (page) => {
    dispatch(setCurrentPage(page));
    fetchAllDataAnggota(page, limit);
  }

  const loading = anggotaStatus === "loading";


  // loading
  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8 min-h-screen flex items-center justify-center'>
        <Spinner size='lg' color='emerald' label='Memuat data kegiatan...' />
      </div>
    );
  }
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6'>
        <h1 className='text-3xl font-extrabold text-emerald-700'>Anggota</h1>
        <hr className='border-t-2 border-emerald-400 w-24 mt-2 mb-4' />
      </div>


      <div className='bg-white shadow-lg rounded-xl overflow-hidden'>
        <div className='overflow-x-auto'>
          <Table
            aria-label='Tabel Kegiatan'
            selectionMode='single'
            bottomContent={
              totalCount > 0 && totalPage > 1 && (
                <div className='flex w-full justify-center py-4'>
                  <Pagination
                    size='sm'
                    total={totalPage}
                    page={currentPage}
                    onChange={handleChangePage}
                    limit={limit}
                    color='success'
                    variant='light'
                    radius='full'
                  />
                </div>
              )
            }
          >
            <TableHeader>
              <TableColumn className='text-emerald-700 font-bold'>No</TableColumn>
              <TableColumn className='text-emerald-700 font-bold'>Nama</TableColumn>
              <TableColumn className='text-emerald-700 font-bold'>Story</TableColumn>
              <TableColumn className='text-emerald-700 font-bold'>Status</TableColumn>
              <TableColumn className='text-emerald-700 font-bold'>Terakhir Login</TableColumn>
              <TableColumn className='text-emerald-700 font-bold'>Foto</TableColumn>
              <TableColumn className='text-emerald-700 font-bold text-center'>Aksi</TableColumn>
            </TableHeader>
            <TableBody
              isLoading={loading}
              loadingContent={<Spinner label="Memuat kegiatan..." />}
              // Pastikan emptyContent berupa TableRow dengan TableCell yang memiliki colSpan
              emptyContent={
                !loading && dataAnggota.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                      Tidak ada data kegiatan.
                    </TableCell>
                  </TableRow>
                ) : null
              }
            >
              {dataAnggota.map((anggota, index) => (
                <TableRow key={anggota.id || `anggota-${index}`}>
                  <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell>
                  <TableCell>{anggota?.user_id?.name}</TableCell>
                  <TableCell>{anggota?.user_id?.aboutme || '-'}</TableCell>
                  <TableCell>{anggota?.user_id?.status}</TableCell>
                  <TableCell>{
                    dayjs(anggota?.user_id?.last_login_date).format('dddd, DD MMMM YYYY')
                  }</TableCell>
                  <TableCell>
                    {
                      anggota?.user_id?.avatar ? (
                        <Image
                          src={anggota?.user_id?.avatar}
                          alt={anggota?.user_id?.name}
                          className='w-12 h-12 rounded-md object-cover'
                        />
                      ) : (
                        <span className='text-gray-500'>Tidak ada gambar</span>
                      )
                    }

                  </TableCell>


                  <TableCell>
                    <div className='flex flex-col sm:flex-row gap-2 justify-center items-center'>
                      <Button
                        color='danger'
                        variant='flat'
                        onPress={() => showModalDelete(anggota)}
                        size='sm' className='min-w-[70px]'
                      >
                        Hapus
                      </Button>

                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteAnggotaAdminComponent
          isDeleteModalOpen={isDeleteModalOpen}
          handleCancel={handleCancelDelete}
          anggotaToDelete={selectedAnggota}
          onDeleteSuccess={onDeleteSuccess}
        />
      )}
    </div>
  )
}

export default AnggotaAdminComponent
