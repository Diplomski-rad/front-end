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
      <div>
        <div className={styles["title-container"]}>
          <h1>{video.title}</h1>
        </div>
        <DailymotionPlayer videoId={video.id} />
      </div>
    </div>
  );
};

export default VideoPlayer;
