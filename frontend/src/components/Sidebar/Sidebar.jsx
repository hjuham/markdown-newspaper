import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

const Sidebar = ({ articles, loading, error }) => {
  function isToday(date) {
    const now = new Date();
    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }

  const formattedArticles = articles.map((article) => {
    const date = new Date(article.createdAt);
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

    return {
      ...article,
      formattedTime: formatted,
    };
  });

  const sortedArticles = [...formattedArticles].sort(
    (a, b) => b.requests - a.requests
  );

  const recentArticles = [...formattedArticles].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (error) return <div>Error..</div>;
  if (loading) return null;
  return (
    <div className={styles.sidebar}>
      <h2>Most read</h2>
      <ol className={styles.mostRead}>
        {sortedArticles.map((article) => (
          <li key={article._id}>
            <Link to={`/articles/${article._id}`}>
              <span>{article.tags.join(" ")}</span>
              <div>{article.title}</div>
            </Link>
          </li>
        ))}
      </ol>
      <h2>Most recent</h2>
      <ol className={styles.recent}>
        {recentArticles.map((article) => (
          <li key={article._id}>
            <Link to={`/articles/${article._id}`}>
              <span>{article.tags.join(" ")}</span>
              <div>
                {article.formattedTime} | {article.title}
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};
export default Sidebar;
