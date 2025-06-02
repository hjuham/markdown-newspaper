import { useState } from "react";
import styles from "./Articles.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Articles = ({ articles, loading, error }) => {
  const [myFeed, setMyFeed] = useState(false);

  const { user } = useAuth();

  const navigate = useNavigate();

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
            <article
              key={article._id}
              onClick={() => navigate(`/articles/${article._id}`)}
            >
              <img src={article.imageURL !== "" ? article.imageURL : null} />
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <p>{article.author}</p>
            </article>
          ))
        : articles
            .filter((article) =>
              article.tags.some((tag) => user.interests.includes(tag))
            )
            .map((article) => (
              <article
                key={article._id}
                onClick={() => navigate(`/articles/${article._id}`)}
              >
                <img src={article.imageURL !== "" ? article.imageURL : null} />
                <h1>{article.title}</h1>
                <p>{article.description}</p>
                <p>{article.author}</p>
              </article>
            ))}
    </section>
  );
};
export default Articles;
