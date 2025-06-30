import mongoose from "mongoose";

const galeriSchema = new mongoose.Schema(
  {
    kegiatanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kegiatan",
    },
  },
  {
    timestamps: true,
  }
);

const GaleriModel = mongoose.model("Galeri", galeriSchema);
export default GaleriModel;
