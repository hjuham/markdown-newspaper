import Banner from "../components/Banner";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";

const ProfilePage = () => {
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
      <Banner showLogin={false} />
      <div className="form-div">
        <div className="form-container">
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
            <div className="custom-select-container">
              <label>Select your interests:</label>
              <div className="custom-select-box">
                {allOptions.map((option) => (
                  <div
                    key={option}
                    className={`custom-option ${
                      interests.includes(option) ? "selected" : ""
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
      </div>
    </>
  );
};
export default ProfilePage;
