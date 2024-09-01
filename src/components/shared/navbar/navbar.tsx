import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../../../infrastructure/redux/slice/userSlice";
import { jwtDecode } from "jwt-decode";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    navigate("/");
  };

  // const handleVideoPlayerClick = () => {
  //   navigate("/video-player");
  // };

  const handleCoursesClick = () => {
    navigate("/landing-page");
  };

  const handlePurchasedCoursesClick = () => {
    navigate("/purchased-courses");
  };

  // const handleVideoUploaderClick = () => {
  //   navigate("/video-uploader");
  // };

  // const handleCreateCourseClick = () => {
  //   navigate("/course-form");
  // };

  const handleMyCoursesClick = () => {
    navigate("/my-courses-dashboard");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-items-group">
        <div className="navbar-item" onClick={handleHomeClick}>
          home
        </div>

        {/* {isAuthor && (
          <div className="navbar-item" onClick={handleCreateCourseClick}>
            add course
          </div>
        )} */}

        {isUser && (
          <div className="navbar-item" onClick={handleCoursesClick}>
            courses
          </div>
        )}

        {isUser && (
          <div className="navbar-item" onClick={handlePurchasedCoursesClick}>
            purchased courses
          </div>
        )}

        {isAuthor && (
          <div className="navbar-item" onClick={handleMyCoursesClick}>
            my courses
          </div>
        )}

        {/* <div className="navbar-item" onClick={handleVideoPlayerClick}>
          video player
        </div> */}

        {/* <div className="navbar-item" onClick={handleVideoUploaderClick}>
          video uploader
        </div> */}
      </div>
      {isLoggedIn ? (
        <div className="navbar-username-container">
          <div className="navbar-username">{decodedToken?.sub}</div>
          <button className="navbar-login-btn" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      ) : (
        <button className="navbar-login-btn" onClick={handleLoginClick}>
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
