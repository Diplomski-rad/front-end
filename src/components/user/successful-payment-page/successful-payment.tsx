import React from "react";
import styles from "./successful-payment.module.css";
import checkmarkImage from "../../../assets/checkmark.png";
import { useNavigate } from "react-router-dom";

const SuccessfulPayment: React.FC = () => {
  const navigate = useNavigate();

  const handleViewPurchasedCoursesClick = () => {
    navigate("/purchased-courses");
  };

  return (
    <div className={styles["main-container"]}>
      <div className={styles["content-container"]}>
        <div className={styles.image}>
          <img src={checkmarkImage} alt="checkmark" />
        </div>
        <div className={styles.text}>
          <h1>Your payment was successful</h1>
        </div>
        <div className={styles["button-container"]}>
          <button onClick={handleViewPurchasedCoursesClick}>
            View Purchased Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulPayment;
