import mongoose, { Schema } from "mongoose";

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
    like: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislike: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  }
);

const KegiatanModel = mongoose.model("Kegiatan", kegiatanSchema);

export default KegiatanModel;
