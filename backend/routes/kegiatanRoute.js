import { Router } from "express";
import {
  createKegiatanController,
  deleteKegiatanController,
  editKegiatanController,
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
kegiatanRouter.post("/get-kegiatan", getAllKegiatanController);
kegiatanRouter.put(
  "/edit-kegiatan",
  authMiddleware,
  adminMiddleware,
  editKegiatanController
);
kegiatanRouter.delete(
  "/delete-kegiatan",
  authMiddleware,
  adminMiddleware,
  deleteKegiatanController
);

export default kegiatanRouter;
