import mongoose from "mongoose";

const galeriSchema = new mongoose.Schema(
  {
    image: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const GaleriModel = mongoose.model("Galeri", galeriSchema);
export default GaleriModel;
