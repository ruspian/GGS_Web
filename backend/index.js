import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import userRouter from "./routes/userRoute.js";
import databaseConnect from "./config/databaseConnect.js";

// inisialisasi dotenv
dotenv.config();

// inisialisasi express
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
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

// jalankan servet
databaseConnect().then(() => {
  app.listen(process.env.BACKEND_PORT, () => {
    console.log(
      `Server running on http://localhost:${process.env.BACKEND_PORT}`
    );
  });
});
