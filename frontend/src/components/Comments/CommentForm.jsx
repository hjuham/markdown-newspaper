import React from "react";
import styles from "./Comments.module.css";

const CommentForm = ({ user, comment, onChange, onSubmit, loading }) => {
  return (
    <div className={styles.writeComment}>
      {user ? (
        <>
          <p>
            <b>New Comment</b>
          </p>
          <textarea
            disabled={loading}
            value={comment}
            onChange={(e) => onChange(e.target.value)}
          ></textarea>
          <br />
          <button disabled={loading} onClick={onSubmit}>
            Send
          </button>
        </>
      ) : (
        <>You need to be logged in to write comments</>
      )}
    </div>
  );
};

export default CommentForm;
