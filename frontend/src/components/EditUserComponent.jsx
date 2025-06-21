import { addToast, Button, Card, CardBody, CardHeader, Form, Image, Input, Spinner, Textarea } from '@heroui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import FetchFromAxios from '../utils/AxiosUtil';
import getAPI from '../common/getAPI';
import { updatedAvatarUser, updatedDetailUser } from '../store/userSliceRedux';
import { useNavigate } from 'react-router-dom';

const EditUserComponent = () => {
  const [inputData, setInputData] = useState({});
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const userDetail = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // gunakan useEffect untuk mengisi nilai awal form inputan dari userDetail
  useEffect(() => {
    // cek apakah userDetail ada
    if (userDetail) {
      setInputData({
        name: userDetail.name || '',
        email: userDetail.email || '',
        password: '',
        mobile: userDetail.mobile || '',
        aboutme: userDetail.aboutme || '',
        facebook: userDetail.social_media.facebook || '',
        instagram: userDetail.social_media.instagram || '',
        twitter: userDetail.social_media.twitter || '',
        linkedin: userDetail.social_media.linkedin || '',
        github: userDetail.social_media.github || '',
        youtube: userDetail.social_media.youtube || '',
        tiktok: userDetail.social_media.tiktok || '',
        whatsapp: userDetail.social_media.whatsapp || '',
      });
      setImagePreviewUrl(userDetail.avatar);
    }
  }, [userDetail]); // efek ini akan dijalankan ketika userDetail berubah


  // fungsi handle perubahan input file/gambar
  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];

    try {

      setLoadingImage(true);
      // masukkan file ke dalam form data
      const formData = new FormData();
      formData.append("image", file);

      // kirim request ke backend
      const response = await FetchFromAxios({
        ...getAPI.uploadAvatarUpdate,
        data: formData,
        userId: userDetail._id,
      })

      // jika gagal
      if (response.data.error) {
        addToast({ title: response.data.message });
      }

      // jika berhasil
      if (response.data.success) {
        addToast({ title: response.data.message });
        // tampilkan gambar
        setImagePreviewUrl(response.data.data.avatar);

        // simpan gambar ke redux
        dispatch(updatedAvatarUser(response.data.data.avatar));
      }
    } catch (error) {
      addToast(error.response.data.message);
    } finally {
      setLoadingImage(false);
    }

  }

  // fungsi handle perubahan input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();


    try {
      setLoadingSubmit(true);
      const response = await FetchFromAxios({
        ...getAPI.updateUserDetail,
        data: { ...inputData },
        userId: userDetail._id
      });

      console.log("response", response);

      // jika gagal
      if (response.data.error) {
        addToast(response.data.message);
      }


      // jika berhasil
      if (response.data.success) {
        addToast({ title: response.data.message });
        dispatch(updatedDetailUser(response.data.data));
        navigate(`/dashboard/profil/${userDetail._id}`);

      }
    } catch (error) {
      addToast({ title: error.response.data.message });
    } finally {
      setLoadingSubmit(false);
    }


  };

  return (
    <div className='flex flex-col gap-4 py-4'>
      <div className='lg:mx-0 mx-2'>
        <Card>
          <CardHeader>
            <h3 className='text-xl font-bold '>Edit Profil</h3>
          </CardHeader>
          <CardBody className="overflow-visible">

            <div className="w-full flex flex-col lg:flex-row overflow-auto gap-4">
              <Form
                className="w-full flex flex-col lg:flex-row gap-4"
                onSubmit={onSubmit}
              >
                <div className='flex flex-col gap-3 lg:w-1/2'>
                  {/* tampilan gambar */}
                  {
                    loadingImage ? (
                      <Spinner className='flex items-start my-14 mx-14' size="sm" variant="spinner" />
                    ) : (
                      <Image
                        src={imagePreviewUrl}
                        alt="profil"
                        width={100}
                        height={100}
                        radius='sm'


                      />
                    )
                  }



                  {/* gambar */}
                  <Input
                    label="Profil"
                    labelPlacement="outside"
                    name="avatar"
                    variant='bordered'
                    placeholder="Profil anda!"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <Input
                    label="Nama"
                    labelPlacement="outside"
                    name="name"
                    variant='bordered'
                    placeholder="Nama anda!"
                    value={inputData.name}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Email"
                    labelPlacement="outside"
                    name="email"
                    variant='bordered'
                    placeholder="Email anda!"
                    value={inputData.email}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Password"
                    labelPlacement="outside"
                    name="password"
                    variant='bordered'
                    placeholder="Password anda!"
                    type='password'
                    value={inputData.password}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="No. Hp"
                    labelPlacement="outside"
                    name="mobile"
                    variant='bordered'
                    placeholder="No. Hp anda!"
                    value={inputData.mobile}
                    onChange={handleInputChange}
                  />
                  <Textarea
                    label="Tentang Saya"
                    labelPlacement="outside"
                    placeholder="Tuliskan tentang diri anda!"
                    variant="bordered"
                    name='aboutme'
                    value={inputData.aboutme}
                    onChange={handleInputChange}
                  />
                </div>

                <div className='w-full flex flex-col gap-3 lg:w-1/2'>

                  <Input
                    label="Facebook"
                    labelPlacement="outside"
                    name="facebook"
                    variant='bordered'
                    placeholder="Akun facebook anda!"
                    value={inputData.facebook}
                    onChange={handleInputChange}
                    startContent={
                      <FaFacebook className='mx-2' size={20} />
                    }
                  />
                  <Input
                    label="Instagram"
                    labelPlacement="outside"
                    name="instagram"
                    variant='bordered'
                    placeholder="Akun instagram anda!"
                    value={inputData.instagram}
                    onChange={handleInputChange}
                    startContent={
                      <FaInstagram className='mx-2' size={20} />
                    }
                  />
                  <Input
                    label="Whatsapp"
                    labelPlacement="outside"
                    name="whatsapp"
                    variant='bordered'
                    placeholder="Akun whatsapp anda!"
                    value={inputData.whatsapp}
                    onChange={handleInputChange}
                    startContent={
                      <FaWhatsapp className='mx-2' size={20} />
                    }
                  />
                  <Input
                    label="Youtube"
                    labelPlacement="outside"
                    name="youtube"
                    variant='bordered'
                    placeholder="Akun youtube anda!"
                    value={inputData.youtube}
                    onChange={handleInputChange}
                    startContent={
                      <FaYoutube className='mx-2' size={20} />
                    }
                  />
                  <Input
                    label="LinkedIn"
                    labelPlacement="outside"
                    name="linkedin"
                    variant='bordered'
                    placeholder="Akun linkedin anda!"
                    value={inputData.linkedin}
                    onChange={handleInputChange}
                    startContent={
                      <FaLinkedin className='mx-2' size={20} />
                    }
                  />
                  <Input
                    label="Tiktok"
                    labelPlacement="outside"
                    name="tiktok"
                    variant='bordered'
                    placeholder="Akun tiktok anda!"
                    value={inputData.tiktok}
                    onChange={handleInputChange}
                    startContent={
                      <FaTiktok className='mx-2' size={20} />
                    }
                  />
                  <Input
                    label="Github"
                    labelPlacement="outside"
                    name="github"
                    variant='bordered'
                    placeholder="Akun github anda!"
                    value={inputData.github}
                    onChange={handleInputChange}
                    startContent={
                      <FaGithub className='mx-2' size={20} />
                    }
                  />
                  <Input
                    label="Twitter"
                    labelPlacement="outside"
                    name="twitter"
                    variant='bordered'
                    placeholder="Akun twitter anda!"
                    value={inputData.twitter}
                    onChange={handleInputChange}
                    startContent={
                      <FaTwitter className='mx-2' size={20} />
                    }
                  />
                  <Button type="submit" variant="bordered" color="success">
                    {
                      loadingSubmit ? (
                        <Spinner className='flex justify-center' size='md' variant='dots' />
                      ) : (
                        "Simpan Perubahan"
                      )
                    }
                  </Button>
                </div>
              </Form>

            </div>
          </CardBody>
        </Card>
      </div>

    </div>
  )
}

export default EditUserComponent
