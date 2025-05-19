import Banner from "../components/Banner";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
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
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Failed to log in");
    }
  };

  return (
    <>
      <Banner showLogin={false} />
      <div className="form-div">
        <div className="form-container">
          <form onSubmit={submitForm}>
            <h2>Login to Newspaper X</h2>
            <label htmlFor="email">Username/Email:</label>
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
            <button disabled={loading}>Login</button>
            <p className="error">{error}</p>
            <p>
              Don't have an account? <Link to="/sign-up">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
