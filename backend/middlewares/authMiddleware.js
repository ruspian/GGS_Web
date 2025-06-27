import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    // Ambil token dari cookie atau header
    const token =
      req.cookies?.accessToken || // Cek dari cookie
      (req.headers?.authorization?.startsWith("Bearer ") // Cek dari Authorization header
        ? req.headers.authorization.split(" ")[1]
        : null);

    // Cek token dengan kondisi lebih ketat
    if (!token || typeof token !== "string") {
      return res.status(401).json({
        message:
          "Akses ditolak: Token tidak ditemukan atau format token salah.",
        error: true,
        success: false,
      });
    }

    // Pastikan JWT Secret terdefinisi
    const jwtSecret = process.env.JWT_SECRET_ACCESS_TOKEN;
    if (!jwtSecret) {
      return res.status(500).json({
        message: "Kesalahan server: Kunci rahasia JWT tidak dikonfigurasi.",
        error: true,
        success: false,
      });
    }

    // Verifikasi token
    const verifyToken = jwt.verify(token, jwtSecret);

    //  Cek apakah verifyToken.id ada di payload token
    if (!verifyToken.id) {
      return res.status(401).json({
        message: "Akses ditolak: ID pengguna tidak ditemukan!.",
        error: true,
        success: false,
      });
    }

    //  Set user di request
    req.userId = verifyToken.id;

    // Lanjutkan ke controller
    next();
  } catch (error) {
    let message = "Silakan login kembali.";

    if (error instanceof jwt.TokenExpiredError) {
      message = "Sesi telah berakhir, silakan login kembali.";
    } else if (error instanceof jwt.JsonWebTokenError) {
      message = "Token tidak valid.";
    }

    return res.status(401).json({
      message,
      error: true,
      success: false,
    });
  }
};

export default authMiddleware;
