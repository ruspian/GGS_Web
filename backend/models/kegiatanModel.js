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
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    read: {
      type: Number,
      default: 0,
    },
    comment: {
      type: Number,
      default: 0,
    },
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
