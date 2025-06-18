import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const databaseConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(error);
  }
};

export default databaseConnect;
