import mongoose from "mongoose";

const anggotaSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const AnggotaModel = mongoose.model("Anggota", anggotaSchema);
export default AnggotaModel;
