import React, { useState } from "react";
import "./course-form.css";
import CreateCourseModel from "../../../model/createCourseModel";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { addCourse } from "../../../service/course-service";
import { Flip, toast } from "react-toastify";

const CourseForm: React.FC = () => {
  const navigate = useNavigate();

  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const token = localStorage.getItem("token");

  let decodedToken: any = null;

  if (token) {
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {}
  }

  const handleCreateClick = async () => {
    try {
      const model: CreateCourseModel = {
        name: courseName,
        description: courseDescription,
        authorId: decodedToken?.id,
      };
      addCourse(model);

      toast.success(
        "Course created successfully! Please complete all sections to be able to publish it.",
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        }
      );

      navigate("/my-courses-dashboard");
    } catch (err: any) {
      console.log("An error occurred while creating course");
    }
  };

  return (
    <div className="course-form-container">
      <form>
        <h1>Bring Your Course to Life</h1>
        <div className="input-container">
          <div>Name of course</div>
          <input
            type="text"
            className="login-input"
            value={courseName}
            onChange={(e) => {
              setCourseName(e.target.value);
            }}
          />
        </div>
        <div className="input-container">
          <div>Description</div>
          <textarea
            value={courseDescription}
            onChange={(e) => {
              setCourseDescription(e.target.value);
            }}
          />
        </div>
        <div className="button-container">
          <button
            type="button"
            className="login-button"
            onClick={handleCreateClick}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
