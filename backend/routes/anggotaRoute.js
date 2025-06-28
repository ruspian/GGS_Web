import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import {
  createAnggotaController,
  deleteAnggotaController,
  getAllAnggotaController,
} from "../controllers/anggotaController.js";

const anggotaRouter = Router();

anggotaRouter.post(
  "/create-anggota",
  authMiddleware,
  adminMiddleware,
  createAnggotaController
);
anggotaRouter.get("/get-all-anggota", getAllAnggotaController);
anggotaRouter.delete(
  "/delete-anggota",
  authMiddleware,
  adminMiddleware,
  deleteAnggotaController
);

export default anggotaRouter;
