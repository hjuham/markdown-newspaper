import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./ProfileDropdown.module.css";

const ProfileDropdown = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.dropdown}>
      <ul>
        <li>
          <Link to={"/profile"}>Profile</Link>
        </li>
        {user.role === "admin" ? (
          <>
            {" "}
            <li>
              <Link to={"/dashboard"}>Admin dashboard</Link>
            </li>
          </>
        ) : (
          <></>
        )}
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};
export default ProfileDropdown;
