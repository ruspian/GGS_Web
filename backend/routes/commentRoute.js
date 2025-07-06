import { Router } from "express";
import {
  createCommentController,
  getCommentByKegiatanController,
} from "../controllers/commentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const commentRouter = Router();

commentRouter.post("/create-comment", authMiddleware, createCommentController);
commentRouter.post("/get-comment", getCommentByKegiatanController);

export default commentRouter;
