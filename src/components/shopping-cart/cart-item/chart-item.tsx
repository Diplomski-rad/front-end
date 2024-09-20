import React from "react";
import styles from "./chart-item.module.css";
import trashBinImage from "../../../assets/trash-bin.png";
import Course from "../../model/Course";
import { enviroment } from "../../../env/enviroment";
import default_image from "../../../assets/default.jpg";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

interface CartItemProps {
  course: Course;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ course, onRemove }) => {
  return (
    <div className={styles["chart-item-container"]}>
      <div className={styles["image-container"]}>
        <img
          src={
            course.thumbnail
              ? `${enviroment.apiHost}/images/${course.thumbnail}`
              : default_image
          }
          alt="Course"
        />
      </div>
      <div className={styles["text-container"]}>
        <div className={styles.header}>{course.name}</div>
        <div className={styles.author}>
          By {course.author.name} {course.author.surname}
        </div>
        {course.rating.totalRatings > 0 && (
          <div className={styles.rating}>
            <Typography
              component="legend"
              sx={{
                fontSize: "24px",
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
        )}
      </div>
      <div className={styles["price-container"]}>
        <div className={styles.price}>${course.price}</div>
        <div className={styles.remove} onClick={() => onRemove(course.id)}>
          <img
            src={trashBinImage}
            alt="Remove"
            className={styles["trash-bin"]}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
