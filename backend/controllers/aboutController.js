import AboutModel from "../models/aboutModel.js";

// Controller untuk membuat data Tentang
export const createAboutController = async (req, res) => {
  console.log("createAboutController: Dimulai"); // Log 1

  try {
    console.log("createAboutController: Masuk blok try"); // Log 2
    console.log("createAboutController: req.body =", req.body); // Log 3

    const userId = req.userId;
    const { about, visi, misi, name, tanggal } = req.body;

    console.log("createAboutController: Variabel setelah destructuring =", {
      userId,
      about,
      visi,
      misi,
      name,
      tanggal,
    }); // Log 4

    if (!userId) {
      console.log("createAboutController: Validasi userId gagal"); // Log 5
      return res.status(401).json({
        message: "Silahkan login terlebih dahulu!",
        error: true,
        success: false,
      });
    }
    console.log("createAboutController: Validasi userId lolos"); // Log 6

    if (!about || !visi || !misi || !name || !tanggal) {
      console.log("createAboutController: Validasi field kosong gagal"); // Log 7
      return res.status(400).json({
        message: "Mohon isi semua form yang diperlukan!",
        error: true,
        success: false,
      });
    }
    console.log("createAboutController: Validasi field kosong lolos"); // Log 8

    console.log(
      "createAboutController: Memanggil AboutModel.create dengan data:",
      { about, visi, misi, name, tanggal }
    ); // Log 9

    const savedAbout = await AboutModel.create({
      about,
      visi,
      misi,
      name,
      tanggal,
    });

    console.log(
      "createAboutController: AboutModel.create berhasil. savedAbout =",
      savedAbout
    ); // Log 10

    return res.status(201).json({
      message: "Data 'Tentang' berhasil ditambahkan!",
      error: false,
      success: true,
      data: savedAbout,
    });
  } catch (error) {
    console.error(
      "createAboutController: Error ditangkap di blok catch:",
      error
    ); // Log 11 (ini yang sangat kita cari!)
    console.error("createAboutController: Stack trace error:", error.stack); // Log 12 (detail stack trace)

    return res.status(500).json({
      message: error.message || "Kesalahan Pada Server, Coba Lagi Nanti!",
      error: true,
      success: false,
    });
  }
};

// controller ambil data Tentang
export const getAboutController = async (req, res) => {
  try {
    const aboutData = await AboutModel.find({}).sort({ createdAt: -1 });

    if (!aboutData) {
      return res.status(404).json({
        message: "Data 'Tentang' tidak ditemukan!",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Data 'Tentang' berhasil diambil!",
      error: false,
      success: true,
      data: aboutData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Kesalahan Pada Server, Coba Lagi Nanti!",
      error: true,
      success: false,
    });
  }
};

// Controller edit tentang
export const editAboutController = async (req, res) => {
  try {
    const userId = req.userId; // Dari authMiddleware
    const { _id, about, visi, misi, name, tanggal } = req.body;

    // Validasi Authentikasi
    if (!userId) {
      return res.status(401).json({
        message: "Silahkan login terlebih dahulu!",
        error: true,
        success: false,
      });
    }

    // Validasi ID tentang
    if (!_id) {
      return res.status(400).json({
        message: "ID data 'Tentang' tidak ditemukan!",
        error: true,
        success: false,
      });
    }

    // update data tentang
    const updatedAbout = await AboutModel.findByIdAndUpdate(
      _id,
      {
        about,
        visi,
        misi,
        name,
        tanggal,
      },
      {
        new: true, // mengembalikan dokumen yang sudah diupdate
        runValidators: true, // validasi skema Mongoose pada data yang masuk.
      }
    );

    // Cek apakah dokumen ditemukan dan berhasil diupdate
    if (!updatedAbout) {
      return res.status(404).json({
        message: "Data 'Tentang' tidak ditemukan untuk diupdate!",
        error: true,
        success: false,
      });
    }

    // Kirim respons berhasil dengan data yang sudah diupdate
    return res.status(200).json({
      message: "Data 'Tentang' berhasil diupdate!",
      error: false,
      success: true,
      data: updatedAbout,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Kesalahan Pada Server, Coba Lagi Nanti!",
      error: true,
      success: false,
    });
  }
};
