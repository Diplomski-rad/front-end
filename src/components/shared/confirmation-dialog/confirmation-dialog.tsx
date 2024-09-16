import React, { useEffect, useState } from "react";
import styles from "./confirmation-dialog.module.css";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
}) => {
  const [seconds, setSeconds] = React.useState(5);
  const [timerActive, setTimerActive] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      setSeconds(5); // Reset countdown when dialog opens
      setTimerActive(true);

      const timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // Cleanup on component unmount or dialog close
    }
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className={styles["confirmation-overlay"]}>
      <div className={styles["confirmation-content"]}>
        <div className={styles.message}>{message}</div>
        <div className={styles.timer}>({seconds}s)</div>
        <div className={styles.buttons}>
          <button
            className={styles["confirm-btn"]}
            onClick={onConfirm}
            disabled={timerActive}
          >
            Yes
          </button>
          <button className={styles["cancel-btn"]} onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
