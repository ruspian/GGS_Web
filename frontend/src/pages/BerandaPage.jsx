import React from "react";
import { motion } from "framer-motion";
import { Button, useDisclosure } from "@heroui/react";
import { FiArrowRightCircle } from "react-icons/fi";
import AuthComponent from "../components/AuthComponent";
import PatnershipComponent from "../components/PatnershipComponent";
import AboutComponent from "../components/AboutComponent";
import AnggotaComponent from "../components/AnggotaComponent";

const BerandaPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  return (
    <main>
      <div className="bg-gradient-to-br from-[#f6f7fb] to-[#dbe4ff] relative  min-h-screen px-6 md:px-20 py-16 flex flex-col md:flex-row items-center justify-between overflow-hidden">

        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="absolute w-72 h-72 bg-green-300 opacity-30 rounded-full mix-blend-multiply blur-3xl z-0 -top-20 -left-20 md:top-10 md:left-10 lg:top-20 lg:left-20"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 w-64 h-64 bg-yellow-200 opacity-30 rounded-full mix-blend-multiply blur-2xl z-0"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-96 h-96 bg-blue-200 opacity-20 rounded-full mix-blend-multiply blur-3xl z-0 bottom-0 right-0 md:bottom-10 md:right-10 lg:bottom-20 lg:right-20"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          {/* LEFT TEXT */}
          <div className="md:w-1/2 text-center md:text-left space-y-4">
            <h1 className="text-5xl md:text-7xl font-[Faculty-Glyphic] font-bold text-emerald-800 leading-tight">
              GORONTALO GREEN SCHOOL
            </h1>
            <p className="text-lg text-gray-600">
              Membangun masa depan berkelanjutan melalui pendidikan yang ramah lingkungan dan berorientasi pada teknologi.
            </p>

            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
              <Button
                variant="bordered"
                color="success"
                endContent={<FiArrowRightCircle size="18" />}
                onPress={onOpen}
              >
                Gabung
              </Button>
              <AuthComponent isOpen={isOpen} onOpenChange={onOpenChange} />
            </div>
          </div>

          {/* RIGHT MOCKUP IMAGE STACK */}
          <div className="md:w-1/2 relative w-full h-[400px] flex justify-center items-center mt-10 md:mt-0 animate-float2">
            {/* UI MOCKUP CARD */}
            <motion.div
              className="w-[300px] md:w-[360px] bg-white shadow-2xl rounded-md p-3 absolute top-10 left-10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1589104760192-ccab0ce0d90f?q=80&w=867&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="chart"
                className="rounded-lg w-full"
              />
            </motion.div>

            {/* AVATAR */}
            <motion.img
              src="https://randomuser.me/api/portraits/women/79.jpg"
              alt="user"
              className="w-14 h-14 rounded-full border-4 border-white shadow-lg absolute top-56 md:top-48 md:right-32 right-60"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            />

            <motion.img
              src="https://randomuser.me/api/portraits/women/73.jpg"
              alt="user"
              className="w-14 h-14 rounded-full border-4 border-white shadow-lg absolute top-0 left-56 md:left-16"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            />

            {/* TESTIMONIAL */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-3 w-[220px] absolute bottom-16 md:bottom-0 right-0 animate-float1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <img
                src="https://images.unsplash.com/photo-1557734864-c78b6dfef1b1?q=80&w=1034&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="chart"
                className="rounded-lg w-full"
              />
            </motion.div>

            <motion.div
              className="bg-white rounded-xl shadow-lg p-3 w-[220px] h-36 absolute top-80 md:top-72 md:bottom-0 lg:left-0 animate-float1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <img
                src="https://images.unsplash.com/photo-1600792170156-7fdc12ed6733?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHNla29sYWglMjBpbmRvJTIwaW5kb25lc2lhfGVufDB8fDB8fHww"
                alt="chart"
                className="rounded-lg w-full h-full"
              />
            </motion.div>
          </div>
        </div>


      </div>

      {/* Patnership */}
      <div >
        <motion.div
          animate={{ rotateX: 10 }}
          transition={{
            type: "spring",
            visualDuration: 0.5,
            bounce: 0.25
          }}
        >
          <PatnershipComponent />
        </motion.div>
      </div>

      {/* about */}
      <div className="pt-8">
        <AboutComponent />
      </div>

      {/* anggota */}
      <div className="pt-8">
        <AnggotaComponent />
      </div>
    </main>
  );
};

export default BerandaPage;
