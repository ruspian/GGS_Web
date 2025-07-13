import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const ErrorPage = () => {

  useEffect(() => {
    // ambil elemen overlay
    const overlay = document.getElementById("overlay");

    // event listener untuk pergerakan mouse
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const pos = `${x}px ${y}px`;
      if (overlay) {
        overlay.style.maskImage = `radial-gradient(circle 120px at ${pos}, transparent 0%, black 150px)`;
        overlay.style.webkitMaskImage = overlay.style.maskImage;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // cleanup saat komponen unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-gray-900 text-white overflow-hidden">

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-6xl font-bold mb-4">Halaman Tidak Ditemukan</h1>
        <p className="text-xl">
          Maaf, kami tidak dapat menemukan halaman yang Anda cari.
        </p>
        <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded">Kembali ke beranda</Link>
      </div>


      {/* overlay */}
      <div id="overlay" className="absolute inset-0 bg-black z-20 pointer-events-none">
      </div>
    </div>
  )
}

export default ErrorPage
