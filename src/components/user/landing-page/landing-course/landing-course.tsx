import React from "react";
import styles from "./landing-course.module.css";
import Course from "../../../model/Course";
import default_image from "../../../../assets/default.jpg";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { getSinglePurchasedCourse } from "../../../service/course-service";
import { enviroment } from "../../../../env/enviroment";
import { jwtDecode } from "jwt-decode";

interface LandingCourseProps {
  course: Course;
}

const LandingCourse: React.FC<LandingCourseProps> = ({ course }) => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");

  let decodedToken: any = null;
  if (isLoggedIn) {
    try {
      decodedToken = jwtDecode(isLoggedIn);
    } catch (error) {}
  }

  const isAuthor = decodedToken?.role === "Author";
  const isAdmin = decodedToken?.role === "Admin";

  const handleCourseClick = async () => {
    if (!localStorage.getItem("token") || isAuthor || isAdmin) {
      navigate("/course-info", { state: { course } });
    } else {
      const resCourse = await getSinglePurchasedCourse(course.id);
      if (resCourse) {
        const courseId = resCourse.id;
        navigate("/purchased-courses-overview", { state: { courseId } });
      } else {
        navigate("/course-info", { state: { course } });
      }
    }
  };

  return (
    <div className={styles.landingCourseContainer} onClick={handleCourseClick}>
      <div className={styles.image}>
        <img
          src={
            course.thumbnail
              ? enviroment.apiHost + "/images/" + course.thumbnail
              : default_image
          }
          alt="Course"
        />
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
              {course.rating.averageRating.toFixed(1)}
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
