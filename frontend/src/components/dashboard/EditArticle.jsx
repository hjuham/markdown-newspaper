import { useState } from "react";
import styles from "./EditArticle.module.css";
import { editArticle } from "../../services/articleRequests";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const EditArticle = ({ article, setEditing }) => {
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description || "");
  const [author, setAuthor] = useState(article.author);
  const [content, setContent] = useState(article.content);
  const [tags, setTags] = useState(article.tags);
  const [imageURL, setImageURL] = useState(article.imageURL);
  const [weight, setWeight] = useState(article.weight);
  const [changes, setChanges] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await editArticle(
      article._id,
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

    setEditing(false);
  };

  if (error) return <p>Error editing article</p>;
  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  else
    return (
      <form className={styles}>
        <h3>Edit article:</h3>
        <p>ID: {article._id}</p>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setChanges(true);
          }}
          id="title"
          name="title"
        />
        <br />
        <label htmlFor="description">Description:</label>
        <br />
        <input
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setChanges(true);
          }}
          id="description"
          name="description"
        />
        <br />
        <label htmlFor="author">Author:</label>
        <br />
        <input
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
            setChanges(true);
          }}
          id="author"
          name="author"
        />
        <br />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setChanges(true);
          }}
          id="content"
          name="content"
        />
        <br />
        <label htmlFor="tags">Tags:</label>
        <br />
        <input
          value={tags}
          onChange={(e) => {
            setTags(e.target.value);
            setChanges(true);
          }}
          id="tags"
          name="tags"
        />
        <br />
        <label htmlFor="imageURL">ImageURL:</label>
        <br />
        <input
          value={imageURL}
          onChange={(e) => {
            setImageURL(e.target.value);
            setChanges(true);
          }}
          id="imageURL"
          name="imageURL"
        />
        <br />
        <label htmlFor="weight">Weight:</label>
        <br />
        <input
          value={weight}
          onChange={(e) => {
            setWeight(e.target.value);
            setChanges(true);
          }}
          id="weight"
          name="weight"
        />{" "}
        <button disabled={!changes} onClick={(e) => handleSubmit(e)}>
          Save Changes
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setEditing(false);
          }}
        >
          Discard Changes
        </button>
      </form>
    );
};
export default EditArticle;
