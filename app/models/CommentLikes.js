const mongoose = require("mongoose");

const commentLikeSchema = new mongoose.Schema(
  {
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ArticleComment",
      required: [true, "Like must be associated with a comment"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Like must be from a user"],
    },
  },
  { timestamps: true }
);

commentLikeSchema.index({ commentId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("CommentLike", commentLikeSchema);
