import { addToast } from '@heroui/react'
import { Modal } from 'antd'
import React from 'react'
import FetchFromAxios from '../utils/AxiosUtil'
import getAPI from '../common/getAPI'

const DeleteAnggotaAdminComponent = ({ isDeleteModalOpen, anggotaToDelete, onDeleteSuccess, handleCancel }) => {

  // fungsi handle ok
  const handleOk = async () => {
    try {
      const response = await FetchFromAxios({
        ...getAPI.deleteAnggota,
        data: { _id: anggotaToDelete._id, }
      })

      // jika berhasil
      if (response.data.success) {
        addToast({ title: response.data.message, variant: 'success' });
        handleCancel(); // tutup modal
        onDeleteSuccess();  // panggil fungsi onDeleteSuccess
      }
    } catch (error) {
      addToast({ title: error.response?.data?.message || "Kesalahan saat menghapus anggota.", variant: 'error' })
    }
  }

  return (
    <>
      <Modal
        title="Edit Profil"
        styles={{
          mask: {
            backdropFilter: 'blur(10px)'
          },
          content: {
            boxShadow: '0 0 30px #999',
          },
        }}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isDeleteModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Delete"
        okType='danger'
        cancelText="Batal"
      >
        <p>Anda yakin ingin menghapus anggota ini?</p>
      </Modal>
    </>
  )
}

export default DeleteAnggotaAdminComponent
