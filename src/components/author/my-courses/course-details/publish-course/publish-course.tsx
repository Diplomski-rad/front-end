import React, { useState } from "react";
import styles from "./publish-course.module.css";
import { publishCourse } from "../../../../service/course-service";
import { useLocation, useNavigate } from "react-router-dom";
import { Flip, toast, ToastContainer, Zoom } from "react-toastify";

const PublishCourse: React.FC = () => {
  const [price, setPrice] = useState<number>();
  const location = useLocation();
  const navigate = useNavigate();

  const courseId = location.state?.courseId;

  console.log(courseId);

  const validateForm = () => {
    return price !== undefined && price > 0;
  };

  const handlePublishClick = () => {
    if (validateForm() && price !== undefined && courseId) {
      try {
        publishCourse(courseId, { price: price });
        toast.success("The course has been published successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
        navigate("/my-courses-dashboard");
      } catch (error) {
        toast.error("An error occurred while publishing the course", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
      }
    }
  };

  return (
    <div className={styles["main-container"]}>
      <form className={styles.form}>
        <h1>What will be the price of the course?</h1>
        <div className="input-container">
          <input
            type="number"
            className="login-input"
            placeholder="Price ($)"
            value={price !== undefined ? price : ""}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setPrice(isNaN(value) ? undefined : value);
            }}
          />
        </div>

        <button onClick={handlePublishClick}>Publish course</button>
      </form>
    </div>
  );
};

export default PublishCourse;
