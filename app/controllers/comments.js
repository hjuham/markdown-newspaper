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

const handleCommentAction = asyncWrapper(async (req, res, next) => {
  const { action } = req.body;
  switch (action) {
    case "like":
      return await likeComment(req, res, next);
    case "unlike":
      return await removeLikeComment(req, res, next);
    default:
      throw new BadRequestError("Wrong like action");
  }
});

//id for specific article
const getArticleComments = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError("Invalid article ID");
  }

  const comments = await Comment.find({ articleId: id });
  const commentLikes = await CommentLikes.find({ articleId: id });
  const likesMap = {};
  for (const like of commentLikes) {
    const commentId = like.commentId.toString();
    if (!likesMap[commentId]) {
      likesMap[commentId] = [];
    }
    likesMap[commentId].push(like.userId.toString());
  }

  const enrichedComments = comments.map((comment) => {
    const commentId = comment._id.toString();
    const likesForComment = likesMap[commentId] || [];
    let likedByCurrentUser;
    if (req.user !== undefined) {
      likedByCurrentUser = likesForComment.includes(req.user.id);
    }

    return {
      ...comment.toObject(),
      likes: likesForComment.length,
      likedByCurrentUser,
    };
  });

  res.status(StatusCodes.OK).json({ comments: enrichedComments });

  // res.status(StatusCodes.OK).json({ comments });
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

const likeComment = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  //Schema checks if user already has a like on comment
  const commentLike = await CommentLikes.findOne({
    commentId: id,
    userId: req.user.id,
  });
  if (commentLike !== null) {
    throw new ConflictError("User has already liked the comment");
  }
  const commentLikes = new CommentLikes({
    commentId: id,
    userId: req.user.id,
  });
  const savedCommentLike = await commentLikes.save(commentLikes);
  res.status(StatusCodes.CREATED).json({ savedCommentLike });
});

const removeLikeComment = asyncWrapper(async (req, res, next) => {
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
