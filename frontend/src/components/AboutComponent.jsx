import React from 'react'
import aboutImage from '../assets/aboutImage.png'
import { Image } from '@heroui/react'

const AboutComponent = () => {
  return (
    <div className='h-auto'>
      <div className='flex flex-col md:flex-row  gap-4 px-6 md:mx-20 my-8  py-6 bg-white border rounded-sm shadow-xl'>

        <div>
          <Image
            alt="HeroUI hero Image"
            src={aboutImage}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        <div>
          <h1 className='text-3xl font-bold text-emerald-600'>Tentang <span className='text-gray-800'>Kami</span></h1>
          <p className='my-4 text-gray-600 text-justify'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, exercitationem ullam! Quae, vel! Cum qui eveniet tempore quo laborum architecto officiis ex possimus sapiente doloremque, expedita exercitationem explicabo perspiciatis nam.
            Distinctio iusto soluta blanditiis rerum? Numquam laboriosam error quis vero atque quam doloribus exercitationem, adipisci ullam temporibus minima consequuntur illo corporis dolore officiis ratione porro impedit quia? Maiores, laudantium esse!
            Nobis molestiae repellat earum doloribus cumque quasi asperiores. Nostrum delectus suscipit doloribus asperiores eius. Nostrum id impedit dicta, nulla iste ducimus quisquam officia unde numquam possimus commodi. Odio, labore aperiam?</p>
        </div>
      </div>
    </div>
  )
}

export default AboutComponent
