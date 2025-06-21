import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// fungsi upload gambar ke cloudinary
const uploadImageToCloudinary = async (file) => {
  // cek apakah file ada dan memiliki buffer (dari Multer memoryStorage)
  if (!file || !file.buffer) {
    throw new Error("File atau buffer file kosong!");
  }

  // tentukan resource type dari file ==> image/video/audio/raw
  let resourceType = "auto";
  if (file.mimetype.startsWith("image/")) {
    resourceType = "image";
  } else if (file.mimetype.startsWith("video/")) {
    resourceType = "video";
  } else if (file.mimetype.startsWith("audio/")) {
    resourceType = "audio";
  }

  // upload file ke cloudinary
  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "ggs", // Pastikan folder ini ada di Cloudinary
          resource_type: resourceType,
        },
        (error, result) => {
          // jika error
          if (error) {
            console.error("Gagal upload ke cloudinary:", error);
            return reject(error);
          }

          // jika berhasil
          return resolve(result);
        }
      )
      .end(file.buffer); // buffer dari file multer
  });

  // kembalikan hasil upload
  return uploadResult;
};

export default uploadImageToCloudinary;
