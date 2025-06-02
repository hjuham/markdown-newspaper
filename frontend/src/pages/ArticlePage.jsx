import Article from "../components/Article";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { fetchArticles } from "../services/articleRequests";
const ArticlePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles(setArticles, setLoading, setError);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        width: "50vw",
        margin: "0px auto",
      }}
    >
      <Article />
      <Sidebar articles={articles} loading={loading} error={error} />
    </div>
  );
};
export default ArticlePage;
