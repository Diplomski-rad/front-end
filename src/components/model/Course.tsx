import Author from "./Author";
import Category from "./Category";
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
}

export default Course;
