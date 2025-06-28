import mongoose from "mongoose";

const kegiatanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const KegiatanModel = mongoose.model("Kegiatan", kegiatanSchema);

export default KegiatanModel;
