import { Link } from "react-router-dom";

const ProfileDropdown = () => {
  return (
    <div className="profile-dropdown">
      <ul>
        <li>
          <Link to={"/profile"}>Profile</Link>
        </li>
        <li>
          <Link to={""}>Dashboard</Link>
        </li>
        <li>Logout</li>
      </ul>
    </div>
  );
};
export default ProfileDropdown;
