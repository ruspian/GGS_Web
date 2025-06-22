import React from 'react'
import { motion } from 'framer-motion'
import burungIndonesia from '../assets/burungIndonesia.png'
import salafiyah from '../assets/salafiyah.png'
import madrasah from '../assets/madrasah.png'
import bumn from '../assets/bumn.png'
import unknownLogo from '../assets/unknownLogo.png'

const PatnershipComponent = () => {
  return (
    <div className=' h-32 md:h-20 w-full flex items-center justify-center'>
      <div className='bg-white md:w-[80%] md:p-2 p-4 w-auto md:absolute md:-translate-y-4 rounded-md shadow-md'>
        {/* judul */}
        <p className='text-lg font-bold text-center text-emerald-700'>Patnership</p>
        <hr className='text-emerald-700 w-full mt-3' />

        {/* content */}
        <motion.div
          className='flex items-center sm:my-10 md:my-0 justify-center md:gap-32 gap-4 mt-4'
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={madrasah}
            alt='madrasah'
            className='md:w-14 md:h-14 w-8 h-8 mx-2 grayscale hover:grayscale-0'

          />
          <motion.img
            src={salafiyah}
            alt='salafiyah'
            className='md:w-16 md:h-16 w-10 h-10 mx-2 grayscale hover:grayscale-0'
          />
          <motion.img
            src={burungIndonesia}
            alt='burungIndonesia'
            className='md:w-20 md:h-20 w-12 h-12 mx-2 grayscale hover:grayscale-0'
          />
          <motion.img
            src={bumn}
            alt='burungIndonesia'
            className='md:w-20 md:h-20 w-12 h-12 mx-2 grayscale hover:grayscale-0'
          />
          <motion.img
            src={unknownLogo}
            alt='burungIndonesia'
            className='md:w-20 md:h-20 w-12 h-12 mx-2 grayscale hover:grayscale-0'
          />

        </motion.div>
      </div>
    </div>
  )
}

export default PatnershipComponent
