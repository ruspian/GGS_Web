import { Modal } from 'antd'
import React from 'react'
import FetchFromAxios from '../utils/AxiosUtil'
import getAPI from '../common/getAPI'
import { addToast } from '@heroui/react'

const DeleteKegiatanAdminComponent = ({ isDeleteModalOpen, kegiatanToDelete, handleCancel, onDeleteSuccess }) => {

  // handle ok
  const handleOk = async () => {
    const response = await FetchFromAxios({
      ...getAPI.deleteKegiatan,
      data: { _id: kegiatanToDelete._id, }
    })

    // jika gagal
    if (!response.data.success) {
      addToast({ title: response.data.message, variant: 'error' });
      return;
    }

    // jika berhasil
    addToast({ title: response.data.message, variant: 'success' });
    handleCancel(); // tutup modal
    onDeleteSuccess();  // panggil fungsi onDeleteSuccess
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
        <p>Anda yakin ingin menghapus kegiatan ini?</p>
      </Modal>
    </>
  )
}

export default DeleteKegiatanAdminComponent
