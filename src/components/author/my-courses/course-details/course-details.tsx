import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./course-details.module.css";
import SingleVideo from "../single-video/single-video";
import {
  addThumbnailForCourse,
  getAuthorCourse,
  getCourseVideos,
  updateNameAndDescription,
} from "../../../service/course-service";
import Course from "../../../model/Course";
import { makeToastNotification } from "../../../service/toast.service";
import default_thumbnail from "../../../../assets/default.jpg";
import { enviroment } from "../../../../env/enviroment";
import UploadingVideo from "./uploading-video/uploading-video";
import Video from "../../../model/Video";
import * as signalR from "@microsoft/signalr";

const CourseDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId } = location.state as {
    courseId: number;
  };

  const [videos, setVideos] = useState<Video[]>([]);
  const [progLink, setProgLink] = useState<string | null>(null);

  const [course, setCourse] = useState<Course | null>(null);

  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [editDesc, setEditDesc] = useState<boolean>(false);
  const [editName, setEditName] = useState<boolean>(false);

  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const nameTextareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editDescriptionContent, setEditDescriptionContent] =
    useState<string>();

  const [editNameContent, setEditNameContent] = useState<string>();

  const toggleDesc = () => {
    setEditDesc(!editDesc);
  };

  const toggleName = () => {
    setEditName(!editName);
  };

  const fetchVideos = async () => {
    try {
      if (!courseId) {
        navigate("/error");
      }
      const videos = await getCourseVideos(courseId);
      setVideos(videos);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (!courseId) {
          navigate("/error");
        }
        const course = await getAuthorCourse(courseId);
        setCourse(course);
        setIsEditable(course.status === "DRAFT");
        setEditDescriptionContent(course.description);
        setEditNameContent(course.name);
      } catch (error) {}
    };
    setProgLink(sessionStorage.getItem("progressLink"));
    fetchCourse();
    fetchVideos();
  }, []);

  useEffect(() => {
    const setCursorToEnd = () => {
      if (descriptionTextareaRef.current) {
        const { current } = descriptionTextareaRef;
        current.focus();
        current.setSelectionRange(current.value.length, current.value.length);
      }
      if (nameTextareaRef.current) {
        const { current } = nameTextareaRef;
        current.focus();
        current.setSelectionRange(current.value.length, current.value.length);
      }
    };

    if (editDesc || editName) {
      setCursorToEnd();
    }
  }, [editDesc, editName]);

  // -----------------------------------Websocket------------------------------------------//
  useEffect(() => {
    // Nova SignalR konekcija

    const token = localStorage.getItem("token");

    if (token) {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5217/courseHub")
        .withAutomaticReconnect()
        .build();

      // Pokretanje konekcije
      connection
        .start()
        .then(() => {
          console.log("Connected to SignalR hub");

          // Slušajte događaj "CourseUpdated" koji šalje backend
          connection.on("CourseUpdated", (updatedCourseId) => {
            if (updatedCourseId === courseId) {
              setProgLink(null);
              sessionStorage.removeItem("progressLink");
              fetchVideos();
            }
          });

          // connection.on("VideoPublished", (videoId) => {
          //   fetchVideos;
          // });
        })
        .catch((err) =>
          console.error("Error while establishing connection: ", err)
        );

      // Očistite konekciju kada se komponenta unmount-uje
      return () => {
        connection.stop();
      };
    }
  }, []);

  //----------------------------------------------------------------------------------//

  const handleAddVideoClick = () => {
    navigate("/add-video", { state: { course } });
  };

  const handlePublishClick = () => {
    navigate("/publish-course", { state: { courseId } });
  };

  const saveDescription = async () => {
    setEditDesc(false);
    if (editDescriptionContent && editNameContent) {
      try {
        await updateNameAndDescription(courseId, {
          name: editNameContent,
          description: editDescriptionContent,
        });

        const updatedCourse = await getAuthorCourse(courseId);
        setCourse(updatedCourse);

        makeToastNotification("Description successfully changed", true);
      } catch (err) {
        makeToastNotification("Error while editing description", false);
      }
    } else {
      makeToastNotification("The description cannot be empty", false);
    }
  };

  const saveName = async () => {
    setEditName(false);
    if (editNameContent && editDescriptionContent) {
      try {
        await updateNameAndDescription(courseId, {
          name: editNameContent,
          description: editDescriptionContent,
        });

        const updatedCourse = await getAuthorCourse(courseId);
        setCourse(updatedCourse);

        makeToastNotification("Name successfully changed", true);
      } catch (err) {
        makeToastNotification("Error while editing course name", false);
      }
    } else {
      makeToastNotification("Name cannot be empty", false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      await addThumbnailForCourse(file, course?.id ?? 0);
      makeToastNotification("Course thumbnail successfully changed.", true);
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
    <div className={styles["course-details-container"]}>
      <div className={styles["top-container"]}>
        <div className={styles.image_container}>
          <img
            src={
              course?.thumbnail
                ? `${enviroment.apiHost}/images/${course.thumbnail}`
                : default_thumbnail
            }
            alt="thumbnail"
          />
        </div>
        <div className={styles["course-header-container"]}>
          {!editName ? (
            <h1 className={styles["course-header"]}>{course?.name}</h1>
          ) : (
            <textarea
              ref={nameTextareaRef}
              defaultValue={course?.name}
              rows={1}
              onChange={(e) => {
                setEditNameContent(e.target.value);
              }}
            />
          )}

          {isEditable && (
            <div>
              {editName ? (
                <button className={styles["edit-btn"]} onClick={saveName}>
                  Save
                </button>
              ) : (
                <button className={styles["edit-btn"]} onClick={toggleName}>
                  Edit
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles["course-description"]}>
        {!editDesc && course?.description}
        {editDesc && (
          <textarea
            ref={descriptionTextareaRef}
            defaultValue={course?.description}
            onChange={(e) => {
              setEditDescriptionContent(e.target.value);
              if (descriptionTextareaRef.current) {
                const textarea = descriptionTextareaRef.current;
                textarea.style.height = "auto"; // Reset height
                textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight
              }
            }}
          />
        )}

        {isEditable && (
          <div className={styles["edit-desc-btn-container"]}>
            {editDesc ? (
              <button className={styles["edit-btn"]} onClick={saveDescription}>
                Save
              </button>
            ) : (
              <button className={styles["edit-btn"]} onClick={toggleDesc}>
                Edit
              </button>
            )}
          </div>
        )}
      </div>
      <div className={styles["buttons-container"]}>
        <label htmlFor="file-upload" className={styles["change-thumbnail"]}>
          Change thumbnail
        </label>
        <input
          id="file-upload"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFileUpload(file);
            }
          }}
          className={styles["file-upload"]}
        />

        {course?.status === "PUBLISHED" && (
          <div className={styles["publish-archive-course"]}>Archive course</div>
        )}

        {course?.status === "DRAFT" && course.videos.length > 0 && (
          <div
            className={styles["publish-archive-course"]}
            onClick={handlePublishClick}
          >
            Publish a course
          </div>
        )}
      </div>

      <div className={styles["course-videos"]}>
        {isEditable && (
          <div
            className={styles["add-video-to-course"]}
            onClick={handleAddVideoClick}
          >
            +Add video to course
          </div>
        )}
        {progLink && <UploadingVideo link={progLink} />}
        {videos.length === 0 ? (
          <div className={styles["no-videos-yet"]}>
            <div>No videos yet. Add videos to enrich the course!</div>
            <div>Add at least one video so you can publish your course.</div>
          </div>
        ) : (
          videos.map((video) => (
            <SingleVideo key={video.id} video={video} courseId={courseId} />
          ))
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
