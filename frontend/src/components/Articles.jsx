import { useState } from "react";
import styles from "./Articles.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Articles = ({ articles, loading, error, foryou }) => {
  const [myFeed, setMyFeed] = useState(false);

  const { user } = useAuth();

  const navigate = useNavigate();

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

  if (loading)
    return (
      <Box
        sx={{
          marginTop: "10%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (error) return <p>Error: {error}</p>;
  return (
    <section className={styles.dashboard}>
      {user && foryou !== false ? (
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
        ? formattedArticles.map((article) => (
            <article
              key={article._id}
              onClick={() => navigate(`/articles/${article._id}`)}
            >
              <img src={article.imageURL !== "" ? article.imageURL : null} />
              <h1>
                <span>{article.tags.join(" ")} |</span> {article.title}
              </h1>
              <p>{article.description}</p>
              <p className={styles.time}>{article.formattedTime}</p>
            </article>
          ))
        : formattedArticles
            .filter((article) =>
              article.tags.some((tag) => user.interests.includes(tag))
            )
            .map((article) => (
              <article
                key={article._id}
                onClick={() => navigate(`/articles/${article._id}`)}
              >
                <img src={article.imageURL !== "" ? article.imageURL : null} />
                <h1>
                  <span>{article.tags.join(" ")} |</span> {article.title}
                </h1>
                <p>{article.description}</p>
                <p className={styles.time}>{article.formattedTime}</p>
              </article>
            ))}
    </section>
  );
};
export default Articles;
