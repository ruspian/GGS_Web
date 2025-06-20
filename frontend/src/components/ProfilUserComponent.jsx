import { Card, CardBody, CardHeader, Image, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'
import { useSelector } from 'react-redux';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedinIn, FaGithub, FaYoutube, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const ProfilUserComponent = () => {
  const userDetail = useSelector((state) => state.user);

  // ubah sosial media jadi array
  const socialMediaArray = Object.entries(userDetail.social_media);

  // inisialisasi icon sesuai dengan social media sesuai data array
  const socialMediaIcon = {
    facebook: { icon: FaFacebook, accountName: null },
    instagram: { icon: FaInstagram, accountName: null },
    twitter: { icon: FaTwitter, accountName: null },
    linkedin: { icon: FaLinkedinIn, accountName: null },
    github: { icon: FaGithub, accountName: null },
    youtube: { icon: FaYoutube, accountName: null },
    tiktok: { icon: FaTiktok, accountName: null },
    whatsapp: { icon: FaWhatsapp, accountName: null },
  };

  return (
    <>
      <div className='flex flex-col gap-4 py-4'>

        {/* detail */}
        <div className='lg:mx-0 mx-2'>
          <Card>
            <CardHeader>
              <h3 className='text-xl font-bold '>Detail</h3>
            </CardHeader>
            <CardBody className="overflow-visible">

              <div className="flex flex-col lg:flex-row overflow-auto gap-4">

                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={`https://app.requestly.io/delay/5000/${userDetail.avatar}`}
                  width={270}
                />

                <Table removeWrapper aria-label="Example static collection table">


                  <TableHeader className='hidden'>
                    <TableColumn className='hidden'></TableColumn>
                    <TableColumn className='hidden'></TableColumn>
                    <TableColumn className='hidden'></TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="nama">
                      <TableCell className='lg:min-w-52 font-bold'>Nama</TableCell>
                      <TableCell className='w-0 font-bold'>:</TableCell>
                      <TableCell className='font-semibold'>{userDetail.name}</TableCell>
                    </TableRow>
                    <TableRow key="email">
                      <TableCell className='font-bold'>Email</TableCell>
                      <TableCell className='font-bold'>:</TableCell>
                      <TableCell className='font-semibold'>{userDetail.email}</TableCell>
                    </TableRow>
                    <TableRow key="mobile">
                      <TableCell className='font-bold'>No. Hp</TableCell>
                      <TableCell className='font-bold'>:</TableCell>
                      <TableCell className='font-semibold'>{userDetail.mobule || "-"}</TableCell>
                    </TableRow>
                    <TableRow key="address">
                      <TableCell className='font-bold'>Alamat</TableCell>
                      <TableCell className='font-bold'>:</TableCell>
                      <TableCell className='font-semibold'>{userDetail.address || "-"}</TableCell>
                    </TableRow>
                    <TableRow key="about">
                      <TableCell className='font-bold grid'>Tentang saya</TableCell>
                      <TableCell className='font-bold'>:</TableCell>
                      <TableCell className='text-justify font-semibold'>{userDetail.aboutme || "-"}</TableCell>
                    </TableRow>

                  </TableBody>
                </Table>
              </div>


            </CardBody>
          </Card>
        </div>

        {/* sosmed */}
        <div className=' lg:mx-0 mx-2'>
          <Card>
            <CardHeader>
              <h3 className='text-xl font-bold '>Sosial Media</h3>
            </CardHeader>
            <CardBody className="overflow-visible">

              {
                socialMediaArray && socialMediaArray.map((sosmed, index) => {

                  // destruktur sosmed
                  const [platform, account] = sosmed;

                  // jika account ada
                  if (account) {

                    // ambil icon dan accountName dari socialMediaIcon
                    const IconSosmed = socialMediaIcon[platform].icon;
                    const accountNameSosmed = socialMediaIcon[platform].accountName;

                    return (
                      <div key={index} className="flex flex-row gap-2 items-center">
                        <IconSosmed />
                        <span className='font-semibold'>{accountNameSosmed || account}</span>
                      </div>
                    )
                  }

                  // jika account null
                  return null

                })

              }



            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export default ProfilUserComponent
