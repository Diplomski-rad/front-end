import React, { useState } from "react";
import "./video-uploader.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VideoUploader: React.FC = () => {
  const navigate = useNavigate();

  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVideoFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (videoFile) {
      const formData = new FormData();
      formData.append("video", videoFile);

      try {
        await axios.post("http://localhost:5217/api/videos/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        navigate("/");
      } catch (error) {
        console.error("Error uploading video: ", error);
        alert("Error uploading video");
      }
    } else {
      alert("Please select video file first");
    }
  };

  return (
    <div className="uploader-container">
      <form className="uploading-form">
        <input type="text" />
        <input type="file" accept=".mp4, .mkv" onChange={handleFileChange} />
        <button type="button" className="upload-button" onClick={handleUpload}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default VideoUploader;
