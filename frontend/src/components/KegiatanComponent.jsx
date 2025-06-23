import { Button, Card, CardBody, CardFooter, Image } from '@heroui/react';
import { Link } from 'react-router-dom';


const KegiatanComponent = () => {
  return (
    <div className='h-auto'>

      <div className='flex justify-center items-center'>
        <h1 className='text-3xl font-bold text-emerald-600 '>Kegiatan</h1>
      </div>
      <div className='flex flex-col items-center justify-center gap-4 px-6 md:mx-20 my-4 py-6'>

        <div className='flex flex-col md:flex-row gap-3'>
          <Card className="py-4 max-w-80 max-h-96 text-justify">

            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl w-full "
                src="https://heroui.com/images/hero-card-complete.jpeg"

              />
            </CardBody>
            <CardFooter className="pb-0 pt-2 px-4 flex-col items-start h-full">
              <h4 className="font-bold text-large">Lorem Ipsum</h4>
              <small className="text-default-500 line-clamp-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit ipsam doloremque fuga delectus minus assumenda accusantium non amet voluptates perspiciatis accusamus possimus eos necessitatibus id odio natus porro, placeat laboriosam?</small>
            </CardFooter>

            <Link
              to='#'
              className='pt-2 px-4 text-md text-emerald-600 hover:text-emerald-800'
            >
              <small>Lihat Selengkapnya</small>
            </Link>
          </Card>

          <Card className="py-4 max-w-80 max-h-96 text-justify">

            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl w-full "
                src="https://heroui.com/images/hero-card-complete.jpeg"

              />
            </CardBody>
            <CardFooter className="pb-0 pt-2 px-4 flex-col items-start h-full">
              <h4 className="font-bold text-large">Lorem Ipsum</h4>
              <small className="text-default-500 line-clamp-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit ipsam doloremque fuga delectus minus assumenda accusantium non amet voluptates perspiciatis accusamus possimus eos necessitatibus id odio natus porro, placeat laboriosam?</small>
            </CardFooter>

            <Link
              to='#'
              className='pt-2 px-4 text-md text-emerald-600 hover:text-emerald-800'
            >
              <small>Lihat Selengkapnya</small>
            </Link>
          </Card>

          <Card className="py-4 max-w-80 max-h-96 text-justify">

            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl w-full "
                src="https://heroui.com/images/hero-card-complete.jpeg"

              />
            </CardBody>
            <CardFooter className="pb-0 pt-2 px-4 flex-col items-start h-full">
              <h4 className="font-bold text-large">Lorem Ipsum</h4>
              <small className="text-default-500 line-clamp-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit ipsam doloremque fuga delectus minus assumenda accusantium non amet voluptates perspiciatis accusamus possimus eos necessitatibus id odio natus porro, placeat laboriosam?</small>
            </CardFooter>

            <Link
              to='#'
              className='pt-2 px-4 text-md text-emerald-600 hover:text-emerald-800'
            >
              <small>Lihat Selengkapnya</small>
            </Link>
          </Card>
        </div>


        <div className='mt-4'>
          <Button
            variant='bordered'
            color='success'
          >
            <Link to='/kegiatan'>
              Lihat Lainnya
            </Link>
          </Button>
        </div>

      </div>


    </div>
  )
}

export default KegiatanComponent
