import React, { useEffect, useState } from "react";
import styles from "./purchased-course-overview.module.css";
import { useLocation } from "react-router-dom";
import Video from "../../../model/Video";
import { getSinglePurchasedCourse } from "../../../service/course-service";
import PurchasedCourseVideo from "./purchased-course-video/purchased-course-video";
import Course from "../../../model/Course";

const PurchasedCourseOverview: React.FC = () => {
  const location = useLocation();
  const { courseId } = location.state as { courseId: number };

  const [course, setCourse] = useState<Course>();

  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const course = await getSinglePurchasedCourse(courseId);
        setCourse(course);
        setVideos(course.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchCourse();
  }, [courseId]);
  return (
    <div className={styles["course-details-container"]}>
      <h1 className={styles["course-header"]}>{course?.name}</h1>
      <div className={styles["course-description"]}>{course?.description}</div>
      <div className={styles["course-videos"]}>
        {videos.map((video) => (
          <PurchasedCourseVideo key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default PurchasedCourseOverview;
