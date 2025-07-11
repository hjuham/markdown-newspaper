import { useState } from "react";
import styles from "./EditUser.module.css";
import { editUser } from "../../services/userRequests";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const EditUser = ({ user, setEditing }) => {
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [interests, setInterests] = useState(user.interests);
  const [changes, setChanges] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await editUser(user._id, email, role, interests, setLoading, setError);

    setEditing(false);
    window.location.reload();
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
        <h3>Edit user:</h3>
        <p>ID: {user._id}</p>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setChanges(true);
          }}
          id="email"
          name="email"
        />
        <br />
        <label htmlFor="role">Role:</label>
        <br />
        <input
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setChanges(true);
          }}
          id="role"
          name="role"
        />
        <br />
        <label htmlFor="interests">Interests:</label>
        <br />
        <input
          value={interests}
          onChange={(e) => {
            setInterests(e.target.value);
            setChanges(true);
          }}
          id="interests"
          name="interests"
        />
        <br />
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
export default EditUser;
