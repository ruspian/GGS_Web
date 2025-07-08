import React from "react";
import { motion } from "framer-motion";
import { Button, useDisclosure } from "@heroui/react";
import { FiArrowRightCircle } from "react-icons/fi";
import AuthComponent from "../components/AuthComponent";
import PatnershipComponent from "../components/PatnershipComponent";
import AboutComponent from "../components/AboutComponent";
import KegiatanComponent from "../components/KegiatanComponent";
import BackgroundMotionComponent from "../components/BackgroundMotionComponent";
import GaleryComponent from "../components/GaleryComponent";
import AnggotaComponent from "../components/AnggotaComponent";
import ContactComponent from "../components/ContactComponent";
import foto1 from '../../public/1.jpeg';
import foto2 from '../../public/2.jpeg';
import foto6 from '../../public/6.jpeg';
import foto3 from '../../public/3.jpeg';

const BerandaPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();



  return (
    <main className="relative overflow-hidden">

      <BackgroundMotionComponent />
      <section className="bg-gradient-to-br from-[#f6f7fb] to-[#dbe4ff] relative  min-h-screen px-6 md:px-20 py-16 flex flex-col md:flex-row items-center justify-between overflow-hidden">

        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">


          {/* KIRI */}
          <div className="md:w-1/2 text-center md:text-left space-y-2">
            <h1 className="text-5xl md:text-7xl font-[Faculty-Glyphic] font-bold text-emerald-800 leading-tight">
              GORONTALO GREEN SCHOOL
            </h1>
            <p className="text-2xl text-gray-800">
              Tumbuh Bersama Generasi Lestari
            </p>

            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
              <Button
                variant="bordered"
                color="success"
                endContent={<FiArrowRightCircle size="18" />}
                onPress={onOpen}
                className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 "
              >
                Gabung
              </Button>
              <AuthComponent isOpen={isOpen} onOpenChange={onOpenChange} />
            </div>
          </div>

          {/* KANAN */}
          <div className="md:w-1/2 relative w-full h-[400px] flex justify-center items-center mt-10 md:mt-0 animate-float2">
            {/* UI MOCKUP CARD */}
            <motion.div
              className="w-[300px] md:w-[360px] bg-white shadow-2xl rounded-md p-3 absolute top-10 md:top-5 left-10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src={foto1}
                alt="chart"
                className="rounded-lg w-full"
              />
            </motion.div>

            <motion.div
              className="w-[200px] h-[200px] bg-white shadow-2xl rounded-md p-3 absolute top-5 -right-4 md:block hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src={foto3}
                alt="chart"
                className="rounded-lg w-full h-full"
              />
            </motion.div>

            {/* AVATAR */}
            {/* <motion.img
              src={like}
              alt="user"
              className="w-16 h-16 rounded-full shadow-lg absolute top-56 md:top-48 md:right-32 right-60"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            />

            <motion.img
              src={bubleKotak}
              alt="user"
              className="w-28 h-28 absolute top-0 left-56 md:left-16"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            /> */}
            <motion.div
              className="w-[200px] h-[200px] bg-white shadow-2xl rounded-md p-3 absolute -bottom-16 left-0 md:block hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src={foto6}
                alt="chart"
                className="rounded-lg w-full h-full"
              />
            </motion.div>



            {/* <motion.div
              className="bg-white rounded-xl shadow-lg p-3 w-[220px] absolute bottom-16 md:bottom-0 right-0 animate-float1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <img
                src=""
                alt="chart"
                className="rounded-lg w-full"
              />
            </motion.div> */}

            <motion.div
              className="bg-white rounded-xl shadow-lg p-3 w-[220px] md:w-[400px] md:h-[200px] h-36 absolute  md:top-64 top-80 md:-right-10 animate-float1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <img
                src={foto2}
                alt="chart"
                className="object-cover rounded-lg w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Patnership */}
      <section className="">
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
      </section>

      {/* about */}
      <section className="pt-8 pb-8 ">
        <AboutComponent />
      </section>

      <div className="border md:mt-8 md:mx-20 my-4"></div>

      {/* anggota */}
      <section className="pt-8">
        <KegiatanComponent />
      </section>

      {/* galery */}
      <section className="pt-8">
        <GaleryComponent />
      </section>

      {/* anggota */}
      <section className="pt-8">
        <AnggotaComponent />
      </section>

      {/* contact */}
      <section className="pt-8">
        <ContactComponent />
      </section>

    </main>
  );
};

export default BerandaPage;
