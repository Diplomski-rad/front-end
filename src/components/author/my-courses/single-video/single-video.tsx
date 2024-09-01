import React from "react";
import styles from "./single-video.module.css";
import videoThumbnailImage from "../../../../assets/video_thumbnail.jpg";
import Video from "../../../model/Video";
import { useNavigate } from "react-router-dom";

interface SingleVideoProps {
  video: Video;
}

const SingleVideo: React.FC<SingleVideoProps> = ({ video }) => {
  const navigate = useNavigate();

  const videoId = video.id;

  const handleVideoClick = () => {
    navigate("/video-player", { state: { videoId } });
  };

  return (
    <div
      className={styles["single-video-container"]}
      onClick={handleVideoClick}
    >
      <div className={styles["video-thumbnail-container"]}>
        <img src={videoThumbnailImage} alt="Video thumbnail" />
      </div>
      <div className={styles["video-details-container"]}>
        <h1>{video.title}</h1>
        <div>{video.description}</div>
      </div>
    </div>
  );
};

export default SingleVideo;
