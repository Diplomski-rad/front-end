import React from "react";
import styles from "./purchased-course-video.module.css";
import video_default_image from "../../../../../assets/video_default.jpg";
import Video from "../../../../model/Video";
import { useNavigate } from "react-router-dom";
import { enviroment } from "../../../../../env/enviroment";

interface PurchasedCourseVideoProps {
  video: Video;
  courseId: number;
}

const PurchasedCourseVideo: React.FC<PurchasedCourseVideoProps> = ({
  video,
  courseId,
}) => {
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
        <img
          src={
            video.thumbnail
              ? `${enviroment.apiHost}/images/${video.thumbnail}`
              : video_default_image
          }
          alt="Video thumbnail"
        />
      </div>
      <div className={styles["video-details-container"]}>
        <h1>{video.title}</h1>
        <div>{video.description}</div>
      </div>
    </div>
  );
};

export default PurchasedCourseVideo;
