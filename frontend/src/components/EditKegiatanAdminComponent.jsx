import { Button, DatePicker, Modal, Upload } from 'antd'
import { Form, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const EditKegiatanAdminComponent = ({ isModalOpen, handleOk, handleCancel }) => {
  const { TextArea } = Input;

  // fungsi upload gambar
  const props = {
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    }
  };

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
        <Form
          // form={form}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item name="name" label="Nama Kegiatan">
            <Input placeholder='Nama' />
          </Form.Item>
          <Form.Item name="date" label="Tanggal">
            <DatePicker className='w-full' onChange={''} needConfirm />
          </Form.Item>
          <Form.Item name="description" label="Deskripsi">
            <TextArea placeholder="Deskripsi" autoSize />
          </Form.Item>
          <Form.Item name="foto" label="Foto">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default EditKegiatanAdminComponent
