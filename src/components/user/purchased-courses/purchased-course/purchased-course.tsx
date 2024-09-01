import React from "react";
import styles from "./purchased-course.module.css";
import authorCourseImage from "../../../../assets/author_course.jpg";
import PurchasedCourseModel from "../../../model/PurchasedCourse";
import { useNavigate } from "react-router-dom";

interface PurchasedCourseProps {
  course: PurchasedCourseModel;
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
          <img src={authorCourseImage} alt="Course" />
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
