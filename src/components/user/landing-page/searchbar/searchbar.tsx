import React, { useState } from "react";
import styles from "./searchbar.module.css";

interface SearchbarProps {
  setSearchQuery: (query: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ setSearchQuery }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const isEmptyOrWhitespace = (str: string): boolean => {
    return !str.trim();
  };

  const handleSearch = async () => {
    if (!isEmptyOrWhitespace(query)) {
      setSearchQuery(query);
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
