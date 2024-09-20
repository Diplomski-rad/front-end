import React, { useEffect, useState } from "react";
import styles from "./purchased-courses.module.css";
import { jwtDecode } from "jwt-decode";
import { getPurchasedCourses } from "../../service/course-service";
import PurchasedCourse from "./purchased-course/purchased-course";
import Course from "../../model/Course";

const PurchasedCourses: React.FC = () => {
  const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);

  const token = localStorage.getItem("token");

  let decodedToken: any = null;

  if (token) {
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {}
  }
  const userId = decodedToken?.id;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await getPurchasedCourses();
        setPurchasedCourses(courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [userId]);

  return (
    <div className={styles["main-container"]}>
      <h1 className={styles["page-header"]}>Purchased courses</h1>
      <div className={styles["courses-container"]}></div>
      {purchasedCourses.length === 0 ? (
        <div className={styles["no-video-yet"]}>
          You have no purchased courses.
        </div>
      ) : (
        purchasedCourses.map((course) => (
          <PurchasedCourse key={course.id} course={course} />
        ))
      )}
    </div>
  );
};

export default PurchasedCourses;
