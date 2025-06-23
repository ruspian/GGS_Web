export const adminMiddleware = async (req, res, next) => {
  try {
    const userId = req.userId; // ambil dari authMiddleware

    // cari user di database
    const user = await UserModel.findById(userId);

    // cek apakah user ada
    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan!",
        error: true,
        success: false,
      });
    }

    // cek apakah role user adalah admin atau user
    if (user.role !== "Admin") {
      return res.status(403).json({
        message: "Akses ditolak!",
        error: true,
        success: false,
      });
    }

    // jika role user = admin
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.massage || "Kesalahan Pada Server, Coba Lagi Nanti!",
      error: true,
      success: false,
    });
  }
};
