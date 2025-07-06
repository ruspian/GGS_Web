import { addToast } from '@heroui/react';
import { Button, Form, Input } from 'antd';
import React from 'react';
import FetchFromAxios from '../utils/AxiosUtil';
import getAPI from '../common/getAPI';

const FormKomentarComponent = ({ kegiatanId, onSuccessAddComment }) => {
  // PERBAIKAN: Typo 'from' menjadi 'form'
  const [form] = Form.useForm();

  // PERBAIKAN: Fungsi handler untuk onFinish
  const onFinish = async (values) => {
    // console.log('Form berhasil disubmit dengan nilai:', values);

    const komentar = values.komentar;
    const date = new Date();

    try {
      // kirim request ke backend
      const response = await FetchFromAxios({
        ...getAPI.createComment,
        data: {
          comment: komentar,
          kegiatanId: kegiatanId,
          date: date
        },
      });

      if (response.data.success) {
        addToast({ title: 'Komentar berhasil dibuat!', variant: 'success' });
        form.resetFields();

        if (onSuccessAddComment) {
          onSuccessAddComment(response.data.data);
        }
      } else {
        addToast({ title: response.data.message, variant: 'error' });
      }
    } catch (error) {
      addToast({ title: error.response?.data?.message || "Kesalahan saat membuat komentar.", variant: 'error' });
    }
  };

  // PERBAIKAN: Fungsi handler untuk onFinishFailed (opsional, untuk debugging validasi)
  const onFinishFailed = (errorInfo) => {
    addToast({ title: `Gagal buat komentar: ${errorInfo}`, variant: 'error' });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="komentar"
        label="Komentar"
      >
        <Input.TextArea placeholder="Tulis komentar Anda di sini" autoSize={{ minRows: 3, maxRows: 10 }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Komentar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormKomentarComponent;
