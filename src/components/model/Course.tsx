import Author from "./Author";

interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  status: number;
  author: Author;
  playlistId: string;
  videos: [];
}

export default Course;
