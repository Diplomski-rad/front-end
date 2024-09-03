import React from "react";
import styles from "./not-purchased-course-details.module.css";
import Course from "../../../model/Course";
import { useLocation } from "react-router-dom";
import courseImage from "../../../../assets/course.jpg";
import { Flip, toast } from "react-toastify";

const NotPurchasedCourseDetails: React.FC = () => {
  const location = useLocation();

  const { course } = location.state as { course: Course };

  const addToCart = () => {
    const cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
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
  };

  return (
    <div className={styles["not-purchased-container"]}>
      <div className={styles["course-header"]}>
        <div className={styles.image}>
          <img src={courseImage} alt="thumbnail" />
        </div>
        <div className={styles.title}>
          <h1>{course.name}</h1>
          <div className={styles.author}>
            <h2>
              Author: {course.author.name} {course.author.surname}
            </h2>
          </div>
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
