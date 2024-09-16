import React, { FC, useEffect, useState } from "react";
import styles from "./uploading-video.module.css";
import CircularWithValueLabel from "../../../../shared/CircularProgressWithLabel/circular-progress-with-label";
import axios from "axios";
import Spinner from "../../../../shared/Spinner/spinner";

interface UploadingVideoProps {
  link: string;
}

const UploadingVideo: React.FC<UploadingVideoProps> = ({ link }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const getProgress = async (): Promise<{
      mode: string;
      name: string;
      received: number;
      size: number;
      state: string;
    }> => {
      try {
        const response = await axios.get<{
          mode: string;
          name: string;
          received: number;
          size: number;
          state: string;
        }>(link);

        const { received, size } = response.data;

        if (size === 0 || (received * 100) / size === 100) {
          setProgress(100);
          clearInterval(interval); // Zaustavite interval
        } else {
          setProgress((received * 100) / size);
        }

        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    //Ponavlja svake 2 sekunde
    const interval = setInterval(() => {
      getProgress();
    }, 2000);

    // Očistite interval kada se komponenta unmount-uje
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles["single-video-container"]}>
      <div className={styles["video-thumbnail-container"]}>
        <Spinner />
      </div>
      <div className={styles["video-details-container"]}>
        <h1>Video uploading...</h1>
        <div className={styles["progress-bar-container"]}>
          <CircularWithValueLabel value={progress} />
        </div>
      </div>
    </div>
  );
};

export default UploadingVideo;
