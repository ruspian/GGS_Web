import { Router } from "express";
import uploadImageController from "../controllers/uploadImageController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const uploadFileRouter = Router();

uploadFileRouter.post(
  "/upload-file",
  authMiddleware,
  upload.single("image"),
  uploadImageController
);

export default uploadFileRouter;
