import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    about: {
      type: String,
      required: [true, "Mohon masukkan deskripsi!"],
    },
    visi: {
      type: String,
      required: [true, "Mohon masukkan visi!"],
    },
    misi: {
      type: String,
      required: [true, "Mohon masukkan misi!"],
    },
    aboutLogo: {
      type: String,
      default: null,
    },
    tanggal: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: [true, "Mohon masukkan nama!"],
    },
  },
  {
    timestamps: true,
  }
);

const AboutModel = mongoose.model("about", aboutSchema);
export default AboutModel;
