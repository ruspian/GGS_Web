import { addToast, Button, Card, CardBody, CardFooter, CardHeader, Image, Tooltip } from '@heroui/react'
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'
import FetchFromAxios from '../utils/AxiosUtil'
import getAPI from '../common/getAPI'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const LeaderUserComponent = ({ cardVariants }) => {

  const [leadersData, setLeadersData] = useState([])

  // fungsi ambil data leader
  const leaders = useCallback(async () => {
    try {
      const response = await FetchFromAxios({
        ...getAPI.getLeader
      })

      if (response.data.success) {
        setLeadersData(response.data.data)
      }
    } catch (error) {
      addToast({ title: error.response?.data?.message || "Kesalahan saat mengambil data pendiri.", variant: 'error' })
    }
  }, [])

  useEffect(() => {
    leaders()
  }, [leaders])

  // const urlName = (name) => {
  //   return name
  //     .toLowerCase()
  //     .replace(/\s+/g, '-')    // Ganti satu atau lebih spasi dengan satu tanda hubung
  //     .replace(/[^a-z0-9-]/g, '') // Hapus karakter yang bukan huruf, angka, atau tanda hubung
  // }

  return (
    <div className='flex flex-col items-center justify-center gap-6'>
      <div>
        <h2>
          <span className='text-2xl font-bold text-gray-600'>Dewan Pendiri</span>
        </h2>
      </div>

      <div className='flex flex-col md:flex-row items-center justify-center gap-6'>

        {

          // card anggota
          leadersData && leadersData.map((leader, index) => (
            <motion.div
              key={index + leader?._id}
              variants={cardVariants}
              className="py-2 max-w-xs max-h-xs "
            >
              <Card>
                <CardHeader className="flex items-start w-full h-8 justify-between">
                  {/* <div>
                    <h4 className="font-bold text-md">{leader?.name}</h4>
                    <small className='text-gray-500 line-clamp-1'>{leader?.email}</small>
                  </div> */}
                  <Button variant='bordered' size='sm' color='success'>
                    <Link to={`/anggota/${leader?._id}`}>Profil</Link>
                  </Button>
                </CardHeader>
                <CardBody className="max-w-64 h-72 overflow-hidden my-2">
                  <Image
                    src={leader?.avatar}
                    alt={`Foto ${leader?.name}`}
                    className="object-cover w-full h-full rounded-md bg-gray-400"
                  />
                </CardBody>
                <CardFooter className='flex flex-col gap-4 max-w-64 items-start justify-start '>
                  <div>
                    <h4 className="font-bold text-md">{leader?.name}</h4>
                    <small className='text-gray-500 line-clamp-1'>Founder & Chief Executive Officer</small>
                  </div>

                  <div className='text-sm -mt-2'>
                    <small className='line-clamp-4'>{leader?.aboutme}</small>
                  </div>
                  {/* <Tooltip title={leader?.social_media?.facebook || 'Belum ada'} placement='bottom'>
                    <FaFacebook size={20} className='hover:text-emerald-600 cursor-pointer' />
                  </Tooltip>

                  <Tooltip title={leader?.social_media?.whatsapp || 'Belum ada'} placement='bottom'>
                    <FaWhatsapp size={20} className='hover:text-emerald-600 cursor-pointer' />
                  </Tooltip>

                  <Tooltip title={leader?.social_media?.instagram || 'Belum ada'} placement='bottom'>
                    <FaInstagram size={20} className='hover:text-emerald-600 cursor-pointer' />
                  </Tooltip>

                  <Tooltip title={leader?.social_media?.twitter || 'Belum ada'} placement='bottom'>
                    <FaTwitter size={20} className='hover:text-emerald-600 cursor-pointer' />
                  </Tooltip>

                  <Tooltip title={leader?.social_media?.tiktok || 'Belum ada'} placement='bottom'>
                    <FaTiktok size={20} className='hover:text-emerald-600 cursor-pointer' />
                  </Tooltip> */}

                </CardFooter>
              </Card>
            </motion.div>

          ))
        }
      </div>
    </div>
  )
}

export default LeaderUserComponent
