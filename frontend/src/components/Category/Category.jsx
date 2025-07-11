import { useParams } from "react-router-dom";
import { fetchArticles } from "../../services/articleRequests";
import { useState, useEffect } from "react";
import Articles from "../Articles/Articles";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Category.module.css";

const Category = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const { category } = useParams();
  const params = `?tags=${category}`;

  useEffect(() => {
    const topics = [
      "sports",
      "politics",
      "entertainment",
      "music",
      "technology",
      "business",
    ];
    if (!topics.includes(category)) {
      setLoading(false);
      setNotFound(true);
      return;
    }
    setNotFound(false);
    fetchArticles(setArticles, setLoading, setError, params);
  }, [category, params]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
  if (loading) return <div>Loading...</div>;
  if (notFound) return <div>Category not found</div>;
  else
    return (
      <>
        <div className={styles.categoryBanner}>
          <h2>{capitalizeFirstLetter(category)}</h2>
        </div>
        <div
          style={{
            display: "flex",
            width: isMobile ? "100vw" : "50vw",
            margin: "0px auto",
          }}
        >
          <Articles
            articles={articles}
            loading={loading}
            error={error}
            foryou={false}
          />
          <Sidebar articles={articles} loading={loading} error={error} />
        </div>
      </>
    );
};
export default Category;
