import React, { useState } from "react";
import styles from "./not-purchased-course-details.module.css";
import Course from "../../../model/Course";
import { useLocation } from "react-router-dom";
import courseImage from "../../../../assets/course.jpg";
import axiosWithBearer from "../../../../infrastructure/auth/jwt/jwt.interceptor";
import Spinner from "../../../shared/Spinner/spinner";

const NotPurchasedCourseDetails: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { course } = location.state as { course: Course };

  const createPayment = async () => {
    setIsLoading(true);
    try {
      const response = await axiosWithBearer.post(
        "http://localhost:5217/api/cart/create-payment",
        { courseId: course.id }
      );
      window.location.href = response.data.approvalUrl;
    } catch (error) {
      console.error("Payment creation error", error);
    }
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
            <button onClick={createPayment} disabled={isLoading}>
              {isLoading ? <Spinner /> : "Buy"}
            </button>
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
