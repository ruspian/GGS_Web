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

// --- KONFIGURASI CORS YANG DIPERBARUI ---
const allowedOrigins = [];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

if (process.env.VERCEL_URL) {
  allowedOrigins.push(`https://${process.env.VERCEL_URL}`);
}

// Tambahkan localhost untuk pengembangan
if (process.env.NODE_ENV !== "production") {
  allowedOrigins.push("http://localhost:5173");
}

const corsOptions = {
  origin: (origin, callback) => {
    // Izinkan permintaan tanpa origin
    // atau jika origin ada di daftar yang diizinkan.
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`CORS blocked: Origin ${origin} is not allowed.`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Izinkan metode yang relevan
  allowedHeaders: ["Content-Type", "Authorization"], // Izinkan header yang relevan
  credentials: true, // jika menggunakan cookie/sesi
};

app.use(cors(corsOptions));

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
