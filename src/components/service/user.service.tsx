import { enviroment } from "../../env/enviroment";
import axiosWithBearer from "../../infrastructure/auth/jwt/jwt.interceptor";
import User from "../model/User";
import UserDto from "../model/UserDto";

export const updateUser = async (request: {
  name: string | null;
  surname: string | null;
  username: string | null;
}): Promise<string> => {
  try {
    const response = await axiosWithBearer.post<string>(
      enviroment.apiHost + "/api/user/update",
      request
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 400 && typeof data === "string") {
        throw new Error(data);
      } else if (status === 500) {
        throw new Error(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
    throw new Error("Failed to update user. Please check your connection.");
  }
};

export const getCurrentBasicUser = async (): Promise<UserDto> => {
  try {
    const response = await axiosWithBearer.get<UserDto>(
      enviroment.apiHost + "/api/user/basic-user"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const getCurrentAuthor = async (): Promise<UserDto> => {
  try {
    const response = await axiosWithBearer.get<UserDto>(
      enviroment.apiHost + "/api/user/author"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const changeUserPassword = async (request: {
  oldPassword: string;
  newPassword: string;
}): Promise<string> => {
  try {
    const response = await axiosWithBearer.post<string>(
      `${enviroment.apiHost}/auth/change-password`,
      request
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 400 && typeof data === "string") {
        throw new Error(data);
      } else if (status === 500) {
        throw new Error(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
    throw new Error("Failed to change password. Please check your connection.");
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosWithBearer.get<User[]>(
      `${enviroment.apiHost}/api/user/all`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const searchUser = async (model: {
  query: string;
  flag: string;
}): Promise<User[]> => {
  try {
    const response = await axiosWithBearer.post<User[]>(
      `${enviroment.apiHost}/api/user/search`,
      model
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const banUser = async (userId: number): Promise<number> => {
  try {
    const response = await axiosWithBearer.post<number>(
      `${enviroment.apiHost}/api/user/${userId}/ban`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const unbanUser = async (userId: number): Promise<number> => {
  try {
    const response = await axiosWithBearer.post<number>(
      `${enviroment.apiHost}/api/user/${userId}/unban`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};
