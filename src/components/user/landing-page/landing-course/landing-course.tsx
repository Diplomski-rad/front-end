import React from "react";
import styles from "./landing-course.module.css";
import Course from "../../../model/Course";
import courseImage from "../../../../assets/course.jpg";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";

interface LandingCourseProps {
  course: Course;
}

const LandingCourse: React.FC<LandingCourseProps> = ({ course }) => {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    navigate("/course-info", { state: { course } });
  };

  return (
    <div className={styles.landingCourseContainer} onClick={handleCourseClick}>
      <div className={styles.image}>
        <img src={courseImage} alt="Course" />
      </div>
      <div className={styles.content}>
        <h1>{course.name}</h1>
        <h4>
          {course.author.name} {course.author.surname}
        </h4>
        <div className={styles.categories}>
          {course.categories.map((category) => (
            <Chip
              sx={{
                fontSize: "18px",
                marginBottom: "5px",
                marginRight: "2%",
              }}
              color="primary"
              label={category.name}
              key={category.id}
            />
          ))}
        </div>
        <div className={styles.price}>${course.price}</div>
      </div>
    </div>
  );
};

export default LandingCourse;
