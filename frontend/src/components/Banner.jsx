import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
import ProfileDropdown from "./ProfileDropdown";
import styles from "./Banner.module.css";

const Banner = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useAuth();
  const menuRef = useRef();

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className={styles.banner}>
      <h1>
        <Link to={"/"}>Newspaper X</Link>
      </h1>
      <div ref={menuRef}>
        {user ? (
          <>
            <button
              className={styles.profile}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user.email}
            </button>
            {showDropdown ? <ProfileDropdown /> : null}
          </>
        ) : (
          <Link className={styles.login} to={"/login"}>
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};
export default Banner;
