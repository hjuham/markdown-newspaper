import { fetchArticles } from "../services/fetchArticles";
import { useEffect, useState } from "react";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles(setArticles, setLoading, setError);
  }, []);
  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      {articles.map((article) => (
        <h1 key={article._id}>{article.title}</h1>
      ))}
    </>
  );
};
export default Articles;
