interface CourseRatings {
  averageRating: number;
  totalRatings: number;
  ratingBreakdown: Record<number, number>;
}

export default CourseRatings;
