import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./course-details.css";
import SingleVideo from "../single-video/single-video";
import { getCourseVideos } from "../../../service/course-service";
import Video from "../../../model/Video";
import Course from "../../../model/Course";

const CourseDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state as { course: Course };

  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const courseVideos = await getCourseVideos(course.id);
        setVideos(courseVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, [course.id]);

  const handleAddVideoClick = () => {
    navigate("/add-video", { state: { course } });
  };

  const courseId = course.id;

  const handlePublishClick = () => {
    navigate("/publish-course", { state: { courseId } });
  };

  return (
    <div className="course-details-container">
      <h1 className="course-header">{course.name}</h1>
      <div className="course-description">{course.description}</div>
      <div className="buttons-container">
        <div className="add-video-to-course" onClick={handleAddVideoClick}>
          +Add video to course
        </div>
        {course.status === "DRAFT" && course.videos.length > 0 && (
          <div className="add-video-to-course" onClick={handlePublishClick}>
            Publish a course
          </div>
        )}
      </div>

      <div className="course-videos">
        {videos.length === 0 ? (
          <div className="no-videos-yet">
            No videos yet. Add videos to enrich the course!
          </div>
        ) : (
          videos.map((video) => <SingleVideo key={video.id} video={video} />)
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
