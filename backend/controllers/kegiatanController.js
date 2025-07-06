// import GaleriModel from "../models/galeriModel.js";
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

    // const imageGaleri = await GaleriModel.create({
    //   image,
    // });

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
      limit = 10;
    }

    // abaikan data sebelum page
    const skip = (page - 1) * limit;

    const image = await KegiatanModel.find({}).select("image");

    // jumlah total gambar
    const totalImageCount = image.reduce(
      (acc, curr) => acc + curr.image.length,
      0
    );

    // ambil data kegiatan dan hitung jumlah kegiatan
    const [data, totalCount] = await Promise.all([
      // akan dimasukkan ke data
      KegiatanModel.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),

      // akan dimasukkan ke totalCount
      KegiatanModel.countDocuments({}),
    ]);

    // total halaman
    const totalPage = Math.ceil(totalCount / limit);

    // jika tidak ada kegiatan
    if (!data) {
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
      data: data,
      totalCount: totalCount,
      totalPage: totalPage,
      limit: limit,
      currentPage: page,
      totalImageCount: totalImageCount,
      image: image,
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

// controller ambil kegiatan berdasarkan id
export const getKegiatanByIdController = async (req, res) => {
  try {
    const { _id } = req.body;

    // pastikan _id dikirim dari frontend
    if (!_id) {
      return res.status(400).json({
        message: "Kegiatan tidak ditemukan!",
        success: false,
        error: true,
      });
    }

    // cari kegiatan di database
    const kegiatanById = await KegiatanModel.findById(_id);

    // jika berhasil
    return res.status(200).json({
      message: "Kegiatan berhasil ditemukan!",
      success: true,
      error: false,
      data: kegiatanById,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

// controller like dan dislike kegiatan
export const likeDislikeKegiatanController = async (req, res) => {
  try {
    const userId = req.userId;
    const { action, kegiatanId } = req.body; // action => like/dislike

    // Validasi Autentikasi
    if (!userId) {
      return res.status(401).json({
        message: "Anda belum login, silahkan login terlebih dahulu!",
        success: false,
        error: true,
      });
    }

    // Validasi ID Kegiatan
    if (!kegiatanId) {
      return res.status(400).json({
        message: "ID kegiatan diperlukan.",
        success: false,
        error: true,
      });
    }

    // Cari kegiatan berdasarkan ID
    const kegiatan = await KegiatanModel.findById(kegiatanId);

    // Pastikan kegiatan ditemukan
    if (!kegiatan) {
      return res.status(404).json({
        message: "Kegiatan tidak ditemukan!",
        success: false,
        error: true,
      });
    }

    // Inisialisasi array like dan dislike jika belum ada
    if (!kegiatan.like) kegiatan.like = [];
    if (!kegiatan.dislike) kegiatan.dislike = [];

    // Cek apakah user sudah like atau dislike
    const userHasLiked = kegiatan.like.includes(userId);
    const userHasDisliked = kegiatan.dislike.includes(userId);

    // let message = "";

    // Logika Like/Dislike
    if (action === "like") {
      if (userHasLiked) {
        // Jika sudah like, maka batalkan like
        kegiatan.like = kegiatan.like.filter(
          (id) => id.toString() !== userId.toString()
        );
        // message = "Like dibatalkan.";
      } else {
        // Jika belum like, tambahkan like
        kegiatan.like.push(userId);
        // message = "Kegiatan disukai!";

        // Jika sebelumnya dislike, batalkan dislike
        if (userHasDisliked) {
          kegiatan.dislike = kegiatan.dislike.filter(
            (id) => id.toString() !== userId.toString()
          );
        }
      }
    } else if (action === "dislike") {
      if (userHasDisliked) {
        // Jika sudah dislike, maka batalkan dislike (hapus dari array dislike)
        kegiatan.dislike = kegiatan.dislike.filter(
          (id) => id.toString() !== userId.toString()
        );
        // message = "Dislike dibatalkan.";
      } else {
        // Jika belum dislike, tambahkan dislike
        kegiatan.dislike.push(userId);
        // message = "Kegiatan tidak disukai!";

        // Jika sebelumnya like, batalkan like
        if (userHasLiked) {
          kegiatan.like = kegiatan.like.filter(
            (id) => id.toString() !== userId.toString()
          );
        }
      }
    } else {
      return res.status(400).json({
        message: "Aksi tidak valid. Gunakan 'like' atau 'dislike'.",
        success: false,
        error: true,
      });
    }

    // Simpan perubahan ke database
    await kegiatan.save();

    // Kirim respons berhasil
    return res.status(200).json({
      message: "Oke!",
      success: true,
      error: false,
      data: {
        _id: kegiatan._id,
        likeCount: kegiatan.like.length,
        dislikeCount: kegiatan.dislike.length,
        userLiked: kegiatan.like.includes(userId),
        userDisliked: kegiatan.dislike.includes(userId),
      },
    });
  } catch (error) {
    console.error("Error pada likeDislikeKegiatanController:", error);
    return res.status(500).json({
      message: error.message || "Kesalahan Pada Server, Coba Lagi Nanti!",
      error: true,
      success: false,
    });
  }
};
