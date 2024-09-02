import React, { useState } from "react";
import styles from "./searchbar.module.css";
import { searchCourses } from "../../../service/course-service";
import Course from "../../../model/Course";

interface SearchbarProps {
  setSearchResult: (courses: Course[]) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ setSearchResult }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const isEmptyOrWhitespace = (str: string): boolean => {
    return !str.trim();
  };

  const handleSearch = async () => {
    if (!isEmptyOrWhitespace(query)) {
      try {
        const courses = await searchCourses(query);
        setSearchResult(courses);
      } catch (error) {
        console.error("Error searching courses:", error);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className={styles.searchInput}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch} className={styles.searchButton}>
        Search
      </button>
    </div>
  );
};

export default Searchbar;
