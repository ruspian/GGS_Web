import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const generateRefreshToken = async (userId) => {
  // inisialisasi jwt
  const token = await jwt.sign(
    { id: userId },
    process.env.JWT_SECRET_REFRESH_TOKEN,
    {
      expiresIn: "7d",
    }
  );

  // update refresh token user di database
  const updateRefreshToken = await UserModel.updateOne(
    { _id: userId },
    { refresh_token: token }
  );

  return token;
};

export default generateRefreshToken;
