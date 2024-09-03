import React from "react";
import styles from "./chart-item.module.css";
import trashBinImage from "../../../assets/trash-bin.png";
import Course from "../../model/Course";

interface CartItemProps {
  course: Course;
}

const CartItem: React.FC<CartItemProps> = ({ course }) => {
  return (
    <div className={styles["chart-item-container"]}>
      <div className={styles["image-container"]}>a</div>
      <div className={styles["text-container"]}>
        <div className={styles.header}>{course.name}</div>
        <div className={styles.author}>
          By {course.author.name} {course.author.surname}
        </div>
        <div className={styles.rating}>Rating</div>
      </div>
      <div className={styles["price-container"]}>
        <div className={styles.price}>${course.price}</div>
        <div className={styles.remove}>
          <img
            src={trashBinImage}
            alt="Remove"
            className={styles["trash-bin"]}
          />
          Remove
        </div>
      </div>
    </div>
  );
};

export default CartItem;
