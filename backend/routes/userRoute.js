import { Router } from "express";
import {
  loginUserController,
  refreshTokenController,
  registerUserController,
  getUserLoginDetailsController,
  logoutUserController,
  uploadAvatarController,
  updateUserDetailController,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/refresh-token", refreshTokenController);
userRouter.post("/login", loginUserController);
userRouter.get("/user-detail", authMiddleware, getUserLoginDetailsController);
userRouter.get("/logout", authMiddleware, logoutUserController);
userRouter.post(
  "/update-user-detail",
  authMiddleware,
  updateUserDetailController
);
userRouter.put(
  "/upload-avatar",
  authMiddleware,
  upload.single("image"),
  uploadAvatarController
);

export default userRouter;
