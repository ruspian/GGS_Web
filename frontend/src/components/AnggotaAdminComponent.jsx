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



const AnggotaAdminComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dataAnggota, setDataAnggota] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnggota, setSelectedAnggota] = useState(null);


  // fungsi ambil semua data Anggota
  const fetchAllDataAnggota = async () => {
    try {
      setLoading(true);
      const response = await FetchFromAxios({
        ...getAPI.getAllAnggota,
      });


      // jika berhasil
      if (response.data.success) {
        setDataAnggota(response.data.data);
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
  }

  useEffect(() => {
    fetchAllDataAnggota();
  }, [])


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
    fetchAllDataAnggota();
  }


  // pagination anggota
  const itemsPerPage = 5;
  const paginatedData = dataAnggota.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(dataAnggota.length / itemsPerPage);

  console.log('selectedAnggota', selectedAnggota);



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
              dataAnggota.length > 0 && totalPages > 1 && (
                <div className='flex w-full justify-center py-4'>
                  <Pagination
                    size='sm'
                    total={totalPages}
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
              {paginatedData.map((anggota, index) => (
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
