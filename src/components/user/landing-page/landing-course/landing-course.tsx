import React from "react";
import styles from "./landing-course.module.css";
import Course from "../../../model/Course";
import courseImage from "../../../../assets/course.jpg";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

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
        {course.rating.totalRatings > 0 ? (
          <div className={styles.rating}>
            <Typography
              component="legend"
              sx={{
                fontSize: "36px",
                marginRight: "5px",
              }}
            >
              {course.rating.averageRating}
            </Typography>
            <Rating
              name="half-rating"
              defaultValue={
                course.rating.totalRatings > 0 ? course.rating.averageRating : 0
              }
              precision={0.1}
              size="large"
              readOnly
            />
          </div>
        ) : (
          <div>No ratings available</div>
        )}

        <div className={styles.price}>${course.price}</div>
      </div>
    </div>
  );
};

export default LandingCourse;
