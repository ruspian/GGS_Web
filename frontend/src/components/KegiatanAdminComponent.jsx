import React, { useState } from 'react'
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
  Modal
} from "@heroui/react";
import EditKegiatanAdminComponent from './EditKegiatanAdminComponent';
import DeleteKegiatanAdminComponent from './DeleteKegiatanAdminComponent';

const KegiatanAdminComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  // fungsi tampilkan modal
  const showModalEdit = () => {
    setIsModalOpen(true);
  };

  // fungsi tamppilkan modal hapus
  const showModalDelete = () => {
    setIsDeleteModalOpen(true);
  }



  return (
    <div className='container w-screen mx-auto py-4'>
      <div className='w-full'>
        <h1 className='text-3xl font-bold text-emerald-600'>Kegiatan</h1>
        <hr className='border text-gray-400 w-full mt-2' />
      </div>
      <div className='my-4 w-full'>

        <Table
          aria-label='tabel kegiatan'

          bottomContent={
            <div className='flex w-full justify-center'>
              <Pagination
                size='sm'
                total={10}
                initialPage={1}
                limit={5}
                color='success'
                variant='bordered'
                radius='sm'
              />
            </div>
          }>
          <TableHeader>
            <TableColumn>No</TableColumn>
            <TableColumn>Nama Kegiatan</TableColumn>
            <TableColumn>Tanggal</TableColumn>
            <TableColumn>Deskripsi</TableColumn>
            <TableColumn>Foto</TableColumn>
            <TableColumn>Aksi</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Sosialisasi Ramah Lingkungan di Sekolah</TableCell>
              <TableCell>Selasa, 23-06-2023</TableCell>
              <TableCell className='line-clamp-6 md:line-clamp-none'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam unde soluta fugiat. Non autem quaerat praesentium libero, nemo expedita ut consequatur? Quam blanditiis animi, impedit modi aliquid eius. Harum, tempora?</TableCell>
              <TableCell>
                <div className='grid md:grid-cols-3 gap-2'>
                  <Image
                    alt="HeroUI hero Image"
                    src="https://heroui.com/images/hero-card-complete.jpeg"
                    className="w-20 h-10 object-cover rounded-sm"
                  />
                  <Image
                    alt="HeroUI hero Image"
                    src="https://heroui.com/images/hero-card-complete.jpeg"
                    className="w-20 h-10 object-cover rounded-sm"
                  />
                  <Image
                    alt="HeroUI hero Image"
                    src="https://heroui.com/images/hero-card-complete.jpeg"
                    className="w-20 h-10 object-cover rounded-sm"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className='flex flex-col gap-2'>
                  <Button color='danger' onPress={showModalDelete}>Hapus</Button>
                  <Button color='success' onPress={showModalEdit}>
                    Edit
                  </Button>

                  {/* modal Edit */}
                  <EditKegiatanAdminComponent
                    isModalOpen={isModalOpen}
                    handleOk={() => setIsModalOpen(false)}
                    handleCancel={() => setIsModalOpen(false)}
                  />

                  {/* modal delete */}
                  <DeleteKegiatanAdminComponent
                    isDeleteModalOpen={isDeleteModalOpen}
                    handleOk={() => setIsDeleteModalOpen(false)}
                    handleCancel={() => setIsDeleteModalOpen(false)}
                  />


                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default KegiatanAdminComponent
