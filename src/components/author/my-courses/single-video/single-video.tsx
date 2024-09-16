import React, { useEffect, useRef, useState } from "react";
import styles from "./single-video.module.css";
import video_default_image from "../../../../assets/video_default.jpg";
import Video from "../../../model/Video";
import thumbnail_option from "../../../../assets/photo.png";
import { useNavigate } from "react-router-dom";
import { enviroment } from "../../../../env/enviroment";
import { addThumbnailForVideo } from "../../../service/course-service";
import { makeToastNotification } from "../../../service/toast.service";

interface SingleVideoProps {
  video: Video;
  courseId: number;
}

const SingleVideo: React.FC<SingleVideoProps> = ({ video, courseId }) => {
  const [currentVideo, setCurrentVideo] = useState(video);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVideoClick = () => {
    navigate("/video-player", { state: { currentVideo, courseId } });
  };

  const handleThumbnailUpload = async (file: File) => {
    try {
      const updatedVideo = await addThumbnailForVideo(
        file,
        courseId,
        currentVideo.id
      );
      setCurrentVideo(updatedVideo);
      makeToastNotification("Video thumbnail successfully changed.", true);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the file input
      }
    } catch (error) {
      makeToastNotification(
        "Ann error occured while changing thumbnail, please try again later.",
        false
      );
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the file input
      }
    }
  };

  return (
    <div
      className={styles["single-video-container"]}
      onClick={handleVideoClick}
    >
      <div className={styles["video-thumbnail-container"]}>
        <img
          src={
            currentVideo.thumbnail
              ? `${enviroment.apiHost}/images/${currentVideo.thumbnail}`
              : video_default_image
          }
          alt="Video thumbnail"
        />
      </div>
      <div className={styles["video-details-container"]}>
        {!currentVideo.isPublished && (
          <div className={styles.processing}>Proccessing...</div>
        )}
        <h1>{currentVideo.title}</h1>
        <div>{currentVideo.description}</div>
        <div
          className={styles["edit-options"]}
          onClick={(e) => e.stopPropagation()}
        >
          <label
            className={styles["edit-options-item"]}
            htmlFor="video-thumbnail-upload"
          >
            <img
              src={thumbnail_option}
              alt="thumbnail"
              height={20}
              width={20}
            />{" "}
            Change thumbnail
          </label>
          <input
            id="video-thumbnail-upload"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleThumbnailUpload(file);
              }
            }}
            className={styles["file-upload"]}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleVideo;
