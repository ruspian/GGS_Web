import { DatePicker, Modal } from 'antd'
import React from 'react'
import { Form, Input } from 'antd';

const EditProfilAdminModalComponent = ({ isModalOpen, handleOk, handleCancel, form, onChange }) => {

  // ambil textarea dari input antd 
  const { TextArea } = Input;


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
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item name="name" label="Nama">
            <Input placeholder='Nama' />
          </Form.Item>
          <Form.Item name="date" label="Tanggal Berdiri">
            <DatePicker className='w-full' onChange={onChange} needConfirm />
          </Form.Item>
          <Form.Item name="visi" label="Visi">
            <TextArea placeholder="Visi" autoSize />
          </Form.Item>
          <Form.Item name="misi" label="Misi">
            <TextArea placeholder="Misi" autoSize />
          </Form.Item>
          <Form.Item name="tentang" label="Tentang">
            <TextArea placeholder="Tentang" autoSize />
          </Form.Item>

        </Form>
      </Modal>
    </>
  )
}

export default EditProfilAdminModalComponent
