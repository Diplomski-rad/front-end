import React from "react";
import styles from "./single-video.module.css";
import videoThumbnailImage from "../../../../assets/video_thumbnail.jpg";
import Video from "../../../model/Video";
import { useNavigate } from "react-router-dom";

interface SingleVideoProps {
  video: Video;
  courseId: number;
}

const SingleVideo: React.FC<SingleVideoProps> = ({ video, courseId }) => {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate("/video-player", { state: { video, courseId } });
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
