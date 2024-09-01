import React, { useEffect, useRef } from "react";
import styles from "./payment-success.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axiosWithBearer from "../../../infrastructure/auth/jwt/jwt.interceptor";
import Spinner from "../../shared/Spinner/spinner";

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasExecuted = useRef(false);

  useEffect(() => {
    const executePayment = async () => {
      if (hasExecuted.current) return;
      hasExecuted.current = true;

      const urlParams = new URLSearchParams(location.search);
      const paymentId = urlParams.get("paymentId");
      const payerId = urlParams.get("PayerID");

      try {
        const response = await axiosWithBearer.post(
          "http://localhost:5217/api/cart/checkout",
          {
            paymentId,
            payerId,
          }
        );

        navigate("/successful-payment");
      } catch (error) {
        console.error("Payment execution error", error);
      }
    };

    executePayment();
  }, [location.search, navigate]);

  return (
    <div className={styles["success-container"]}>
      <div>
        <h1>Processing payment...</h1>
        <Spinner />
      </div>
    </div>
  );
};

export default PaymentSuccess;
