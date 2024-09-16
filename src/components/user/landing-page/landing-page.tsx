import React, { useEffect, useState } from "react";
import styles from "./landing-page.module.css";
import Searchbar from "./searchbar/searchbar";
import LandingCourse from "./landing-course/landing-course";
import Course from "../../model/Course";
import {
  getPublishedCourses,
  searchCourses,
} from "../../service/course-service";
import Filter from "./filter/filter";

const LandingPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

  const search = async (query: string) => {
    try {
      const courses = await searchCourses(query);
      setCourses(courses);
    } catch (error) {
      console.error("Error searching courses:", error);
    }
  };

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

  const openFilter = () => setIsFilterVisible(true);
  const closeFilter = () => setIsFilterVisible(false);

  return (
    <div className={styles.landingPageContainer}>
      <div className={styles["search-container"]}>
        <Searchbar setSearchQuery={search} />
        <div className={styles["filter-container"]}>
          <div className={styles.filter} onClick={openFilter}>
            Filter
          </div>
        </div>
      </div>

      <div className={styles.courses}>
        {courses.map((course) => (
          <LandingCourse key={course.id} course={course} />
        ))}
      </div>
      {isFilterVisible && (
        <Filter onClose={closeFilter} setFilterResult={setCourses} />
      )}
    </div>
  );
};

export default LandingPage;
