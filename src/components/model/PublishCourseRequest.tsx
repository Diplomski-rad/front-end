import Category from "./Category";

interface PublishCourseRequest {
  price: number;
  categories: Category[];
  difficultyLevel: string;
}

export default PublishCourseRequest;
