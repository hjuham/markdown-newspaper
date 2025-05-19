import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="banner">
      <h1>Newspaper X</h1>
      <Link className="login-button" to={"/login"}>
        Log In
      </Link>
    </div>
  );
};
export default Banner;
