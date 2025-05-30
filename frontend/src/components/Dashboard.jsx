import styles from "./Dashboard.module.css";
import { useState, useEffect } from "react";
import { fetchArticles } from "../services/articleRequests";
import { fetchUsers } from "../services/userRequests";
import UsersTable from "./dashboard/UsersTable";
import ArticlesTable from "./dashboard/ArticlesTable";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("articles");

  useEffect(() => {
    fetchArticles(setArticles, setLoading, setError);
    fetchUsers(setUsers, setLoading, setError);
  }, []);

  const navigate = useNavigate();
  return (
    <div className={styles.dashboard}>
      <div className={styles.menu}>
        <button
          onClick={() => setActiveTab("articles")}
          disabled={activeTab === "articles"}
        >
          Articles
        </button>
        <button
          onClick={() => setActiveTab("users")}
          disabled={activeTab === "users"}
        >
          Users
        </button>
      </div>
      <div className={styles.list}>
        <h2>Dashboard</h2>
        <div>
          {error}
          {loading && !error ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <h3>{activeTab}</h3>
              {activeTab === "articles" ? (
                <div>
                  <button onClick={() => navigate("/create-article")}>
                    Create a new article
                  </button>
                  <ArticlesTable articles={articles} />
                </div>
              ) : (
                <UsersTable users={users} />
              )}{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
