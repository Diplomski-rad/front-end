import React, { useState } from "react";
import "./add-video.css";
import { jwtDecode } from "jwt-decode";
import { addVideoToCourse } from "../../../service/course-service";
import { useLocation, useNavigate } from "react-router-dom";
import Course from "../../../model/Course";
import Spinner from "../../../shared/Spinner/spinner";

const AddVideo: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { course } = location.state as { course: Course };

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Errors
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descError, setDescError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  let decodedToken: any = null;
  if (token) {
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {}
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVideoFile(event.target.files[0]);
    }
  };

  const clearErrors = () => {
    setTitleError(null);
    setDescError(null);
    setFileError(null);
  };

  const validateForm = (): boolean => {
    clearErrors();
    if (title === null || title === "") {
      setTitleError("*Title is required");
      return false;
    } else if (description === null || description === "") {
      setDescError("*Description is required");
      return false;
    } else if (!videoFile) {
      setFileError("*Video file is required");
      return false;
    }
    return true;
  };

  const handleUploadClick = async () => {
    if (validateForm()) {
      if (videoFile) {
        setIsLoading(true);

        const formData = new FormData();
        formData.append("file", videoFile);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("authorId", decodedToken?.id.toString());
        formData.append("courseId", course.id.toString());

        try {
          const progressLink = await addVideoToCourse(formData);
          sessionStorage.setItem("progressLink", progressLink);
          const courseId = course.id;
          navigate("/course-details", { state: { courseId } });
        } catch (err: any) {
          console.log("An unexpected error occurred");
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <div className="course-form-container">
      <form>
        <h1>Enhance Your Course with Videos</h1>
        <div className="input-container">
          <div>Title</div>
          <input
            type="text"
            className="login-input"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {titleError && <div className="error-message">{titleError}</div>}
        </div>
        <div className="input-container">
          <div>Description</div>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          {descError && <div className="error-message">{descError}</div>}
        </div>
        <div className="input-container">
          <div>Video file</div>
          <input
            type="file"
            className="login-input"
            accept=".mp4, .x-m4v, .mkv"
            onChange={handleFileChange}
          />
          {fileError && <div className="error-message">{fileError}</div>}
        </div>
        <div className="button-container">
          <button
            type="button"
            className="login-button"
            onClick={handleUploadClick}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Upload Video"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVideo;
