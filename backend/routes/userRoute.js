import { Router } from "express";
import {
  loginUserController,
  refreshTokenController,
  registerUserController,
  getUserLoginDetailsController,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/refresh-token", refreshTokenController);
userRouter.post("/login", loginUserController);
userRouter.get("/user-detail", authMiddleware, getUserLoginDetailsController);

export default userRouter;
