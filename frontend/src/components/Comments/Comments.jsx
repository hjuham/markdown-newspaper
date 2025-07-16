import { useState, useEffect } from "react";
import {
  fetchArticleComments,
  addComment,
  deleteComment,
  likeComment,
  removeLikeComment,
} from "../../services/commentRequests";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Comments.module.css";

import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import DeleteModal from "./DeleteModal";

const Comments = () => {
  const [display, setDisplay] = useState(false);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState("");
  const [sorting, setSorting] = useState("newest");

  const { user } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    fetchArticleComments(id, setComments, setLoading, setError);
  }, [id]);

  const handleSubmit = async () => {
    setSubmitLoading(true);
    const newComment = await addComment(
      comment,
      id,
      setSubmitLoading,
      setError
    );
    if (!newComment) return;
    fetchArticleComments(id, setComments, setLoading, setError);
    setComment("");
  };

  const callDeleteComment = async () => {
    setLoading(true);
    await deleteComment(id, deleteCommentId, setLoading, setError);
    setLoading(false);
    if (!error) {
      setComments((prev) =>
        prev.filter((comment) => comment._id !== deleteCommentId)
      );
      setOpenModal(false);
      setDeleteCommentId("");
    }
  };

  const handleLikeClick = async (commentId, liked) => {
    // Optimistic update
    setComments((prev) =>
      prev.map((comment) =>
        comment._id === commentId
          ? {
              ...comment,
              likedByCurrentUser: !liked,
              likes: liked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      )
    );

    try {
      if (!liked) {
        await likeComment(id, commentId, setLoading, setError);
      } else {
        await removeLikeComment(id, commentId, setLoading, setError);
      }
    } catch (err) {
      setError(err);
      // Rollback on error
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                likedByCurrentUser: liked,
                likes: liked ? comment.likes + 1 : comment.likes - 1,
              }
            : comment
        )
      );
    }
  };

  return (
    <>
      {display ? (
        <>
          <DeleteModal
            open={openModal}
            onClose={() => {
              setOpenModal(false);
              setDeleteCommentId("");
            }}
            onConfirm={callDeleteComment}
            loading={loading}
          />

          {error ? (
            <p className={styles.error}>{error.toString()}</p>
          ) : (
            <>
              <CommentList
                comments={comments}
                sorting={sorting}
                setSorting={setSorting}
                user={user}
                onLikeClick={handleLikeClick}
                onDeleteClick={(id) => {
                  setDeleteCommentId(id);
                  setOpenModal(true);
                }}
              />

              <CommentForm
                user={user}
                comment={comment}
                onChange={setComment}
                onSubmit={handleSubmit}
                loading={submitLoading}
              />
            </>
          )}
        </>
      ) : (
        <button
          className={styles.showComments}
          onClick={() => setDisplay(true)}
        >
          Show comments ({comments.length})
        </button>
      )}
    </>
  );
};

export default Comments;
