import React, { useState } from "react";
import "./course-form.css";
import CreateCourseModel from "../../../model/createCourseModel";
import { jwtDecode } from "jwt-decode";
import axiosWithBearer from "../../../../infrastructure/auth/jwt/jwt.interceptor";
import { enviroment } from "../../../../env/enviroment";
import { useNavigate } from "react-router-dom";

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
      const response = await axiosWithBearer.post(
        enviroment.apiHost + "/api/course/create",
        model
      );
      navigate("/my-courses-dashboard");
    } catch (err: any) {
      console.log("An unexpected error occurred");
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
