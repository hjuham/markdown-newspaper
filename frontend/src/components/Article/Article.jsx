import { useParams } from "react-router-dom";
import { fetchArticle } from "../../services/articleRequests";
import { useState, useEffect, Suspense } from "react";
import MarkDown from "react-markdown";
import styles from "./Article.module.css";
import remarkGfm from "remark-gfm";
import { useAuth } from "../../contexts/AuthContext";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteArticle } from "../../services/articleRequests";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Comments from "../Comments/Comments";

const Article = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const callDeleteArticle = async () => {
    setLoading(true);
    await deleteArticle(id, setLoading, setError);
    navigate("/");
  };

  useEffect(() => {
    fetchArticle(id, setArticle, setLoading, setError);
  }, [id]);

  function isToday(date) {
    const now = new Date();
    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }

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
  if (error) return <p>Error: </p>;
  return (
    <div className={styles.article}>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete the article?
          </Typography>
          <Button
            disabled={loading}
            variant="contained"
            color="error"
            onClick={() => callDeleteArticle()}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="#4dabf5"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
      {user !== null && user.role === "admin" ? (
        <>
          <Button
            onClick={() => navigate(`/edit-article/${id}`)}
            variant="contained"
            color="warning"
          >
            Edit
          </Button>
          <span> </span>
          <Button
            onClick={() => setOpenModal(true)}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </>
      ) : (
        <></>
      )}
      <MarkDown remarkPlugins={[remarkGfm]}>{`*${article.tags.join(" ")}*\n# ${
        article.title
      } \n### ${article.description}\n![article image](${
        article.imageURL !== "" ? article.imageURL : null
      })\n${article.author}  \n ${formatted} \n${article.content}\n`}</MarkDown>
      <Suspense>
        <Comments />
      </Suspense>
    </div>
  );
};
export default Article;
