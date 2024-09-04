import Category from "./Category";

interface CategoryGroup {
  id: number;
  name: string;
  categories: Category[];
}

export default CategoryGroup;
