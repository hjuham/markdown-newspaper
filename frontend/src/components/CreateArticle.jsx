import styles from "./CreateArticle.module.css";
import { Fragment, useState } from "react";
import MarkDown from "react-markdown";
import { addArticle } from "../services/articleRequests";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("Write your article in markdown!");
  const [tags, setTags] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [weight, setWeight] = useState(1);
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

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
  const topics = [
    "Sports",
    "Politics",
    "Entertainment",
    "Music",
    "Technology",
    "Business",
  ];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      // Add the selected category
      setTags((prev) => [...prev, value]);
    } else {
      // Remove the deselected category
      setTags((prev) => prev.filter((category) => category !== value));
    }
  };

  const postArticle = async () => {
    setLoading(true);
    await addArticle(
      title,
      description,
      author,
      content,
      tags,
      imageURL,
      weight,
      setLoading,
      setError
    );
    navigate("/");
  };
  if (error) return <p>Error posting article</p>;
  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  return (
    <div className={styles.createArticle}>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to post the article?
          </Typography>
          <Button
            disabled={loading}
            variant="contained"
            color="success"
            onClick={() => postArticle()}
          >
            Post
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
      <div className={styles.inputs}>
        <h2>Create a new article</h2>
        <label htmlFor="title">Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <label htmlFor="author">Author:</label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        ></input>
        <label htmlFor="description">
          Description (maximum 250 characters):
        </label>
        <textarea
          maxLength={250}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <label htmlFor="imageURL">ImageURL:</label>
        <input
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        ></input>
        <label htmlFor="weight">Article weight:</label>
        <select
          name="weight"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(parseInt(e.target.value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <div>
          <p>Select tag(s):</p>
          {topics.map((category) => (
            <Fragment key={category}>
              <input
                type="checkbox"
                id={category}
                value={category}
                onChange={handleCheckboxChange}
                checked={tags.includes(category)}
              />
              <label htmlFor={category}>{category}</label>
            </Fragment>
          ))}
        </div>
        <Button onClick={() => setOpenModal(true)}>Post article</Button>
        <Button onClick={() => setPreview(!preview)}>Toggle preview</Button>
      </div>
      {!preview ? (
        <div className={styles.content}>
          <label htmlFor="content">Article content</label>
          <p>
            For help on how to write markdown see{" "}
            <a href="https://www.markdownguide.org/" target="_blank">
              www.markdownguide.org
            </a>
          </p>
          <br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
      ) : (
        <div className={styles.preview}>
          <MarkDown>{`${tags.join(
            " "
          )} \n # ${title} \n ### ${description} ![](${
            imageURL !== "" ? imageURL : null
          }) ${author} \n ${content}`}</MarkDown>
        </div>
      )}
    </div>
  );
};
export default CreateArticle;
