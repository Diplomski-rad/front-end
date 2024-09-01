import Video from "./Video";

interface PurchasedCourseModel {
  id: number;
  name: string;
  description: string;
  price: number;
  author: PurchasedCourseAuthor;
  videos: Video[];
}

interface PurchasedCourseAuthor {
  name: string;
  surname: string;
  username: string;
}

export default PurchasedCourseModel;
