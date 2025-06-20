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
  // cek apakah file ada
  if (!file || !file.buffer) {
    throw new error("File Kosong!");
  }

  // tentukan resource type dari file ==> image/vidio/audio
  let resourceType = "auto";
  if (file.mimetype.startWith("image/")) {
    resourceType = "image";
  } else if (file.mimetype.startWith("video/")) {
    resourceType = "video";
  } else if (file.mimetype.startWith("audio/")) {
    resourceType = "audio";
  } else if (file.mimetype.startWith("file/")) {
    resourceType = "file";
  }

  // upload file ke cloudinary
  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "ggs",
          recource_type: resourceType,
        },
        (error, result) => {
          // jika error
          if (error) {
            console.log("gagal upload ke cloudinary :", error);
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
