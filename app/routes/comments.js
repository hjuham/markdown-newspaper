const express = require("express");
const router = express.Router();
const { authUser, authPerms } = require("../middleware/auth");
const {
  handleCommentAction,
  getArticleComments,
  createComment,
  deleteComment,
} = require("../controllers/comments");

router.route("/:id").get(getArticleComments).post(authUser, createComment);

router
  .route("/:id/:id")
  .post(authUser, handleCommentAction) //Use "action" in request body. Accepted values are: "like", "unlike"
  .delete(authUser, deleteComment);

module.exports = router;
