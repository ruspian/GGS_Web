import { Modal } from 'antd'
import React from 'react'

const DeleteKegiatanAdminComponent = ({ isDeleteModalOpen, handleOk, handleCancel }) => {
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
