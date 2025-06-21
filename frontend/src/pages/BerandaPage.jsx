import React from "react";

const BerandaPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-between px-10 bg-white overflow-hidden">
      {/* KIRI: Tulisan */}
      <div className="md:w-1/2 text-center md:text-left space-y-4 mb-10 md:mb-0">
        <h1 className="text-4xl font-bold text-gray-800">Selamat Datang di Pegasus</h1>
        <p className="text-lg text-gray-600">
          Lacak nomor dan identitas dengan cepat dan mudah. Solusi OSINT ringan untuk investigasi digitalmu.
        </p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          Mulai Sekarang
        </button>
      </div>

      {/* KANAN: Gambar-gambar ngambang */}
      <div className="md:w-1/2 flex gap-4 justify-center md:justify-end relative">
        <img
          src="https://via.placeholder.com/120"
          alt="img1"
          className="w-32 rounded-xl shadow-lg animate-float1"
        />
        <img
          src="https://via.placeholder.com/100"
          alt="img2"
          className="w-24 rounded-xl shadow-lg animate-float2"
        />
        <img
          src="https://via.placeholder.com/90"
          alt="img3"
          className="w-20 rounded-xl shadow-lg animate-float3"
        />
      </div>
    </div>
  );
};

export default BerandaPage;
