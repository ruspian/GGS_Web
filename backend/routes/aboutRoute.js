import { Router } from "express";
import {
  createAboutController,
  editAboutController,
  getAboutController,
} from "../controllers/aboutController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const aboutRouter = Router();

aboutRouter.post(
  "/create-about",
  authMiddleware,
  adminMiddleware,
  createAboutController
);
aboutRouter.get("/get-about", getAboutController);
aboutRouter.put(
  "/edit-about",
  authMiddleware,
  adminMiddleware,
  editAboutController
);

export default aboutRouter;
