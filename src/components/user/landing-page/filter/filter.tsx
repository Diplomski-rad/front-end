import React, { useEffect, useState } from "react";
import styles from "./filter.module.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { getCategoryGroups } from "../../../service/category.service";
import Category from "../../../model/Category";
import { filterCourses } from "../../../service/course-service";
import Course from "../../../model/Course";

interface OptionType {
  id: number;
  name: string;
  group: string;
}

interface FilterDto {
  DifficultyLevel: string;
  Categories: Category[];
}

enum DifficultyLevel {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
}

interface FilterProps {
  onClose: () => void;
  setFilterResult: (courses: Course[]) => void;
}

const Filter: React.FC<FilterProps> = ({ onClose, setFilterResult }) => {
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | "">("");
  const [groupedOptions, setGroupedOptions] = useState<{
    [key: string]: OptionType[];
  }>({});

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: OptionType[]
  ) => {
    setSelectedOptions(newValue);
  };

  const handleLevelChange = (event: SelectChangeEvent<DifficultyLevel>) => {
    setSelectedLevel(event.target.value as DifficultyLevel);
  };

  const createFilter = (): FilterDto => {
    const categories: Category[] = selectedOptions.map((option) => ({
      id: option.id,
      name: option.name,
    }));

    let filterDto: FilterDto = {
      DifficultyLevel: selectedLevel,
      Categories: categories,
    };

    return filterDto;
  };

  const handleApplyClick = async () => {
    const filter = createFilter();

    try {
      const courses = await filterCourses(filter);
      setFilterResult(courses);
    } catch (error) {
      console.error("Error filtering courses:", error);
    }
  };

  const handleRestart = async () => {
    setSelectedOptions([]);
    setSelectedLevel("");
  };

  useEffect(() => {
    const fetchCategoryGroups = async () => {
      try {
        const categoryGroups = await getCategoryGroups();

        const transformedOptions: { [key: string]: OptionType[] } =
          categoryGroups.reduce((acc, group) => {
            acc[group.name] = group.categories.map((category) => ({
              id: category.id,
              name: category.name,
              group: group.name,
            }));
            return acc;
          }, {} as { [key: string]: OptionType[] });

        setGroupedOptions(transformedOptions);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCategoryGroups();
  }, []);

  return (
    <div className={styles["filter-overlay"]} onClick={onClose}>
      <div
        className={styles["filter-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Filter Options</h2>

        <Box sx={{ width: 500 }}>
          <Autocomplete
            multiple
            options={Object.values(groupedOptions).flat()}
            groupBy={(option) => option.group}
            getOptionLabel={(option) => option.name}
            value={selectedOptions}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField {...params} label="Select Categories" />
            )}
            renderGroup={(params) => (
              <li key={params.key}>
                <div className={styles["group-header"]}>{params.group}</div>
                <ul className={styles["group-items"]}>{params.children}</ul>
              </li>
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option.name}
                  {...getTagProps({ index })}
                  sx={{ margin: 0.5, fontSize: "16px" }}
                  key={option.name}
                />
              ))
            }
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="difficulty-select-label">
              Difficulty Level
            </InputLabel>
            <Select
              labelId="difficulty-select-label"
              id="difficulty-select"
              value={selectedLevel}
              label="Difficulty Level"
              onChange={handleLevelChange}
            >
              <MenuItem value={DifficultyLevel.Beginner}>Beginner</MenuItem>
              <MenuItem value={DifficultyLevel.Intermediate}>
                Intermediate
              </MenuItem>
              <MenuItem value={DifficultyLevel.Advanced}>Advanced</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div>
          <button className={styles["apply-btn"]} onClick={handleApplyClick}>
            Apply filter
          </button>
        </div>
        <div>
          <button className={styles["restart-btn"]} onClick={handleRestart}>
            Restart filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
