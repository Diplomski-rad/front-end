import React, { useEffect, useState } from "react";
import styles from "./purchased-course-overview.module.css";
import { useLocation } from "react-router-dom";
import Video from "../../../model/Video";
import { getSinglePurchasedCourse } from "../../../service/course-service";
import PurchasedCourseVideo from "./purchased-course-video/purchased-course-video";
import Course from "../../../model/Course";
import rateIcon from "../../../../assets/rating.png";
import Rate from "./rate/rate";
import { enviroment } from "../../../../env/enviroment";
import default_image from "../../../../assets/default.jpg";

const PurchasedCourseOverview: React.FC = () => {
  const location = useLocation();
  const { courseId } = location.state as { courseId: number };

  const [course, setCourse] = useState<Course>();

  const [videos, setVideos] = useState<Video[]>([]);

  const [rateVisibility, setRateVisibility] = useState<boolean>(false);

  const closeRateDialog = () => setRateVisibility(false);

  const handleRateBtnClick = () => {
    setRateVisibility(true);
  };

  const emptyCourse: Course = {
    id: 0,
    name: "",
    description: "",
    author: { name: "", surname: "", username: "" },
    videos: [],
    price: 0,
    status: "default",
    categories: [],
    difficultyLevel: "",
    rating: { averageRating: 0, totalRatings: 0, ratingBreakdown: {} },
    thumbnail: null,
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const course = await getSinglePurchasedCourse(courseId);
        if (course) {
          setCourse(course);
          setVideos(course.videos);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchCourse();
  }, [courseId]);
  return (
    <div className={styles["course-details-container"]}>
      <div className={styles["course-header"]}>
        <div className={styles.image}>
          <img
            src={
              course?.thumbnail
                ? `${enviroment.apiHost}/images/${course.thumbnail}`
                : default_image
            }
            alt="thumbnail"
          />
        </div>
        <div className={styles.title}>
          <h1>{course?.name}</h1>
          <div className={styles.author}>
            <h2>
              Author: {course?.author.name} {course?.author.surname}
            </h2>
          </div>
        </div>
      </div>
      <div className={styles["course-description"]}>{course?.description}</div>
      <div className={styles["rate-course"]}>
        <button onClick={handleRateBtnClick}>
          <img src={rateIcon} alt="Rate icon" className={styles.icon} />
          Rate course
        </button>
      </div>
      <div className={styles["course-videos"]}>
        {videos.map((video) => (
          <PurchasedCourseVideo key={video.id} video={video} />
        ))}
      </div>
      {rateVisibility && (
        <Rate onClose={closeRateDialog} course={course || emptyCourse} />
      )}
    </div>
  );
};

export default PurchasedCourseOverview;
