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
    console.error("Error fetching category groups:", error);
    throw error;
  }
};

export const addCategoryGroup = async (model: {
  name: string;
}): Promise<number> => {
  try {
    const response = await axiosWithBearer.post<number>(
      `${enviroment.apiHost}/api/category/category-group`,
      model
    );
    return response.data;
  } catch (error) {
    console.error("Error creating category group:", error);
    throw error;
  }
};

export const addCategoryToCategoryGroup = async (
  categoryGroupId: number,
  model: {
    name: string;
  }
): Promise<number> => {
  try {
    const response = await axiosWithBearer.put<number>(
      `${enviroment.apiHost}/api/category/category-group/${categoryGroupId}`,
      model
    );
    return response.data;
  } catch (error) {
    console.error("Error adding category to category group:", error);
    throw error;
  }
};
