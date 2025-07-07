import { Card, CardBody, CardHeader, Image, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'
import { useSelector } from 'react-redux';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedinIn, FaGithub, FaYoutube, FaTiktok, FaWhatsapp, FaPhone, FaNetworkWired } from 'react-icons/fa';
import { FiClipboard } from 'react-icons/fi';
import { Tooltip } from 'antd';

const ProfilUserComponent = () => {
  const userDetail = useSelector((state) => state.user);
  console.log("user detail from profil user component", userDetail);


  // // ubah object social media menjadi array
  // const socialMediaArray = userDetail.social_media ? Object.entries(userDetail.social_media) : [];


  // // inisialisasi icon sesuai dengan social media sesuai data array
  // const socialMediaIcon = {
  //   facebook: { icon: FaFacebook, accountName: null },
  //   instagram: { icon: FaInstagram, accountName: null },
  //   twitter: { icon: FaTwitter, accountName: null },
  //   linkedin: { icon: FaLinkedinIn, accountName: null },
  //   github: { icon: FaGithub, accountName: null },
  //   youtube: { icon: FaYoutube, accountName: null },
  //   tiktok: { icon: FaTiktok, accountName: null },
  //   whatsapp: { icon: FaWhatsapp, accountName: null },
  // };


  // console.log("social media array", socialMediaArray);


  return (

    <>
      <div className="w-full max-w-4xl flex items-center h-auto md:h-screen flex-wrap mx-auto mt-32 mb-10 md:-mt-8">

        {/* <!--Main Col--> */}
        <div
          id="profile"
          className="w-full md:w-3/5 rounded-lg md:rounded-l-lg md:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 md:mx-0"
        >
          <div className="p-4 md:p-12 text-center md:text-left">
            {/* <!-- gambar di tampilan hp--> */}

            <div
              className="block md:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${userDetail.avatar})` }}
            ></div>

            <h1 className="text-3xl font-bold pt-8 md:pt-0">{userDetail.name}</h1>
            <div className="mx-auto md:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-center md:justify-start gap-4">
              <FaNetworkWired size={16} className="fill-current text-green-700" />
              Founder & Chief Executive Officer
            </p>

            <p className="pt-2 text-gray-600 text-xs md:text-sm flex items-center justify-center md:justify-start gap-4">
              <svg className="h-4 fill-current text-green-700" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20">
                <path
                  d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
              </svg>
              <span>{userDetail.job}</span>
            </p>

            <p className="pt-2 text-gray-600 text-xs md:text-sm flex items-center justify-center md:justify-start">
              <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20">
                <path
                  d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
              </svg> {userDetail.email}
            </p>


            <p className="pt-2 text-gray-600 text-xs md:text-sm flex items-center justify-center md:justify-start gap-4">
              <FaPhone size={16} className="fill-current text-green-700" />
              <span>0{userDetail.mobile}</span>
            </p>


          </div>

          {/* social media */}
          <div className="flex flex-row gap-8 items-center justify-center md:justify-start md:ml-12 my-4">

            <Tooltip title={userDetail.social_media?.facebook || 'Belum ada'} placement='bottom'>
              <FaFacebook size={20} className='hover:text-emerald-600 cursor-pointer' />
            </Tooltip>

            <Tooltip title={userDetail.social_media?.whatsapp || 'Belum ada'} placement='bottom'>
              <FaWhatsapp size={20} className='hover:text-emerald-600 cursor-pointer' />
            </Tooltip>

            <Tooltip title={userDetail.social_media?.instagram || 'Belum ada'} placement='bottom'>
              <FaInstagram size={20} className='hover:text-emerald-600 cursor-pointer' />
            </Tooltip>

            <Tooltip title={userDetail.social_media?.twitter || 'Belum ada'} placement='bottom'>
              <FaTwitter size={20} className='hover:text-emerald-600 cursor-pointer' />
            </Tooltip>

            <Tooltip title={userDetail.social_media?.tiktok || 'Belum ada'} placement='bottom'>
              <FaTiktok size={20} className='hover:text-emerald-600 cursor-pointer' />
            </Tooltip>

          </div>

        </div>

        {/* <!--Img Col--> */}
        <div className="w-full md:w-2/5 bg-gray-400 rounded-md">
          <Image src={userDetail.avatar} className="rounded-none md:rounded-lg shadow-2xl hidden lg:block" />
        </div>
      </div>

      {/* tentang */}
      <div className='md:rounded-r-lg md:rounded-l-none mb-4 md:-mt-20 mx-auto opacity-75 p-6'>
        <div className='text-center justify-center'>
          <div>
            <h3 className='text-md font-bold '>Tentang</h3>
          </div>
          <p className="pt-2 text-gray-600 text-xs md:text-sm flex items-center justify-center md:justify-start gap-4">
            {userDetail.aboutme}
          </p>
          <div className="overflow-visible">
          </div>
        </div>
      </div>




    </>


  )
}

export default ProfilUserComponent
