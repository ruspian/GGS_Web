import jwt from "jsonwebtoken";

const generateAccessToken = async (userId) => {
  // inisialisasi jwt
  const token = await jwt.sign(
    { id: userId },
    process.env.JWT_SECRET_ACCESS_TOKEN,
    {
      expiresIn: "5h",
    }
  );

  // kembalikan token
  return token;
};

export default generateAccessToken;
