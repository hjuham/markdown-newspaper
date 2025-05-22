import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const { logout } = useAuth();
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
    <div className="profile-dropdown">
      <ul>
        <li>
          <Link to={"/profile"}>Profile</Link>
        </li>
        <li>
          <Link to={""}>Dashboard</Link>
        </li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};
export default ProfileDropdown;
