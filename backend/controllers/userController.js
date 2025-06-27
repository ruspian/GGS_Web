import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageToCloudinary from "../utils/uploadImageToCloudinary.js";

// fungsi register user controller
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("req.body", req.body);

    // validasi email, nama, dan password
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Mohon masukkan nama, email, dan password!",
        error: true,
        success: false,
      });
    }

    // cek apakah email sudah ada yang mengugunakan
    const userEmail = await UserModel.findOne({ email });
    if (userEmail) {
      return res.status(400).json({
        message: "Email sudah digunakan!",
        error: true,
        success: false,
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // buat payload
    const payload = {
      name,
      email,
      password: hashedPassword,
    };

    // buat dan simpan user baru ke database
    const newUser = new UserModel(payload);
    const saveUser = await newUser.save();

    // kembalikan respon jika berhasil
    return res.status(201).json({
      message: "Berhasil!",
      error: false,
      success: true,
      data: saveUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Kesalahan server, coba lagi nanti!",
      error: true,
      success: false,
    });
  }
};

// fungsi untuk login user
export const loginUserController = async (req, res) => {
  try {
    // destructing data dari body request ke email dan password
    const { email, password } = req.body;

    // cek apakah email dan password ada
    if (!email || !password) {
      return res.status(400).json({
        message: "Mohon isi semua form!",
        error: true,
        success: false,
      });
    }

    // cek apakah email dan password ada
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Email tidak ditemukan, silahkan daftar terlebih dahulu!",
        error: true,
        success: false,
      });
    }

    // cek status akun user
    // if (user.status !== "Active") {
    //   return res.status(403).json({
    //     message:
    //       "Akun Anda belum aktif, silahkan verifikasi email terlebih dahulu!",
    //     error: true,
    //     success: false,
    //   });
    // }

    // cek apakah password sesuai
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Password salah!",
        error: true,
        success: false,
      });
    }

    // buat access token dan refresh access token
    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    // update terakir login
    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    // menggunakan cookie untuk menyimpan token
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    // jika berhasil kembalikan response
    return res.status(200).json({
      message: "Login berhasil!",
      success: true,
      error: false,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// fungsi untuk refresh token
export async function refreshTokenController(req, res) {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1]; // ambil dari cookie

    // cek apakah refresh token ada
    if (!refreshToken) {
      return res.status(401).json({
        message: "Token tidak valid!",
        error: true,
        success: false,
      });
    }

    // verifikasi refresh token
    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_REFRESH_TOKEN
    );

    // cek apakah verifyToken ada
    if (!verifyToken) {
      return res.status(401).json({
        message: "Token kadaluarsa!",
        error: true,
        success: false,
      });
    }

    // cek apakah user ada
    const userId = verifyToken?.id;

    // buat akses token baru
    const newAccessToken = await generateAccessToken(userId);
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // kembalikan response jika berhasil
    return res.status(200).json({
      message: "Akses token berhasil diperbarui!",
      success: true,
      error: false,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// fungsi ambil data user login
export const getUserLoginDetailsController = async (req, res) => {
  try {
    const userId = req.userId; // ambil dari authMiddleware

    // cari user di database
    const user = await UserModel.findById(userId).select(
      "-password -refresh_token "
    );

    // cek apakah user ada
    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan!",
        error: true,
        success: false,
      });
    }

    // jika berhasil
    return res.status(200).json({
      message: "Berhasil mengambil data user!",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.massage || "Kesalahan Pada Server, Coba Lagi Nanti!",
      error: true,
      success: false,
    });
  }
};

// fungsi logout
export const logoutUserController = async (req, res) => {
  try {
    const userId = req.userId; // ambil dari authMiddleware

    // hapus cookie
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    // hapus refresh token dari database
    const user = await UserModel.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    // kembalikan response
    return res.status(200).json({
      message: "Logout berhasil!",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.massage || "Kesalahan Pada Server, Coba Lagi Nanti!",
      error: true,
      success: false,
    });
  }
};

// fungsi upload poto profil user
export const uploadAvatarController = async (req, res) => {
  try {
    const userId = req.userId; // ambil dari authMiddleware
    const file = req.file; // ambil file dari multer middleware

    // upload gambar ke cloudinary
    const uploadAvatar = await uploadImageToCloudinary(file);

    // update avatar di database
    const userUpated = await UserModel.findByIdAndUpdate(userId, {
      avatar: uploadAvatar.secure_url,
    });

    // cek apakah avatar suda di update
    if (!userUpated) {
      return res.status(400).json({
        message: "Gagal mengupdate avatar!",
        error: true,
        success: false,
      });
    }

    // kembalikan response
    return res.status(200).json({
      message: "Avatar berhasil diupdate!",
      error: false,
      success: true,
      data: {
        _id: userId,
        avatar: uploadAvatar.secure_url,
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

// fungsi update/edit user detail controller
export const updateUserDetailController = async (req, res) => {
  try {
    const userId = req.userId; // ambil dari authMiddleware
    const {
      name,
      email,
      password,
      mobile,
      aboutme,
      facebook,
      instagram,
      twitter,
      linkedin,
      github,
      youtube,
      tiktok,
      whatsapp,
    } = req.body;

    // hash pasword baru
    let hashNewPassword = "";
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashNewPassword = await bcrypt.hash(password, salt);
    }

    // update user di database
    const userUpdated = await UserModel.findByIdAndUpdate(userId, {
      name: name,
      email: email,
      password: hashNewPassword,
      mobile: mobile,
      aboutme: aboutme,
      social_media: {
        facebook: facebook,
        instagram: instagram,
        twitter: twitter,
        linkedin: linkedin,
        github: github,
        youtube: youtube,
        tiktok: tiktok,
        whatsapp: whatsapp,
      },
    });

    // cek apakah user suda di update
    if (!userUpdated) {
      return res.status(400).json({
        message: "Gagal mengupdate user!",
        error: true,
        success: false,
      });
    }

    // kembalikan response
    return res.status(200).json({
      message: "User berhasil diupdate!",
      error: false,
      success: true,
      data: userUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.massage || "Kesalahan Pada Server, Coba Lagi Nanti!",
      error: true,
      success: false,
    });
  }
};
