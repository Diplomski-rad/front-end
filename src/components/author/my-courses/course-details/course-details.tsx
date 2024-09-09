import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./course-details.module.css";
import SingleVideo from "../single-video/single-video";
import {
  getAuthorCourse,
  updateNameAndDescription,
} from "../../../service/course-service";
import Course from "../../../model/Course";
import { Flip, toast } from "react-toastify";

const CourseDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId } = location.state as { courseId: number };

  const [course, setCourse] = useState<Course | null>(null);

  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [editDesc, setEditDesc] = useState<boolean>(false);
  const [editName, setEditName] = useState<boolean>(false);

  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);
  const nameTextareaRef = useRef<HTMLTextAreaElement>(null);

  const [editDescriptionContent, setEditDescriptionContent] =
    useState<string>();

  const [editNameContent, setEditNameContent] = useState<string>();

  const toggleDesc = () => {
    setEditDesc(!editDesc);
  };

  const toggleName = () => {
    setEditName(!editName);
  };

  const makeNotification = (content: string, success: boolean) => {
    if (success) {
      toast.success(content, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    } else {
      toast.error(content, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    }
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
    fetchCourse();
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

        makeNotification("Description successfully changed", true);
      } catch (err) {
        makeNotification("Error while editing description", false);
      }
    } else {
      makeNotification("The description cannot be empty", false);
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

        makeNotification("Name successfully changed", true);
      } catch (err) {
        makeNotification("Error while editing course name", false);
      }
    } else {
      makeNotification("Name cannot be empty", false);
    }
  };

  return (
    <div className={styles["course-details-container"]}>
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
        {isEditable && (
          <div
            className={styles["add-video-to-course"]}
            onClick={handleAddVideoClick}
          >
            +Add video to course
          </div>
        )}

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
        {course?.videos.length === 0 ? (
          <div className={styles["no-videos-yet"]}>
            <div>No videos yet. Add videos to enrich the course!</div>
            <div>Add at least one video so you can publish your course.</div>
          </div>
        ) : (
          course?.videos.map((video) => (
            <SingleVideo key={video.id} video={video} courseId={course.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
