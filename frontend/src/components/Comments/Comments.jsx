import { useState, useEffect } from "react";
import {
  fetchArticleComments,
  addComment,
  deleteComment,
} from "../../services/commentRequests";
import { useParams } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import styles from "./Comments.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const Comments = () => {
  const [display, setDisplay] = useState(false);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState("");

  const { user } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    fetchArticleComments(id, setComments, setLoading, setError);
  }, [id]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  function isToday(date) {
    const now = new Date();
    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }

  const displayComments = comments.map((comment) => {
    const date = new Date(comment.createdAt);
    let formatted;

    if (isToday(date)) {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      formatted = `${hours}:${minutes}`;
    } else {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      formatted = `${day}.${month}`;
    }

    //Implement check if comment was liked by user
    //Placeholder
    const isActive = false;
    //Implement like count
    //Placeholder
    const likes = 12;
    return (
      <div className={styles.comment} key={comment._id}>
        <p className={styles.info}>
          <b>Anonymous</b>
          {user.role === "admin" ? (
            <Button
              onClick={() => {
                setOpenModal(true);
                setDeleteCommentId(comment._id);
              }}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          ) : (
            <></>
          )}
          <span>{formatted}</span>
        </p>
        <p>{comment.text}</p>
        <div className={styles.likes}>
          <button>
            <ThumbUpIcon
              className={isActive ? styles.iconActive : styles.iconInactive}
            />
          </button>
          <p>{likes}</p>
        </div>
      </div>
    );
  });

  const handleSubmit = async () => {
    setSubmitLoading(true);
    const newComment = await addComment(
      comment,
      id,
      setSubmitLoading,
      setError
    );

    if (!newComment) return; // handle error
    setComments((prevComments) => [...prevComments, newComment]);
    setComment("");
  };

  const callDeleteComment = async () => {
    setLoading(true);
    await deleteComment(id, deleteCommentId, setLoading, setError);
    if (loading === false && error === false) {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== deleteCommentId)
      );
      setOpenModal(false);
    }
  };

  return (
    <>
      {display ? (
        <>
          <Modal
            open={openModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure you want to delete the comment?
              </Typography>
              <Button
                disabled={loading}
                variant="contained"
                color="error"
                onClick={() => callDeleteComment()}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="#4dabf5"
                onClick={() => {
                  setOpenModal(false);
                  setDeleteCommentId("");
                }}
              >
                Cancel
              </Button>
            </Box>
          </Modal>
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              <div className={styles.comments}>
                <h3>Comments ({comments.length})</h3>
                {displayComments}
              </div>
              <div className={styles.writeComment}>
                {user ? (
                  <>
                    <p>
                      <b>New Comment</b>
                    </p>
                    <textarea
                      disabled={submitLoading}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <br />
                    <button
                      disabled={submitLoading}
                      onClick={() => handleSubmit()}
                    >
                      Send
                    </button>{" "}
                  </>
                ) : (
                  <>You need to be logged in to write comments</>
                )}
              </div>
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
