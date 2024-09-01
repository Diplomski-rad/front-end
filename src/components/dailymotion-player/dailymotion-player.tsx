import React from "react";

interface DailymotionPlayerProps {
  videoId: string;
}

const DailymotionPlayer: React.FC<DailymotionPlayerProps> = ({ videoId }) => {
  return (
    <div className="dailymotion-player">
      <iframe
        title="Dailymotion Video Player"
        frameBorder="0"
        width="100%"
        height="800"
        src={`https://www.dailymotion.com/embed/video/${videoId}?enable_dm_logo=false`}
        allow="autoplay; fullscreen"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default DailymotionPlayer;
