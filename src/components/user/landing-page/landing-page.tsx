import React, { useEffect, useState } from "react";
import styles from "./landing-page.module.css";
import Searchbar from "./searchbar/searchbar";
import LandingCourse from "./landing-course/landing-course";
import Course from "../../model/Course";
import { getPublishedCourses } from "../../service/course-service";

const LandingPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const authorCourses = await getPublishedCourses();
        setCourses(authorCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className={styles.landingPageContainer}>
      <Searchbar />
      <div className={styles.courses}>
        {courses.map((course) => (
          <LandingCourse key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
