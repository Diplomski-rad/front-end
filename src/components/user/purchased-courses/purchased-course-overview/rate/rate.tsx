import React, { FC, useEffect, useState } from "react";
import styles from "./rate.module.css";
import Rating from "@mui/material/Rating";
import Course from "../../../../model/Course";
import { Flip, toast } from "react-toastify";
import {
  addRating,
  getUserCourseRating,
} from "../../../../service/course-service";

interface RateProps {
  onClose: () => void;
  course: Course;
}

const Rate: React.FC<RateProps> = ({ onClose, course }) => {
  const [value, setValue] = useState<number | null>(null);

  const handleSubmit = async () => {
    if (!value) {
      toast.error("Invalid rating", {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    } else {
      if (value && course.id !== 0) {
        await addRating({
          courseId: course.id,
          ratingValue: value,
        });
        toast.success(
          "Thank you for rating! Your feedback helps us improve the course experience.",
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Flip,
          }
        );

        onClose();
      } else {
        toast.error("Error", {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });
      }
    }
  };

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const rating = await getUserCourseRating(course.id);
        if (rating) {
          setValue(rating.ratingValue);
        } else {
          setValue(null);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };
    fetchRating();
  }, [course.id]);

  return (
    <div className={styles["rate-overlay"]} onClick={onClose}>
      <div
        className={styles["rate-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>Rate course</div>
        <div className={styles.stars}>
          <Rating
            name="simple-controlled"
            sx={{ fontSize: "4rem" }}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </div>
        <button className={styles["submit-btn"]} onClick={handleSubmit}>
          Submit rate
        </button>
        <button className={styles["close-btn"]} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Rate;
