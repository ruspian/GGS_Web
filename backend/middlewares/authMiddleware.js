import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    // ambil token dari cookie atau header
    const token =
      req.cookies?.accessToken ||
      (req.headers?.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    // Cek token dengan kondisi lebih ketat
    if (!token || typeof token !== "string") {
      return res.status(401).json({
        message: "Akses ditolak: Token tidak ditemukan",
        error: true,
        success: false,
      });
    }

    // cek apakah token valid/sesuai atau tidak
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN);

    // cek apakah verifyToken.id ada
    if (!verifyToken.id) {
      return res.status(401).json({
        message: "Akses ditolak: Token tidak valid",
        error: true,
        success: false,
      });
    }

    // set user di request
    req.userId = verifyToken.id;

    // lanjutkan ke controller
    next();
  } catch (error) {
    // inisialissai pesan
    let message = "Silakan login kembali";

    // cek apakah error token expired
    if (error instanceof jwt.TokenExpiredError) {
      message = "Sesi telah berakhir, silakan login kembali";
    } else if (error instanceof jwt.JsonWebTokenError) {
      message = "Token tidak valid";
    }

    // kirim respon
    return res.status(401).json({
      message,
      error: true,
      success: false,
    });
  }
};

export default authMiddleware;
