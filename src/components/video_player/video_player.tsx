import React from "react";
import styles from "./video_player.module.css";
import DailymotionPlayer from "../dailymotion-player/dailymotion-player";
import { useLocation } from "react-router-dom";
import Video from "../model/Video";

const VideoPlayer: React.FC = () => {
  const location = useLocation();
  const { video } = location.state as { video: Video };

  return (
    <div className={styles["video-container"]}>
      {video ? (
        <div>
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
