import React from "react";
import styles from "./video_player.module.css";
import DailymotionPlayer from "../dailymotion-player/dailymotion-player";
import { useLocation, useNavigate } from "react-router-dom";
import Video from "../model/Video";
import backImage from "../../assets/back.png";

const VideoPlayer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { video, courseId } = location.state as {
    video: Video;
    courseId: number;
  };

  const handleBackClick = () => {
    navigate("/course-details", { state: { courseId } });
  };

  return (
    <div className={styles["video-container"]}>
      <div>
        <button className={styles.back} onClick={handleBackClick}>
          <img src={backImage} alt="Back" width={20} height={20} />
          Back to course
        </button>
      </div>
      {video ? (
        <div className={styles["video-container"]}>
          <div className={styles["title-container"]}>
            <h1>{video.title}</h1>
          </div>
          <DailymotionPlayer videoId={video.id} />
        </div>
      ) : (
        <div className={styles["error-container"]}>
          Sorry, an unexpected error occurred, please try again later.
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
