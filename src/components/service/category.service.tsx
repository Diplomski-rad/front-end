import { enviroment } from "../../env/enviroment";
import axiosWithBearer from "../../infrastructure/auth/jwt/jwt.interceptor";
import CategoryGroup from "../model/CategoryGroup";

export const getCategoryGroups = async (): Promise<CategoryGroup[]> => {
  try {
    const response = await axiosWithBearer.get<CategoryGroup[]>(
      `${enviroment.apiHost}/api/category/category-groups`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};
