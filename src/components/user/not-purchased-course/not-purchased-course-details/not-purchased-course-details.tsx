import React from "react";
import styles from "./not-purchased-course-details.module.css";
import Course from "../../../model/Course";
import { useLocation } from "react-router-dom";
import default_image from "../../../../assets/default.jpg";
import { Flip, toast } from "react-toastify";
import { enviroment } from "../../../../env/enviroment";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const NotPurchasedCourseDetails: React.FC = () => {
  const location = useLocation();

  const { course } = location.state as { course: Course };

  const addToCart = () => {
    const cart = JSON.parse(sessionStorage.getItem("cart") || "[]");

    const courseExists = cart.some((item: Course) => item.id === course.id);
    if (courseExists) {
      toast.error("Course is already in the cart", {
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
    } else {
      cart.push(course);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Course successfully added to cart", {
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
  };

  return (
    <div className={styles["not-purchased-container"]}>
      <div className={styles["course-header"]}>
        <div className={styles.image}>
          <img
            src={
              course.thumbnail
                ? `${enviroment.apiHost}/images/${course.thumbnail}`
                : default_image
            }
            alt="thumbnail"
          />
        </div>
        <div className={styles.title}>
          <h1>{course.name}</h1>
          <div className={styles.author}>
            <h2>
              Author: {course.author.name} {course.author.surname}
            </h2>
          </div>
          {course.rating.totalRatings > 0 && (
            <div className={styles.rating}>
              <Typography
                component="legend"
                sx={{
                  fontSize: "36px",
                  marginRight: "5px",
                  color: "white",
                }}
              >
                {course.rating.averageRating.toFixed(1)}
              </Typography>
              <Rating
                name="half-rating"
                defaultValue={
                  course.rating.totalRatings > 0
                    ? course.rating.averageRating
                    : 0
                }
                precision={0.1}
                size="large"
                readOnly
                sx={{ fontSize: "42px" }}
              />
            </div>
          )}
          <div className={styles["buy-container"]}>
            <div className={styles.price}>Price: ${course.price}</div>
            <button onClick={addToCart}>Add to cart</button>
          </div>
        </div>
      </div>
      <div className={styles["course-description"]}>
        <div className={styles.description}>{course.description}</div>
      </div>
    </div>
  );
};

export default NotPurchasedCourseDetails;
