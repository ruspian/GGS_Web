import KegiatanModel from "../models/kegiatanModel.js";

// controller buat Kegiatan
export const createKegiatanController = async (req, res) => {
  try {
    const userId = req.userId; // authMiddleware
    const { name, date, description, image } = req.body;

    // pastikan user ada
    if (!userId) {
      return res.status(401).json({
        message: "Anda belum login, silahkan login terlebih dahulu!",
        success: false,
        error: true,
      });
    }

    // pastikan data lengkap
    if (!name || !date || !description) {
      return res.status(400).json({
        message: "Semua field harus diisi!",
        success: false,
        error: true,
      });
    }

    // buat kegiatan baru dan simpan kegiatan
    const kegiatan = new KegiatanModel({
      name,
      date,
      description,
      image,
    });
    await kegiatan.save();

    // jika gagal simpan, kembalikan error
    if (!kegiatan) {
      return res.status(500).json({
        message: "Gagal membuat kegiatan, silahkan coba lagi!",
        success: false,
        error: true,
      });
    }

    // jika berhasil, kembalikan response
    return res.status(201).json({
      message: "Kegiatan berhasil dibuat!",
      success: true,
      error: false,
      kegiatan,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

// controller untuk mendapatkan semua kegiatan
export const getAllKegiatanController = async (req, res) => {
  try {
    const kategoriData = await KegiatanModel.find({}).sort({ createdAt: -1 });

    // jika tidak ada kegiatan
    if (!kategoriData) {
      return res.status(404).json({
        message: "Kegiatan tidak ditemukan!",
        success: false,
        error: true,
      });
    }

    // jika ada kegiatan, kembalikan response
    return res.status(200).json({
      message: "Kegiatan berhasil ditemukan!",
      success: true,
      error: false,
      data: kategoriData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

// controller edit kegiatan
export const editKegiatanController = async (req, res) => {
  try {
    const userId = req.userId; // authMiddleware
    const { _id, name, date, description, image } = req.body;

    // pastikan user ada
    if (!userId) {
      return res.status(401).json({
        message: "Anda belum login, silahkan login terlebih dahulu!",
        success: false,
        error: true,
      });
    }

    // pastikan data lengkap
    if (!_id || !name || !date || !description) {
      return res.status(400).json({
        message: "Semua field harus diisi!",
        success: false,
        error: true,
      });
    }

    // cari kegiatan di database
    const kegiatan = await KegiatanModel.findByIdAndUpdate(_id, {
      name,
      date,
      description,
      image,
    });

    // jika kegiatan tidak ditemukan
    if (!kegiatan) {
      return res.status(404).json({
        message: "Kegiatan tidak ditemukan!",
        success: false,
        error: true,
      });
    }

    // jika berhasil, kembalikan response
    return res.status(200).json({
      message: "Kegiatan berhasil diedit!",
      success: true,
      error: false,
      kegiatan,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

// controller hapus kegiatan
export const deleteKegiatanController = async (req, res) => {
  try {
    const userId = req.userId; // authMiddleware
    const { _id } = req.body;

    console.log("req.body", req.body);

    // pastikan user ada
    if (!userId) {
      return res.status(401).json({
        message: "Anda belum login, silahkan login terlebih dahulu!",
        success: false,
        error: true,
      });
    }

    // pastikan id juga ada
    if (!_id) {
      return res.status(400).json({
        message: "Kegiatan tidak ditemukan!",
        success: false,
        error: true,
      });
    }

    // cari kegiatan di database
    const deletedKegiatan = await KegiatanModel.findByIdAndDelete(_id);

    // jika berhasil, kembalikan response
    return res.status(200).json({
      message: "Kegiatan berhasil dihapus!",
      success: true,
      error: false,
      data: deletedKegiatan,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};
