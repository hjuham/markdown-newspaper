import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./ProfileDropdown.module.css";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";

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
          <Link to={"/profile"}>
            <PersonIcon />
            Profile
          </Link>
        </li>
        {user.role === "admin" ? (
          <>
            {" "}
            <li>
              <Link to={"/dashboard"}>
                <DashboardIcon />
                Dashboard
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
        <li onClick={handleLogout}>
          <LogoutIcon />
          Logout
        </li>
      </ul>
    </div>
  );
};
export default ProfileDropdown;
