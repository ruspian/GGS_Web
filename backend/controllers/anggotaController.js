import AnggotaModel from "../models/anggotaModel.js";
import UserModel from "../models/userModel.js";

// controller tambah anggota
export const createAnggotaController = async (req, res) => {
  try {
    const userId = req.userId; // ambil dari authMiddleware
    const { _id } = req.body;

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
        message: "User tidak ditemukan!",
        success: false,
        error: true,
      });
    }

    // cek apakah user sudah menjadi angota
    const isAnggota = await AnggotaModel.findOne({ user_id: _id });
    if (isAnggota) {
      return res.status(400).json({
        message: "User sudah menjadi anggota!",
        success: false,
        error: true,
      });
    }

    // caari id user di database
    const user = await UserModel.findById({ _id });

    // jika id user ada
    const anggota = await AnggotaModel.create([{ user_id: user._id }]);

    // jika berhasil, kembalikan response
    return res.status(200).json({
      message: "Anggota berhasil ditambahkan!",
      error: false,
      success: true,
      data: anggota,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Kesalahan Pada Server, Coba Lagi Nanti!",
      error: true,
      success: false,
    });
  }
};

// controller ambil semua anggota
export const getAllAnggotaController = async (req, res) => {
  try {
    let { page, limit } = req.body;

    // pastikan tipe dari page dan limit adalah integer
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    // jika page tidak ada atau page = NaN
    if (isNaN(page) || page <= 0) {
      page = 1;
    }

    // jika limit tidak ada
    if (isNaN(limit) || limit <= 0) {
      limit = 6;
    }

    // abaikan data sebelum page
    const skip = (page - 1) * limit;

    // ambil data anggota dan hitung jumlah anggota
    const [data, totalCount] = await Promise.all([
      AnggotaModel.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user_id")
        .select("-password -refresh_token"),

      // hitung jumlah anggota
      AnggotaModel.countDocuments({}),
    ]);

    // jika tidak ada anggota
    if (!data) {
      return res.status(404).json({
        message: "Anggota Kosong!",
        error: true,
        success: false,
      });
    }

    // hitung total halaman
    const totalPage = Math.ceil(totalCount / limit);

    // kembalikan response
    return res.status(200).json({
      message: "Berhasil mengambil semua anggota!",
      error: false,
      success: true,
      totalCount: totalCount,
      totalPage: totalPage,
      currentPage: page,
      limit: limit,
      data: data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message || "Kesalahan Pada Server, Coba Lagi Nanti!",
      error: true,
      success: false,
    });
  }
};

// controller hapus anggota
export const deleteAnggotaController = async (req, res) => {
  try {
    const userId = req.userId; // authMiddleware
    const { _id } = req.body;

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
        message: "Anggota tidak ditemukan!",
        success: false,
        error: true,
      });
    }

    // cari anggota di database
    const deletedAnggota = await AnggotaModel.findByIdAndDelete(_id);

    // jika berhasil, kembalikan response
    return res.status(200).json({
      message: "Anggota berhasil dihapus!",
      error: false,
      success: true,
      data: deletedAnggota,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Kesalahan Pada Server, Coba Lagi Nanti!",
      error: true,
      success: false,
    });
  }
};
