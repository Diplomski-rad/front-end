import React from "react";
import styles from "./not-found.module.css";
import notfoundImage from "../../assets/what-looking.gif";

const NotFound: React.FC = () => {
  return (
    <div className={styles["not-found-container"]}>
      <div className={styles.ooops}>Ooops...</div>
      <div className={styles.text}>Sorry, we can't find that page</div>
      <img src={notfoundImage} alt="NotFound.gif" />
    </div>
  );
};

export default NotFound;
