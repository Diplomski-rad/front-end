import { Flip, toast } from "react-toastify";

export const makeToastNotification = (content: string, success: boolean) => {
  if (success) {
    toast.success(content, {
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
  } else {
    toast.error(content, {
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
  }
};
