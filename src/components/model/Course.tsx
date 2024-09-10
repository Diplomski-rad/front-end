import Author from "./Author";
import Category from "./Category";
import CourseRatings from "./CourseRatings";
import Video from "./Video";

interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  status: string;
  author: Author;
  videos: Video[];
  categories: Category[];
  rating: CourseRatings;
  difficultyLevel: string;
  thumbnail: string | null;
}

export default Course;
