import React from "react";
import styles from "./single-course.module.css";
import Course from "../../../model/Course";
import { useNavigate } from "react-router-dom";
import authoCourseImage from "../../../../assets/author_course.jpg";

interface SingleCourseProps {
  course: Course;
}

const SingleCourse: React.FC<SingleCourseProps> = ({ course }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate("/course-details", { state: { course } });
  };

  const convertStatus = (num: number): string => {
    switch (num) {
      case 1:
        return "Published";
      case 2:
        return "Archived";
      default:
        return "Drawft";
    }
  };

  const getStatusClass = (status: number): string => {
    switch (status) {
      case 1:
        return styles.published;
      case 2:
        return styles.archived;
      default:
        return styles.draft;
    }
  };

  return (
    <div className={styles["single-course-container"]}>
      <div className={styles["course-content-container"]}>
        <div className={styles.image}>
          <img src={authoCourseImage} alt="Course" />
        </div>
        <div className={styles["course-text-container"]}>
          <div className={`${styles.status} ${getStatusClass(course.status)}`}>
            {convertStatus(course.status)}
          </div>
          <h1>{course.name}</h1>
          <div>{course.description}</div>
        </div>
      </div>
      <div className={styles["options-container"]}>
        <button
          onClick={() => {
            handleDetailsClick();
          }}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default SingleCourse;
