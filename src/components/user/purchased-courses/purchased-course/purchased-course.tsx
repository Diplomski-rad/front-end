import React from "react";
import styles from "./purchased-course.module.css";
import { useNavigate } from "react-router-dom";
import default_image from "../../../../assets/default.jpg";
import Course from "../../../model/Course";
import { enviroment } from "../../../../env/enviroment";

interface PurchasedCourseProps {
  course: Course;
}

const PurchasedCourse: React.FC<PurchasedCourseProps> = ({ course }) => {
  const navigate = useNavigate();

  const courseId = course.id;

  const handleCourseClick = () => {
    navigate("/purchased-courses-overview", { state: { courseId } });
  };

  return (
    <div
      className={styles["single-course-container"]}
      onClick={handleCourseClick}
    >
      <div className={styles["course-content-container"]}>
        <div className={styles.image}>
          <img
            src={
              course.thumbnail
                ? `${enviroment.apiHost}/images/${course.thumbnail}`
                : default_image
            }
            alt="Course"
          />
        </div>
        <div className={styles["course-text-container"]}>
          <h1>{course.name}</h1>
          <div>{course.description}</div>
        </div>
      </div>
    </div>
  );
};

export default PurchasedCourse;
