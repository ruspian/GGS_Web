import { Card, CardBody, CardHeader, Image } from '@heroui/react'
import React from 'react'
import { useSelector } from 'react-redux';

const ProfilUserComponent = () => {
  const userDetail = useSelector((state) => state.user);
  return (
    <div className='flex flex-col lg:flex-row gap-4 py-4'>
      <div className='w-2/3 lg:w-1/4 mx-2 lg:mx-0'>
        <Card>
          <CardHeader>
            <h3 className='text-xl font-bold'>Profil</h3>
          </CardHeader>
          <CardBody className="overflow-visible">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={`https://app.requestly.io/delay/5000/${userDetail.avatar}`}
              width={270}
            />
          </CardBody>
        </Card>
      </div>

      <div className='lg:w-5/6 lg:mx-0 mx-2'>
        <Card>
          <CardHeader>
            <h3 className='text-xl font-bold'>Detail</h3>
          </CardHeader>
          <CardBody className="overflow-visible">
            <div>
              <p className='text-lg'>Nama: </p>
              <span>{userDetail.name}</span>
            </div>
            <p className='text-sm'>Email: {userDetail.email}</p>
            <p className='text-sm'>No Telepon: {userDetail.phone}</p>
            <p className='text-sm'>Alamat: {userDetail.address}</p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default ProfilUserComponent
