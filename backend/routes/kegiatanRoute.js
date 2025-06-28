import { Router } from "express";
import {
  createKegiatanController,
  getAllKegiatanController,
} from "../controllers/kegiatanController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const kegiatanRouter = Router();

kegiatanRouter.post(
  "/create-kegiatan",
  authMiddleware,
  adminMiddleware,
  createKegiatanController
);
kegiatanRouter.get("/get-kegiatan", getAllKegiatanController);

export default kegiatanRouter;
