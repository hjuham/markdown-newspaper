const Comment = require("../models/Comment");
const CommentLikes = require("../models/CommentLikes");
const asyncWrapper = require("../middleware/asyncErrors");
const {
  NotFoundError,
  BadRequestError,
  APIError,
  UnauthenticatedError,
  ConflictError,
  InternalServerError,
} = require("../errors/custom");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");

const handleCommentAction = asyncWrapper(async (req, res) => {
  const { action } = req.body;
  try {
    switch (action) {
      case "like":
        return await likeComment(req, res);
      case "unlike":
        return await removeLikeComment(req, res);
      default:
        throw new BadRequestError("Wrong like action");
    }
  } catch (err) {
    console.error(err);
    throw new InternalServerError();
  }
});

//id for specific article
const getArticleComments = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError("Invalid article ID");
  }

  const comments = await Comment.find({ articleId: id });

  res.status(StatusCodes.OK).json({ comments });
});

const createComment = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const comment = new Comment({
    articleId: id,
    userId: req.user.id,
    text,
  });
  const savedComment = await comment.save(comment);
  res.status(StatusCodes.CREATED).json({ savedComment });
});

const deleteComment = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError("Invalid comment ID");
  }
  const comment = await Comment.findById(id);
  if (!comment) {
    throw new NotFoundError("Didn't find comment");
  }
  if (req.user.id != id && req.user.role != "admin") {
    throw new UnauthenticatedError("Lacking permissions");
  }
  await Comment.findByIdAndRemove(id);
  return res.status(StatusCodes.OK).json({ success: true });
});

const likeComment = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  //Schema checks if user already has a like on comment
  const commentLike = await Comment.findOne({
    commentId: id,
    userId: req.user.id,
  });
  if (commentLike) {
    throw new ConflictError("User has already liked the comment");
  }
  const commentLikes = new CommentLikes({
    commentId: id,
    userId: req.user.id,
  });
  const savedCommentLike = await commentLikes.save(commentLikes);
  res.status(StatusCodes.CREATED).json({ savedCommentLike });
});

const removeLikeComment = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const commentLikes = await CommentLikes.findOneAndRemove({
    commentId: id,
    userId: req.user.id,
  });
  return res.status(StatusCodes.OK).json({ success: true });
});

module.exports = {
  handleCommentAction,
  getArticleComments,
  createComment,
  deleteComment,
  likeComment,
  removeLikeComment,
};
