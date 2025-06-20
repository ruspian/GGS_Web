import uploadImageToCloudinary from "../utils/uploadImageToCloudinary.js";

const uploadImageController = async (req, res) => {
  try {
    const file = req.file; // ambil file dari multer

    // cek apakah file ada
    if (!file) {
      return res.status(400).json({
        message: "Mohon upload gambar!",
        error: true,
        success: false,
      });
    }

    // tentukan mimetype dari file
    const allowedMimeType = {
      "image/png": "png", // image
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
      "image/gif": "gif",
      "image/webp": "webp",
      "audio/mpeg": "mp3", // audio
      "audio/wav": "wav",
      "audio/ogg": "ogg",
      "video/mp4": "mp4", // video
      "video/ogg": "ogg",
      "video/webm": "webm",
      "file/pdf": "pdf", // file
      "file/docx": "docx",
      "file/doc": "doc",
      "file/xls": "xls",
      "file/xlsx": "xlsx",
      "file/ppt": "ppt",
      "file/pptx": "pptx",
      "file/zip": "zip",
      "file/txt": "txt",
      "file/rtf": "rtf",
      "file/csv": "csv",
    };

    // cek apakah mimetype sesuai
    if (!allowedMimeType.includes(file.mimetype)) {
      return res.status(400).json({
        message: `Tipe file ${file.mimetype} tidak diizinkan!`,
        error: true,
        success: false,
      });
    }

    // tentukan ukuran file yang di upload
    const allowedMaxFileSize = 20 * 1024 * 1024; // 20MB
    // jika ukuran file melebihi
    if (file.size > allowedMaxFileSize) {
      return res.status(400).json({
        message: `Ukuran file tidak boleh melebihi 20MB!`,
        error: true,
        success: false,
      });
    }

    // upload gambar ke cloudinary
    const uploadToCloudinaryResult = await uploadImageToCloudinary(file);

    //  penanganan hasil upload ke cloudinary
    if (!uploadToCloudinaryResult || !uploadToCloudinaryResult.secure_url) {
      return res.status(500).json({
        message: "Gagal upload gambar ke cloudinary!",
        error: true,
        success: false,
      });
    }

    // jika berhasil
    return res.status(200).json({
      message: "File berhasil diupload!",
      error: false,
      success: true,
      data: {
        // url gambar ==> kembalikan hanya url saja ke frontend
        secure_url: uploadToCloudinaryResult.secure_url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.massage || "Kesalahan Pada Server, Coba Lagi Nanti!",
      error: true,
      success: false,
    });
  }
};

export default uploadImageController;
