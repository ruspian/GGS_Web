import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import userRouter from "./routes/userRoute.js";
import databaseConnect from "./config/databaseConnect.js";
import aboutRouter from "./routes/aboutRoute.js";
import uploadFileRouter from "./routes/uploadFileRoute.js";

// inisialisasi dotenv
dotenv.config();

// inisialisasi express
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// routes
app.use("/api/user", userRouter);
app.use("/api/file", uploadFileRouter);
app.use("/api/about", aboutRouter);

// --- GLOBAL ERROR HANDLING MIDDLEWARE ---
app.use((err, req, res, next) => {
  console.error("----------------------------------------------------");
  console.error("KESALAHAN SERVER TERTANGKAP OLEH GLOBAL HANDLER:");
  console.error(err.stack); // cetak stack trace lengkap dari error
  console.error("----------------------------------------------------");

  res.status(err.statusCode || 500).json({
    message: err.message || "Kesalahan Pada Server, Coba Lagi Nanti!",
    error: true,
    success: false,
  });
});

// jalankan servet
databaseConnect()
  .then(() => {
    app.listen(process.env.BACKEND_PORT, () => {
      console.log(
        `Server running on http://localhost:${process.env.BACKEND_PORT}`
      );
    });
  })
  .catch((err) => {
    console.error("Koneksi Database Gagal Fatal:", err);
  });
