import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    // ambil token dari cookie atau header
    const token = req?.headers?.authorization?.split(" ")[1];

    // pastikan token ada
    if (!token) {
      return res.status(401).json({
        message: "Silahkan login terlebih dahulu!",
        error: true,
        success: false,
      });
    }

    // cek apakah token valid/sesuai atau tidak
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN);

    // set user di request
    req.userId = verifyToken.id;

    // lanjutkan ke controller
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Kesalahan pada server, coba lagi nanti!",
      error: true,
      success: false,
    });
  }
};

export default authMiddleware;
