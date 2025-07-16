import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
import ProfileDropdown from "../ProfileDropDown/ProfileDropdown";
import styles from "./Banner.module.css";
import logo from "../../assets/logo.png";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

const Banner = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useAuth();
  const menuRef = useRef();
  const topics = [
    "sports",
    "politics",
    "entertainment",
    "music",
    "technology",
    "business",
  ];
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
  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
  return (
    <>
      <div className={styles.banner}>
        <div className={styles.wrapper}>
          <h1>
            <Link to={"/"}>
              <img src={logo}></img>
              <p>Markdown Newspaper</p>
            </Link>
          </h1>
          <Link className={styles.search} to={"/search"}>
            <SearchIcon />
            <p>Search</p>
          </Link>
          <div className={styles.buttonWrapper} ref={menuRef}>
            {user ? (
              <>
                <button
                  className={styles.profile}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <PersonIcon />
                </button>
                {showDropdown ? <ProfileDropdown /> : null}
              </>
            ) : (
              <Link data-cy="login" className={styles.login} to={"/login"}>
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className={styles.categories}>
        <div className={styles.links}>
          <NavLink
            to={"/"}
            className={({ isActive, isPending }) =>
              isPending ? styles.pending : isActive ? styles.active : ""
            }
          >
            Front Page
          </NavLink>
          {topics.map((topic) => (
            <NavLink
              key={topic}
              to={`/category/${topic}`}
              className={({ isActive, isPending }) =>
                isPending ? styles.pending : isActive ? styles.active : ""
              }
            >
              {capitalizeFirstLetter(topic)}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};
export default Banner;
