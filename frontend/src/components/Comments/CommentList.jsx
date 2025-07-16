import CommentItem from "./CommentItem";
import styles from "./Comments.module.css";

const CommentList = ({
  comments,
  sorting,
  setSorting,
  user,
  onLikeClick,
  onDeleteClick,
}) => {
  const sortedComments = [...comments].sort((a, b) => {
    if (sorting === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sorting === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return b.likes - a.likes; // default: mostLikes
  });

  return (
    <div className={styles.comments}>
      <h3>Comments ({comments.length})</h3>
      <div className={styles.sort}>
        Sort:
        <select onChange={(e) => setSorting(e.target.value)} value={sorting}>
          <option value="mostLikes">Most likes</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      {sortedComments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          user={user}
          onLikeClick={onLikeClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
};

export default CommentList;
