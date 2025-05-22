import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(1);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const allOptions = [
    "Sports",
    "Politics",
    "Entertainment",
    "Music",
    "Technology",
    "Business",
  ];
  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const { signup } = useAuth();
  const navigate = useNavigate();

  const submitForm = async (e) => {
    setError("");
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Please fill out your email and password");
      return;
    }
    try {
      setLoading(true);
      await signup(email, interests, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Failed to sign up");
    }
  };

  return (
    <>
      <div className="form-div">
        <div className="form-container">
          <form>
            <h2>Sign up to Newspaper X</h2>
            {stage === 1 ? (
              <>
                {" "}
                <label htmlFor="email">Email:</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  name="email"
                />
                <label htmlFor="Password">Password:</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  name="password"
                />
                <label htmlFor="Password">Confirm password:</label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  id="password"
                  name="password"
                />
                <p>The password must be at least 8 characters long.</p>
                <button
                  disabled={
                    password.length < 8 ||
                    !(password === confirmPassword) ||
                    !emailRegex.test(email)
                  }
                  onClick={() => setStage(2)}
                >
                  Next
                </button>
              </>
            ) : (
              <>
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
                <button disabled={loading} onClick={submitForm}>
                  Sign Up
                </button>
              </>
            )}

            <p className="error">{error}</p>
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default SignUpPage;
