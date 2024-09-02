import React from "react";
import "./video_player.css";
import DailymotionPlayer from "../dailymotion-player/dailymotion-player";
import { useLocation } from "react-router-dom";

const VideoPlayer: React.FC = () => {
  const location = useLocation();
  const { videoId } = location.state as { videoId: string };

  console.log(videoId);

  return (
    <div className="video-container">
      <div>
        <DailymotionPlayer videoId={videoId} />
      </div>
    </div>
  );
};

export default VideoPlayer;
