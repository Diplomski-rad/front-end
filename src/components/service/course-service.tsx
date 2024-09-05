import axios from "axios";
import { enviroment } from "../../env/enviroment";
import axiosWithBearer from "../../infrastructure/auth/jwt/jwt.interceptor";
import Category from "../model/Category";
import Course from "../model/Course";
import CreateCourseModel from "../model/createCourseModel";
import PublishCourseRequest from "../model/PublishCourseRequest";
import Rating from "../model/Rating";
import Video from "../model/Video";

export const addCourse = async (model: CreateCourseModel): Promise<number> => {
  try {
    const response = await axiosWithBearer.post<number>(
      enviroment.apiHost + "/api/course/create",
      model
    );
    return response.data;
  } catch (error) {
    console.error("Error creating course", error);
    throw error;
  }
};

export const getCoursesByAuthor = async (
  authorId: number
): Promise<Course[]> => {
  try {
    const response = await axiosWithBearer.get<Course[]>(
      `${enviroment.apiHost}/api/course/author/${authorId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getPublishedCourses = async (): Promise<Course[]> => {
  try {
    const response = await axiosWithBearer.get<Course[]>(
      `${enviroment.apiHost}/api/course/published`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const searchCourses = async (query: string): Promise<Course[]> => {
  try {
    const response = await axiosWithBearer.get<Course[]>(
      `${enviroment.apiHost}/api/course/search`,
      { params: { query } }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching searched courses:", error);
    throw error;
  }
};

export const filterCourses = async (filter: {
  DifficultyLevel: string;
  Categories: Category[];
}): Promise<Course[]> => {
  try {
    const response = await axiosWithBearer.post<Course[]>(
      `${enviroment.apiHost}/api/course/filter`,
      filter
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching searched courses:", error);
    throw error;
  }
};

export const getPurchasedCourses = async (
  userId: number
): Promise<Course[]> => {
  try {
    const response = await axiosWithBearer.get<Course[]>(
      `${enviroment.apiHost}/api/course/purchased/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getSinglePurchasedCourse = async (
  courseId: number
): Promise<Course> => {
  try {
    const response = await axiosWithBearer.get<Course>(
      `${enviroment.apiHost}/api/course/single-purchased/${courseId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getCourseVideos = async (courseId: number): Promise<Video[]> => {
  try {
    const response = await axiosWithBearer.get<Video[]>(
      `${enviroment.apiHost}/api/course/videos/${courseId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const addVideoToCourse = async (formData: FormData): Promise<Course> => {
  try {
    const response = await axiosWithBearer.post<Course>(
      `${enviroment.apiHost}/api/course/addvideo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding video", error);
    throw error;
  }
};

export const publishCourse = async (
  courseId: number,
  request: PublishCourseRequest
): Promise<string> => {
  try {
    const response = await axiosWithBearer.put<string>(
      `${enviroment.apiHost}/api/course/${courseId}/publish`,
      request
    );
    return response.data;
  } catch (error) {
    console.error("Error adding video", error);
    throw error;
  }
};

export const addRating = async (rating: {
  courseId: number;
  ratingValue: number;
}): Promise<void> => {
  try {
    const response = await axiosWithBearer.post<void>(
      `${enviroment.apiHost}/api/rating`,
      rating
    );
    return response.data;
  } catch (error) {
    console.error("Error adding video", error);
    throw error;
  }
};

export const getUserCourseRating = async (
  courseId: number
): Promise<Rating> => {
  try {
    const response = await axiosWithBearer.get<Rating>(
      `${enviroment.apiHost}/api/rating`,
      {
        params: {
          courseId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching rating:", error);
    throw error;
  }
};
