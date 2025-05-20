import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Banner = () => {
  const { user } = useAuth();
  return (
    <div className="banner">
      <h1>Newspaper X</h1>
      {user ? (
        <Link className="profile-button" to={"/profile"}>
          {user.user.email}
        </Link>
      ) : (
        <Link className="login-button" to={"/login"}>
          Log In
        </Link>
      )}
    </div>
  );
};
export default Banner;
