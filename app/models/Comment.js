const mongoose = require("mongoose");

const articleCommentSchema = new mongoose.Schema(
  {
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      required: [true, "Comment must belong to an article"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Comment must have a user"],
    },
    text: {
      type: String,
      required: [true, "Comment cannot be empty"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ArticleComment", articleCommentSchema);
