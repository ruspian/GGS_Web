import React, { useEffect, useState } from 'react'
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
import FetchFromAxios from '../utils/AxiosUtil';
import getAPI from '../common/getAPI';
import DeleteAnggotaAdminComponent from './DeleteAnggotaAdminComponent';
import { useCallback } from 'react';



const AnggotaAdminComponent = () => {
  const [currentPage, setCurrentPage] = useState(1); // halaman saat ini
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dataAnggota, setDataAnggota] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnggota, setSelectedAnggota] = useState(null);
  const [totalPageCount, setTotalPageCount] = useState(1); // total halaman dari backend
  const [totalItemsCount, setTotalItemsCount] = useState(0); // total item dari backend

  // jumlah item per halaman
  const itemsPerPage = 6;


  // fungsi ambil semua data Anggota
  const fetchAllDataAnggota = useCallback(async () => {
    try {


      setLoading(true);
      const response = await FetchFromAxios({
        ...getAPI.getAllAnggota,
        data: {
          page: currentPage,
          limit: itemsPerPage
        }
      });


      // jika berhasil
      if (response.data.success) {
        setDataAnggota(response.data.data);
        setTotalPageCount(response.data.totalPage);
        setTotalItemsCount(response.data.totalCount);

      } else {
        setDataAnggota([]);
        addToast({ title: response.data.message || "Gagal memuat data anggota.", variant: 'error' });
      }
    } catch (error) {
      setDataAnggota([]);
      addToast({ title: error.response?.data?.message || "Kesalahan mengambil data anggota.", variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]); // muat ulang saat nilai dari depedensi berubah

  useEffect(() => {
    fetchAllDataAnggota();
  }, [fetchAllDataAnggota])


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
    // Jika hanya ada 1 item di halaman ini dan bukan halaman pertama
    if (dataAnggota.length === 1 && currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1); // Pindah ke halaman sebelumnya
    } else {
      fetchAllDataAnggota(); // Refresh data di halaman yang sama
    }
  }


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
              totalItemsCount > 0 && totalPageCount > 1 && (
                <div className='flex w-full justify-center py-4'>
                  <Pagination
                    size='sm'
                    total={totalPageCount}
                    page={currentPage}
                    onChange={setCurrentPage}
                    limit={itemsPerPage}
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
                  <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                  <TableCell>{anggota.user_id.name}</TableCell>
                  <TableCell>{anggota.user_id.aboutme || '-'}</TableCell>
                  <TableCell>{anggota.user_id.status}</TableCell>
                  <TableCell>{
                    dayjs(anggota.user_id.last_login_date).format('dddd, DD MMMM YYYY')
                  }</TableCell>
                  <TableCell>
                    {
                      anggota.user_id.avatar ? (
                        <Image
                          src={anggota.user_id.avatar}
                          alt={anggota.user_id.name}
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
