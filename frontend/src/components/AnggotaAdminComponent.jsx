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
import EditAnggotaAdminComponent from './EditAnggotaAdminComponent';
import DeleteAnggotaAdminComponent from './DeleteAnggotaAdminComponent';

const AnggotaAdminComponent = () => {
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
        <h1 className='text-3xl font-bold text-emerald-600'>Anggota</h1>
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
            <TableColumn>Nama Anggota</TableColumn>
            <TableColumn>TTL</TableColumn>
            <TableColumn>Alamat</TableColumn>
            <TableColumn>Story</TableColumn>
            <TableColumn>Sosmed</TableColumn>
            <TableColumn>Foto</TableColumn>
            <TableColumn>Aksi</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Otong Surotong</TableCell>
              <TableCell>Selasa, 23-06-2023</TableCell>
              <TableCell>Jl. Raya No. 1 Banuroja</TableCell>
              <TableCell className='line-clamp-6 md:line-clamp-none'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam unde soluta fugiat. Non autem quaerat praesentium libero, nemo expedita ut consequatur? Quam blanditiis animi, impedit modi aliquid eius. Harum, tempora?</TableCell>
              <TableCell>
                <ul>
                  <li>Instagram</li>
                  <li>Twitter</li>
                  <li>Youtube</li>
                </ul>
              </TableCell>
              <TableCell>
                <Image
                  alt="HeroUI hero Image"
                  src="https://heroui.com/images/hero-card-complete.jpeg"
                  className="w-20 h-10 object-cover rounded-sm"
                />
              </TableCell>
              <TableCell>
                <div className='flex flex-col gap-2'>
                  <Button color='danger' onPress={showModalDelete}>Hapus</Button>
                  <Button color='success' onPress={showModalEdit}>
                    Edit
                  </Button>

                  {/* modal Edit */}
                  <EditAnggotaAdminComponent
                    isModalOpen={isModalOpen}
                    handleOk={() => setIsModalOpen(false)}
                    handleCancel={() => setIsModalOpen(false)}
                  />

                  {/* modal delete */}
                  <DeleteAnggotaAdminComponent
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

export default AnggotaAdminComponent
