import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    kegiatanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kegiatan",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model("Comment", commentSchema);
export default CommentModel;
