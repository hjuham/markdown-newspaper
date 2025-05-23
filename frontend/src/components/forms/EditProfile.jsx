import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import styles from "./EditProfile.module.css";

const EditProfile = () => {
  const { user, updateUser } = useAuth();
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState([]);
  const [error, setError] = useState(null);
  const [changes, setChanges] = useState(null);
  const [message, setMessage] = useState("");
  const allOptions = [
    "Sports",
    "Politics",
    "Entertainment",
    "Music",
    "Technology",
    "Business",
  ];
  const toggleInterest = (interest) => {
    setChanges(true);
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setInterests(user.interests);
    }
  }, [user]);

  const submitForm = async (e) => {
    e.preventDefault();
    if (!user._id) {
      setError("Failed to update user");
      return;
    }
    updateUser(user._id, email, interests);
    setMessage("Updated user info!");
  };

  const discardChanges = () => {
    setEmail(user.email);
    setInterests(user.interests);
  };
  return (
    <>
      <div className={styles.formContainer}>
        <form>
          <h2>Current user profile</h2>
          <label htmlFor="email">Username/Email:</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setChanges(true);
            }}
            type="email"
            id="email"
            name="email"
          />
          <div className={styles.customSelectContainer}>
            <label>Select your interests:</label>
            <div className={styles.customSelectBox}>
              {allOptions.map((option) => (
                <div
                  key={option}
                  className={`${styles.customOption} ${
                    interests.includes(option) ? styles.selected : ""
                  }`}
                  onClick={() => toggleInterest(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
          <button disabled={!changes} onClick={(e) => submitForm(e)}>
            Update
          </button>
          <button onClick={() => discardChanges()}>Discard changes</button>
          {error ? <p className="error">{error}</p> : <></>}
          {message ? <p className="message">{message}</p> : <></>}
        </form>
      </div>
    </>
  );
};
export default EditProfile;
