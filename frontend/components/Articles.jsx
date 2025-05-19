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
    <section>
      {articles.map((article) => (
        <article key={article._id}>
          <img src={article.imageURL} />
          <h1>{article.title}</h1>
          <p>{article.content}</p>
          <p>{article.author}</p>
        </article>
      ))}
    </section>
  );
};
export default Articles;
