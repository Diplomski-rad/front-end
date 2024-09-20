import React, { useState } from "react";
import styles from "./checkout.module.css";
import axiosWithBearer from "../../../infrastructure/auth/jwt/jwt.interceptor";
import Spinner from "../../shared/Spinner/spinner";
import Course from "../../model/Course";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import CheckoutIcon from "../../../assets/checkout.png";

interface CheckoutProps {
  total: number;
  courses: Course[];
}

const Checkout: React.FC<CheckoutProps> = ({ total, courses }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const token = localStorage.getItem("token");

  let decodedToken: any = null;
  if (token) {
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {}
  }

  const createPayment = async () => {
    if (decodedToken && decodedToken?.role === "User") {
      setIsLoading(true);
      try {
        const courseIds = courses.map((course) => course.id);
        const response = await axiosWithBearer.post(
          "http://localhost:5217/api/cart/create-payment",
          { coursesIds: courseIds }
        );
        window.location.href = response.data.approvalUrl;
      } catch (error) {
        console.error("Payment creation error", error);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={styles["checkout-container"]}>
      <div className={styles.total}>Total:</div>
      <div className={styles.price}>${total.toFixed(2)}</div>
      <button
        className={styles["checkout-button"]}
        disabled={isLoading}
        onClick={createPayment}
      >
        <img
          width={25}
          height={25}
          src={CheckoutIcon}
          alt="Checkout"
          className={styles["trash-bin"]}
        />
        {isLoading ? <Spinner /> : "Checkout"}
      </button>
    </div>
  );
};

export default Checkout;
