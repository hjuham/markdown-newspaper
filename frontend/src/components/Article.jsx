import { useParams } from "react-router-dom";
import { fetchArticle } from "../services/articleRequests";
import { useState, useEffect } from "react";
import MarkDown from "react-markdown";
import styles from "./Article.module.css";
import remarkGfm from "remark-gfm";

const Article = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetchArticle(id, setArticle, setLoading, setError);
  }, [id]);

  function isToday(date) {
    const now = new Date();
    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }

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
  if (loading) return <p>Loading article...</p>;
  if (error) return <p>Error: </p>;
  return (
    <div className={styles.article}>
      <MarkDown remarkPlugins={[remarkGfm]}>{`*${article.tags.join(" ")}*\n# ${
        article.title
      } \n### ${article.description}\n![article image](${
        article.imageURL !== "" ? article.imageURL : null
      })\n${article.author}  \n ${formatted} \n${article.content}\n`}</MarkDown>
    </div>
  );
};
export default Article;
