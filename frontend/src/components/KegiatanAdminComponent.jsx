import React, { useCallback, useEffect, useState } from 'react';
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
  addToast,
} from "@heroui/react";
import EditKegiatanAdminComponent from './EditKegiatanAdminComponent';
import DeleteKegiatanAdminComponent from './DeleteKegiatanAdminComponent';
import AddKegiatanAdminComponent from './AddKegiatanAdminComponent';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKegiatanThunk, setCurrentPage } from '../store/kegiatanSliceRedux';
dayjs.locale('id');

const KegiatanAdminComponent = () => {
  // State 
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [selectedKegiatan, setSelectedKegiatan] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1);

  // data kegiatan redux
  const kegiatanData = useSelector((state) => state.kegiatan.data);
  const kegiatanStatus = useSelector((state) => state.kegiatan.status);
  const kegiatanError = useSelector((state) => state.kegiatan.error);
  const totalPage = useSelector((state) => state.kegiatan.totalPage);
  const totalCount = useSelector((state) => state.kegiatan.totalCount);
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




  // --- Fungsi Handle Modal ---

  const handleShowAddModal = () => {
    setIsModalOpenAdd(true);
  };

  const handleCancelAddModal = () => {
    setIsModalOpenAdd(false);
  };

  const handleAddSuccess = async () => {
    setIsModalOpenAdd(false);

    await refreshFetchKegiatanData();
  };


  const handleShowEditModal = (kegiatan) => {

    // Pastikan 'kegiatan' dan '_id'nya ada
    if (kegiatan && typeof kegiatan._id === 'string' && kegiatan._id.length > 0) {
      setSelectedKegiatan(kegiatan);
      setIsModalOpenEdit(true);
    } else {
      addToast({ title: "Data kegiatan tidak valid untuk diedit. ID tidak ditemukan.", variant: 'error' });
    }
  };

  const handleCancelEditModal = () => {
    setIsModalOpenEdit(false);
    setSelectedKegiatan(null);
  };

  const handleEditSuccess = () => {
    setIsModalOpenEdit(false);
    refreshFetchKegiatanData(true);
    setSelectedKegiatan(null);
  };

  const handleShowDeleteModal = (kegiatan) => {
    setSelectedKegiatan(kegiatan);
    setIsModalOpenDelete(true);
  };

  const handleCancelDeleteModal = () => {
    setIsModalOpenDelete(false);
    setSelectedKegiatan(null);
  };

  const handleDeleteSuccess = () => {
    setIsModalOpenDelete(false);
    setSelectedKegiatan(null);
    refreshFetchKegiatanData(true); // panggil refreshFetchKegiatanData dengan force=true
  };


  // Handler untuk perubahan halaman pagination
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page)); // Update currentPage di Redux
    refreshFetchKegiatanData(page, limit); // Panggil fetch dengan halaman baru dan limit dari Redux
  };


  // inisialisasi loading
  const loading = kegiatanStatus === 'loading';


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
        <hr className='border-t-2 border-emerald-400 w-24 mt-2 mb-4' />
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
              totalCount > 0 && totalPage > 1 && (
                <div className='flex w-full justify-center py-4'>
                  <Pagination
                    size='sm'
                    total={totalPage}
                    page={currentPage}
                    onChange={handlePageChange}
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
              <TableColumn className='hidden'></TableColumn>
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
              {(Array.isArray(kegiatanData) ? kegiatanData : [])
                .filter((kegiatan) => kegiatan && kegiatan._id) // filter undefined dan yang tidak punya _id
                .map((kegiatan, index) => (
                  <TableRow key={kegiatan?._id}>
                    <TableCell className='hidden'>{kegiatan._id}</TableCell>
                    <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell>
                    <TableCell>{kegiatan.name}</TableCell>
                    <TableCell>{kegiatan.date ? dayjs(kegiatan.date).format('dddd, DD-MM-YYYY') : 'N/A'}</TableCell>
                    <TableCell className='line-clamp-6 text-start max-w-xs text-sm text-wrap'>
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
                        <Button
                          color='danger'
                          variant='flat'
                          onPress={() => handleShowDeleteModal(kegiatan)}
                          size='sm' className='min-w-[70px]'
                        >
                          Hapus
                        </Button>


                        <Button
                          color='success'
                          variant='bordered'
                          onPress={() => handleShowEditModal(kegiatan)}
                          size='sm'
                          className='min-w-[70px]'
                        >
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {isModalOpenEdit && selectedKegiatan?._id && (
        <EditKegiatanAdminComponent
          key={selectedKegiatan._id}
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

