import GaleriModel from "../models/galeriModel.js";

// controller ambil foto dari kegiatan
export const getAllGaleriFromKegiatanController = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Kesalahan Pada Server, Coba Lagi Nanti!",
      error: true,
      success: false,
    });
  }
};
