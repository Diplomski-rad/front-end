import React, { useEffect, useState } from "react";
import "./my-courses-dashboard.css";
import SingleCourse from "../single-course/single-course";
import { useLocation, useNavigate } from "react-router-dom";
import Course from "../../../model/Course";
import { getCoursesByAuthor } from "../../../service/course-service";
import { jwtDecode } from "jwt-decode";

const MyCoursesDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); //location in useEffect ensure reload after commming back from another page

  const [courses, setCourses] = useState<Course[]>([]);

  const token = localStorage.getItem("token");

  let decodedToken: any = null;

  if (token) {
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {}
  }
  const authorId = decodedToken?.id;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const authorCourses = await getCoursesByAuthor(authorId);
        setCourses(authorCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [authorId, location.key]);

  const handleNewCourseClick = () => {
    navigate("/course-form");
  };

  return (
    <div className="my-courses-dashboard-container">
      <h1 className="header-container">My courses</h1>
      <div className="button-container">
        <button onClick={handleNewCourseClick}>+ New course</button>
      </div>
      <div className="my-dashboard">
        {courses.length === 0 ? (
          <div className="no-course-yet">
            It looks like you haven't created any courses yet. Start sharing
            your knowledge by creating your first course!
          </div>
        ) : (
          courses.map((course) => (
            <SingleCourse key={course.id} course={course} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyCoursesDashboard;
