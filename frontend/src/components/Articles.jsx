import { fetchArticles } from "../services/articleRequests";
import { useEffect, useState } from "react";
import styles from "./Articles.module.css";
import { useAuth } from "../contexts/AuthContext";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myFeed, setMyFeed] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    fetchArticles(setArticles, setLoading, setError);
  }, []);
  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <section className={styles.dashboard}>
      {user ? (
        <div className={styles.toggle}>
          <button
            className={myFeed === true ? styles.selected : ""}
            onClick={() => setMyFeed(true)}
          >
            For you
          </button>
          <button
            className={myFeed === false ? styles.selected : ""}
            onClick={() => setMyFeed(false)}
          >
            All news
          </button>
        </div>
      ) : (
        <></>
      )}
      {myFeed === false
        ? articles.map((article) => (
            <article key={article._id}>
              <img src={article.imageURL} />
              <h1>{article.title}</h1>
              <p>{article.content}</p>
              <p>{article.author}</p>
            </article>
          ))
        : articles
            .filter((article) =>
              article.tags.some((tag) => user.interests.includes(tag))
            )
            .map((article) => (
              <article key={article._id}>
                <img src={article.imageURL} alt="" />
                <h1>{article.title}</h1>
                <p>{article.content}</p>
                <p>{article.author}</p>
              </article>
            ))}
    </section>
  );
};
export default Articles;
