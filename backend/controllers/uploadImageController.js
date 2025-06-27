import uploadImageToCloudinary from "../utils/uploadImageToCloudinary.js";

const uploadImageController = async (req, res) => {
  try {
    const file = req.file; // ambil dari middleware multer

    // Check if file exists
    if (!file) {
      return res.status(400).json({
        message: "Mohon upload gambar!",
        error: true,
        success: false,
      });
    }

    // inisialisasi tipe file yang diizinkan
    const allowedMimeTypes = {
      "image/png": "png",
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
      "image/gif": "gif",
      "image/webp": "webp",
    };

    // cek apakah mimetype file yang diupload diizinkan
    if (!Object.keys(allowedMimeTypes).includes(file.mimetype)) {
      return res.status(400).json({
        message: `Tipe file ${file.mimetype} tidak diizinkan! Hanya gambar (png, jpg, jpeg, gif, webp) yang didukung.`,
        error: true,
        success: false,
      });
    }

    // definisikan ukuran file maksimum yang diizinkan
    const allowedMaxFileSize = 5 * 1024 * 1024; // 5MB example
    if (file.size > allowedMaxFileSize) {
      return res.status(400).json({
        message: `Ukuran file tidak boleh melebihi ${
          allowedMaxFileSize / (1024 * 1024)
        }MB!`,
        error: true,
        success: false,
      });
    }

    // upload gambar ke Cloudinary
    const uploadToCloudinaryResult = await uploadImageToCloudinary(file);

    // cek apakah upload berhasil
    if (!uploadToCloudinaryResult || !uploadToCloudinaryResult.secure_url) {
      return res.status(500).json({
        message: "Gagal upload gambar ke Cloudinary!",
        error: true,
        success: false,
      });
    }

    // jika berhasil, kembalikan URL gambar
    return res.status(200).json({
      message: "File berhasil diupload!",
      error: false,
      success: true,
      data: {
        url: uploadToCloudinaryResult.secure_url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Kesalahan Pada Server, Coba Lagi Nanti!",
      error: true,
      success: false,
    });
  }
};

export default uploadImageController;
