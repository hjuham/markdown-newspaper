import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import styles from "./Comments.module.css";
import { Button } from "@mui/material";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${date.getDate()}.${date.getMonth() + 1}`;
  }
};

const CommentItem = ({ comment, user, onLikeClick, onDeleteClick }) => {
  return (
    <div className={styles.comment}>
      <p className={styles.info}>
        <b>Anonymous</b>
        {user?.role === "admin" && (
          <Button
            onClick={() => onDeleteClick(comment._id)}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        )}
        <span>{formatDate(comment.createdAt)}</span>
      </p>
      <p>{comment.text}</p>
      <div className={styles.likes}>
        <button
          onClick={() => onLikeClick(comment._id, comment.likedByCurrentUser)}
        >
          <ThumbUpIcon
            className={
              comment.likedByCurrentUser
                ? styles.iconActive
                : styles.iconInactive
            }
          />
        </button>
        <p>{comment.likes}</p>
      </div>
    </div>
  );
};

export default CommentItem;
