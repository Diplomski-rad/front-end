import React, { useEffect, useRef, useState } from "react";
import styles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import profileImage from "../../../assets/user.png";
import cartImage from "../../../assets/grocery-store.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const isLoggedIn = localStorage.getItem("token");

  let decodedToken: any = null;
  if (isLoggedIn) {
    try {
      decodedToken = jwtDecode(isLoggedIn);
    } catch (error) {}
  }

  const isAuthor = decodedToken?.role === "Author";
  const isUser = decodedToken?.role === "User";

  const handleHomeClick = () => {
    if (isAuthor) {
      navigate("/my-courses-dashboard");
    } else {
      navigate("/");
    }
  };

  const handleCoursesClick = () => {
    navigate("/landing-page");
  };

  const handlePurchasedCoursesClick = () => {
    navigate("/purchased-courses");
  };

  const handleMyCoursesClick = () => {
    navigate("/my-courses-dashboard");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login");
    setIsDropdownOpen(false);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.navbar}>
      <div className={styles["navbar-items-group"]}>
        <div className={styles["navbar-item"]} onClick={handleHomeClick}>
          home
        </div>

        {isUser && (
          <div className={styles["navbar-item"]} onClick={handleCoursesClick}>
            courses
          </div>
        )}

        {isUser && (
          <div
            className={styles["navbar-item"]}
            onClick={handlePurchasedCoursesClick}
          >
            purchased courses
          </div>
        )}

        {isAuthor && (
          <div className={styles["navbar-item"]} onClick={handleMyCoursesClick}>
            my courses
          </div>
        )}
      </div>

      {isDropdownOpen && (
        <div className={styles["navbar-dropdown"]} ref={dropdownRef}>
          <div className={styles["navbar-dropdown-item"]}>Profile</div>

          <div
            className={styles["navbar-dropdown-item"]}
            onClick={handleLogoutClick}
          >
            Logout
          </div>
        </div>
      )}

      <div className={styles["right-group"]}>
        {!isAuthor && (
          <div className={styles["navbar-cart"]} onClick={handleCartClick}>
            <img src={cartImage} alt="" />
          </div>
        )}
        {isLoggedIn ? (
          <div
            className={`${styles["navbar-username-container"]} ${
              isDropdownOpen ? styles.opened : styles["not-opened"]
            }`}
            onClick={toggleDropdown}
          >
            <div className={styles["navbar-image"]}>
              <img src={profileImage} alt="" />
            </div>
            <div className={styles["navbar-username"]} onClick={toggleDropdown}>
              {decodedToken?.sub}
            </div>
          </div>
        ) : (
          <button
            className={styles["navbar-login-btn"]}
            onClick={handleLoginClick}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
