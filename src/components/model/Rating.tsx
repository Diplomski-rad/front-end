interface Rating {
  userId: number;
  courseId: number;
  ratingValue: number;
  review: string | null;
}

export default Rating;
