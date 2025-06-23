import AboutModel from "../models/aboutModel.js";

// fungsi buat tentang
export const createAboutController = async (req, res) => {
  try {
    const userId = req.userId;
    const { about, visi, misi } = req.body;

    // cek apakah semua data ada
    if (!about || !visi || !misi) {
      return res.status(400).json({
        message: "Mohon isi semua form!",
        error: true,
        success: false,
      });
    }

    // buat about dan simpan
    const newAbout = await AboutModel.create({
      about,
      visi,
      misi,
    });
    const savedAbout = await newAbout.save();

    // jika gagal
    if (!savedAbout) {
      return res.status(500).json({
        message: "Gagal!",
        error: true,
        success: false,
      });
    }

    // jika berhasil
    return res.status(200).json({
      message: "Berhasil!",
      error: false,
      success: true,
      data: savedAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.massage || "Kesalahan Pada Server, Coba Lagi Nanti!",
      error: true,
      success: false,
    });
  }
};
