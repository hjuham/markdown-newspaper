import { useParams } from "react-router-dom";
import { fetchArticle } from "../services/articleRequests";
import { useState, useEffect } from "react";
import MarkDown from "react-markdown";
import styles from "./Article.module.css";

const Article = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetchArticle(id, setArticle, setLoading, setError);
  }, [id]);

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>Error: </p>;
  return (
    <div className={styles.article}>
      <MarkDown>{`${article.tags.join(" ")} \n # ${article.title} \n ### ${
        article.description
      } ![](${article.imageURL !== "" ? article.imageURL : null}) ${
        article.author
      } \n ${article.content}`}</MarkDown>
    </div>
  );
};
export default Article;
