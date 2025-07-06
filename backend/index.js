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
import kegiatanRouter from "./routes/kegiatanRoute.js";
import anggotaRouter from "./routes/anggotaRoute.js";
import galeriRouter from "./routes/galeriRoute.js";
import commentRouter from "./routes/commentRoute.js";

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
app.use("/api/kegiatan", kegiatanRouter);
app.use("/api/anggota", anggotaRouter);
app.use("/api/galeri", galeriRouter);
app.use("/api/comment", commentRouter);

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

// export default app;
