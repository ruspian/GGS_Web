import GaleriModel from "../models/galeriModel.js";
import KegiatanModel from "../models/kegiatanModel.js";

// Controller untuk mengambil foto dari kegiatan dan menyimpannya ke galeri
export const getAllGaleriFromKegiatanController = async (req, res) => {
  try {
    // Ambil semua kegiatan
    const galeriList = await GaleriModel.find({}).sort({ createdAt: -1 });

    // Array untuk menyimpan semua objek gambar yang akan dimasukkan ke GaleriModel
    const imagesToStore = [];

    // Iterasi setiap kegiatan yang ditemukan
    if (galeriList && Array.isArray(galeriList)) {
      kegiatanList.forEach((galeri) => {
        // Pastikan galeri.image ada dan merupakan array sebelum mengiterasinya
        if (galeri.image && Array.isArray(galeri.image)) {
          galeri.image.forEach((fotoUrl, index) => {
            // Tambahkan setiap gambar ke daftar imagesToStore
            imagesToStore.push({
              key: `${galeri._id}-${index}`,
              src: fotoUrl,
              alt: `${galeri.name || "Foto galeri"} - ${index + 1}`,
              activityName: galeri.name || "Nama galeri Tidak Diketahui",
              activityDate: galeri.date,
            });
          });
        }

        return imagesToStore;
      });
    }

    console.log("Images prepared for GaleriModel:", imagesToStore);

    // Membuat dokumen baru di GaleriModel dengan array gambar yang sudah disiapkan
    // const newGaleriEntry = await GaleriModel.create({
    //   image: imagesToStore,
    // });

    // Jika berhasil membuat entri galeri
    return res.status(200).json({
      message: "Data galeri berhasil diambil dari kegiatan dan disimpan!",
      success: true,
      error: false,
      data: galeriList,
    });
  } catch (error) {
    // Menangani error yang terjadi selama proses
    console.error("Error in getAllGaleriFromKegiatanController:", error);
    return res.status(500).json({
      message: error.message || "Kesalahan Pada Server, Coba Lagi Nanti!",
      error: true,
      success: false,
    });
  }
};
