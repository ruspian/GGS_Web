import mongoose from "mongoose";

const userShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Mohon masukkan nama!"],
    },
    email: {
      type: String,
      required: [true, "Mohon masukkan email!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Mohon masukkan password!"],
    },
    avatar: {
      type: String,
      default: function () {
        return `https://api.dicebear.com/8.x/initials/svg?seed=${this.name}`;
      },
    },
    mobile: {
      type: Number,
      default: null,
    },
    refresh_token: {
      type: String,
      default: "",
    },
    last_login_date: {
      type: Date,
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
    forgot_password_otp: {
      type: String,
      default: null,
    },
    forgot_password_expired: {
      type: Date,
      default: "",
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userShema);
export default UserModel;
