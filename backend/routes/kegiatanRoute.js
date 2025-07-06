import { Router } from "express";
import {
  createKegiatanController,
  deleteKegiatanController,
  editKegiatanController,
  getAllKegiatanController,
  getKegiatanByIdController,
  likeDislikeKegiatanController,
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
kegiatanRouter.post("/get-kegiatan-by-id", getKegiatanByIdController);
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
kegiatanRouter.post(
  "/action-like-dislike-kegiatan",
  authMiddleware,
  likeDislikeKegiatanController
);

export default kegiatanRouter;
