import React, { useState, useEffect } from 'react';
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
} from "@heroui/react";
import { addToast } from '@heroui/toast';
import EditKegiatanAdminComponent from './EditKegiatanAdminComponent';
import DeleteKegiatanAdminComponent from './DeleteKegiatanAdminComponent';
import AddKegiatanAdminComponent from './AddKegiatanAdminComponent';
import FetchFromAxios from '../utils/AxiosUtil';
import getAPI from '../common/getAPI';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { setKegiatan } from '../store/kegiatanSliceRedux';
dayjs.locale('id');

const KegiatanAdminComponent = () => {
  // State untuk mengontrol modal
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  // State untuk data kegiatan
  const [kegiatanData, setKegiatanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedKegiatan, setSelectedKegiatan] = useState(null);

  const dispatch = useDispatch();

  // Fungsi untuk mengambil data kegiatan dari backend
  const fetchKegiatanData = async () => {
    setLoading(true);
    try {
      const response = await FetchFromAxios({
        ...getAPI.getKegiatan,
      });

      if (response.data.success && Array.isArray(response.data.data)) {
        setKegiatanData(response.data.data);
        dispatch(setKegiatan(response.data.data));
      } else {
        setKegiatanData([]);
        addToast({ title: response.data.message || "Gagal memuat data kegiatan.", variant: 'error' });
      }
    } catch (error) {
      setKegiatanData([]);
      addToast({ title: error.response?.data?.message || "Kesalahan mengambil data kegiatan.", variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKegiatanData();
  }, [dispatch]);


  // --- Fungsi Handle Modal ---

  const handleShowAddModal = () => {
    setIsModalOpenAdd(true);
  };

  const handleCancelAddModal = () => {
    setIsModalOpenAdd(false);
  };

  const handleAddSuccess = () => {
    fetchKegiatanData();
    setIsModalOpenAdd(false);
    addToast({ title: "Kegiatan berhasil ditambahkan!", variant: 'success' });
  };

  const handleShowEditModal = (kegiatan) => {
    setSelectedKegiatan(kegiatan);
    setIsModalOpenEdit(true);
  };

  const handleCancelEditModal = () => {
    setIsModalOpenEdit(false);
    setSelectedKegiatan(null);
  };

  const handleEditSuccess = (updatedKegiatan) => {
    fetchKegiatanData();
    setIsModalOpenEdit(false);
    setSelectedKegiatan(null);
    addToast({ title: "Kegiatan berhasil diupdate!", variant: 'success' });
  };

  const handleShowDeleteModal = (kegiatan) => {
    setSelectedKegiatan(kegiatan);
    setIsModalOpenDelete(true);
  };

  const handleCancelDeleteModal = () => {
    setIsModalOpenDelete(false);
    setSelectedKegiatan(null);
  };

  const handleDeleteSuccess = (deletedId) => {
    fetchKegiatanData();
    setIsModalOpenDelete(false);
    setSelectedKegiatan(null);
    addToast({ title: "Kegiatan berhasil dihapus!", variant: 'success' });
  };

  const itemsPerPage = 5;
  const paginatedData = kegiatanData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(kegiatanData.length / itemsPerPage);



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
        <h1 className='text-3xl font-extrabold text-emerald-700'>Manajemen Kegiatan</h1>
        <hr className='border-t-2 border-gray-200 w-80 mt-2 mb-4' />
      </div>

      <div className='mb-6'>
        <Button
          color='success'
          variant='bordered'
          onPress={handleShowAddModal}
          className='py-2 px-6 rounded-lg text-lg font-semibold'
        >
          Tambah Kegiatan Baru
        </Button>

        {isModalOpenAdd && (
          <AddKegiatanAdminComponent
            isAddModalOpen={isModalOpenAdd}
            handleCancelAdd={handleCancelAddModal}
            onAddSuccess={handleAddSuccess}
          />
        )}
      </div>

      <div className='bg-white shadow-lg rounded-xl overflow-hidden'>
        <div className='overflow-x-auto'>
          <Table
            aria-label='Tabel Kegiatan'
            selectionMode='single'
            bottomContent={
              kegiatanData.length > 0 && totalPages > 1 && (
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
              <TableColumn className='text-emerald-700 font-bold'>Nama Kegiatan</TableColumn>
              <TableColumn className='text-emerald-700 font-bold'>Tanggal</TableColumn>
              <TableColumn className='text-emerald-700 font-bold'>Deskripsi</TableColumn>
              <TableColumn className='text-emerald-700 font-bold'>Foto</TableColumn>
              <TableColumn className='text-emerald-700 font-bold text-center'>Aksi</TableColumn>
            </TableHeader>
            <TableBody
              isLoading={loading}
              loadingContent={<Spinner label="Memuat kegiatan..." />}
              // Pastikan emptyContent berupa TableRow dengan TableCell yang memiliki colSpan
              emptyContent={
                !loading && kegiatanData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                      Tidak ada data kegiatan.
                    </TableCell>
                  </TableRow>
                ) : null
              }
            >
              {paginatedData.map((kegiatan, index) => (
                <TableRow key={kegiatan.id || `kegiatan-${index}`}>
                  <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                  <TableCell>{kegiatan.name}</TableCell>
                  <TableCell>{kegiatan.date ? dayjs(kegiatan.date).format('dddd, DD-MM-YYYY') : 'N/A'}</TableCell>
                  <TableCell className='line-clamp-6 md:line-clamp-none max-w-xs text-sm text-wrap'>
                    {kegiatan.description}
                  </TableCell>
                  <TableCell>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 p-1'>
                      {kegiatan.image && kegiatan.image.length > 0 ? (
                        kegiatan.image.map((fotoUrl, fotoIndex) => (
                          <Image
                            key={fotoIndex}
                            alt={`Foto Kegiatan ${index + 1}-${fotoIndex + 1}`}
                            src={fotoUrl}
                            className="w-20 h-12 object-cover rounded-md shadow-sm"
                          />
                        ))
                      ) : (
                        <span className='text-gray-500 text-xs'>Tidak ada foto</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col sm:flex-row gap-2 justify-center items-center'>
                      <Button color='danger' variant='flat' onPress={() => handleShowDeleteModal(kegiatan)} size='sm' className='min-w-[70px]'>Hapus</Button>
                      <Button color='success' variant='flat' onPress={() => handleShowEditModal(kegiatan)} size='sm' className='min-w-[70px]'>Edit</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {isModalOpenEdit && (
        <EditKegiatanAdminComponent
          isModalOpen={isModalOpenEdit}
          handleCancel={handleCancelEditModal}
          initialValues={selectedKegiatan}
          onEditSuccess={handleEditSuccess}
        />
      )}

      {isModalOpenDelete && (
        <DeleteKegiatanAdminComponent
          isDeleteModalOpen={isModalOpenDelete}
          handleCancel={handleCancelDeleteModal}
          kegiatanToDelete={selectedKegiatan}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}

export default KegiatanAdminComponent;

