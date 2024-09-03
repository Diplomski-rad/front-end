import Author from "./Author";
import Video from "./Video";

interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  status: string;
  author: Author;
  videos: Video[];
}

export default Course;
