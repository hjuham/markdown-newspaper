import Article from "../components/Article/Article";
import Sidebar from "../components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { fetchArticles } from "../services/articleRequests";
const ArticlePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 980);
  useEffect(() => {
    fetchArticles(setArticles, setLoading, setError);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 980);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        width: isMobile ? "100vw" : "980px",
        margin: "0px auto",
      }}
    >
      <Article />
      <Sidebar articles={articles} loading={loading} error={error} />
    </div>
  );
};
export default ArticlePage;
