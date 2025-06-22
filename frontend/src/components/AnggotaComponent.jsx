import { Button, Card, CardBody, CardHeader, Image } from '@heroui/react'
import React from 'react'

const AnggotaComponent = () => {
  return (
    <div className='h-auto'>
      <div className='flex justify-center items-center'>
        <h1 className='text-3xl font-bold text-emerald-600 '>Anggota</h1>
      </div>
      <div className='flex flex-col items-center justify-center gap-4 px-6 md:mx-20 my-4 py-6 overflow-y-auto'>

        <div className='flex flex-col md:flex-row gap-3'>
          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">Otong Surotong</h4>
              <small className="text-default-500">CEO Grup Laguna</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="https://heroui.com/images/hero-card-complete.jpeg"
                width={270}
              />
            </CardBody>
          </Card>

          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">Otong Surotong</h4>
              <small className="text-default-500">CEO Grup Laguna</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="https://heroui.com/images/hero-card-complete.jpeg"
                width={270}
              />
            </CardBody>
          </Card>

          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">Otong Surotong</h4>
              <small className="text-default-500">CEO Grup Laguna</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="https://heroui.com/images/hero-card-complete.jpeg"
                width={270}
              />
            </CardBody>
          </Card>
        </div>

        <div className='flex flex-col md:flex-row gap-3'>
          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">Otong Surotong</h4>
              <small className="text-default-500">CEO Grup Laguna</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="https://heroui.com/images/hero-card-complete.jpeg"
                width={270}
              />
            </CardBody>
          </Card>

          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">Otong Surotong</h4>
              <small className="text-default-500">CEO Grup Laguna</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="https://heroui.com/images/hero-card-complete.jpeg"
                width={270}
              />
            </CardBody>
          </Card>

          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">Otong Surotong</h4>
              <small className="text-default-500">CEO Grup Laguna</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="https://heroui.com/images/hero-card-complete.jpeg"
                width={270}
              />
            </CardBody>
          </Card>
        </div>


        <Button
          variant='bordered'
          color='success'

        >
          Lihat Anggota Lainnya
        </Button>
      </div>


    </div>
  )
}

export default AnggotaComponent
