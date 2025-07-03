import { Router } from "express";
import { getAllGaleriFromKegiatanController } from "../controllers/galeryController.js";

const galeriRouter = Router();

galeriRouter.get("/get-galeri", getAllGaleriFromKegiatanController);

export default galeriRouter;
