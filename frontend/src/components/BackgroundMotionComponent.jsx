import React from 'react'
import { motion } from 'motion/react'
import bubleKotak from '../assets/bubleKotak.png';


const BackgroundMotionComponent = () => {
  return (
    <>
      {/* --- Animated Background Ornaments --- */}
      <motion.img
        src={bubleKotak}
        alt="Animated bubble decoration"
        className='absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 z-0 opacity-20 mix-blend-multiply blur-lg'
        animate={{ x: [0, 20, 0], y: [0, -20, 0], rotate: [0, 360, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={bubleKotak}
        alt="Animated square bubble decoration"
        className='absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 z-0 opacity-20 mix-blend-multiply blur-lg'
        animate={{ x: [0, -20, 0], y: [0, 20, 0], rotate: [0, -360, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* --- END Animated Background Ornaments --- */}
      <motion.div
        className="absolute w-72 h-72 bg-emerald-400 opacity-30 rounded-full mix-blend-multiply blur-3xl z-10 -top-20 -left-20 md:top-10 md:left-10 lg:top-20 lg:left-20"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-yellow-200 opacity-30 rounded-full mix-blend-multiply blur-2xl z-0"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-green-400 opacity-20 rounded-full mix-blend-multiply blur-3xl z-0 bottom-0 right-0 md:bottom-10 md:right-10 lg:bottom-20 lg:right-20"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </>
  )
}

export default BackgroundMotionComponent
