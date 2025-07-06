import CommentModel from "../models/commentModel.js";
import KegiatanModel from "../models/kegiatanModel.js";
import UserModel from "../models/userModel.js";

// controller buat Comment
export const createCommentController = async (req, res) => {
  try {
    const userId = req.userId; // ambil dari authMiddleware
    const { comment, kegiatanId, date } = req.body;

    // pastikan user ada
    if (!userId) {
      return res.status(401).json({
        message: "Anda belum login, silahkan login terlebih dahulu!",
        success: false,
        error: true,
      });
    }

    // pastikan komentar juga tidak kosong
    if (!comment) {
      return res.status(400).json({
        message: "Komentar tidak boleh kosong!",
        success: false,
        error: true,
      });
    }

    // buat komentar
    const newComment = await CommentModel.create({
      kegiatanId,
      userId,
      comment,
      date,
    });

    // masukkan komentar ke user
    const commentUser = await UserModel.findByIdAndUpdate(userId, {
      commentId: newComment._id,
    });

    // masukkan id komentar ke kegiatan model
    const commentKegiatan = await KegiatanModel.findByIdAndUpdate(kegiatanId, {
      commentId: newComment._id,
    });

    // kembalikan response
    return res.status(200).json({
      message: "Komentar berhasil dibuat!",
      success: true,
      error: false,
      data: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

// controller ambil data comment
export const getCommentByKegiatanController = async (req, res) => {
  try {
    let { kegiatanId, limit, skip } = req.body;

    skip = parseInt(skip) || 0;
    limit = parseInt(limit) || 3;

    // pastikan kegiatan ada
    if (!kegiatanId) {
      return res.status(400).json({
        message: "Belum ada kegiatan!",
        success: false,
        error: true,
      });
    }

    // ambil comment
    const comment = await CommentModel.find({ kegiatanId })
      .populate("userId")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    // ambil jumlah komentar dari kegiatan
    const commentCount = await CommentModel.countDocuments({ kegiatanId });

    // kembalikan response
    return res.status(200).json({
      message: "Data comment berhasil diambil!",
      success: true,
      error: false,
      data: comment,
      commentCount: commentCount,
      limit: limit,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};
