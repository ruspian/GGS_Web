import { Router } from "express";
import {
  loginUserController,
  refreshTokenController,
  registerUserController,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/refresh-token", refreshTokenController);
userRouter.post("/login", loginUserController);

export default userRouter;
