import React, { useEffect, useState } from "react";
import styles from "./publish-course.module.css";
import { publishCourse } from "../../../../service/course-service";
import { useLocation, useNavigate } from "react-router-dom";
import { Flip, toast } from "react-toastify";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getCategoryGroups } from "../../../../service/category.service";
import Category from "../../../../model/Category";

interface OptionType {
  id: number;
  name: string;
  group: string;
}

enum DifficultyLevel {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
}

const PublishCourse: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | "">("");
  const [groupedOptions, setGroupedOptions] = useState<{
    [key: string]: OptionType[];
  }>({});

  const [price, setPrice] = useState<number>();
  const location = useLocation();
  const navigate = useNavigate();

  const courseId = location.state?.courseId;

  const validateForm = () => {
    return (
      price !== undefined &&
      price > 0 &&
      selectedOptions.length > 2 &&
      selectedOptions.length < 6 &&
      selectedLevel
    );
  };

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: OptionType[]
  ) => {
    setSelectedOptions(newValue);
  };

  const handleLevelChange = (event: SelectChangeEvent<DifficultyLevel>) => {
    setSelectedLevel(event.target.value as DifficultyLevel);
  };

  const handlePublishClick = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm() && price !== undefined && courseId) {
      try {
        const categories: Category[] = selectedOptions.map((option) => ({
          id: option.id,
          name: option.name,
        }));

        publishCourse(courseId, {
          price: price,
          categories: categories,
          difficultyLevel: selectedLevel,
        });

        toast.success("The course has been published successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
        navigate("/my-courses-dashboard");
      } catch (error) {
        toast.error("An error occurred while publishing the course", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
      }
    }
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
    <div className={styles["main-container"]}>
      <form className={styles.form}>
        <Box sx={{ width: "100%" }}>
          <div className={styles["input-label"]}>
            Choose at least 3 and at most 5 categories that best describe your
            course:
          </div>
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
          <div className={styles["input-label"]}>
            Choose the difficulty of the course based on the following:
          </div>
          <div className={styles["difficuty-level"]}>
            <b>Beginner</b> - No prerequisites are needed; even someone
            completely new to the skill can master this course.
          </div>
          <div className={styles["difficuty-level"]}>
            <b>Intermediate</b> - This course expands on basic knowledge. Some
            prior experience is helpful but not required.
          </div>
          <div className={styles["difficuty-level"]}>
            <b>Advanced</b> - This course is for those with significant
            experience in the skill. Advanced knowledge is expected.
          </div>

          <FormControl fullWidth sx={{ mt: 2, margin: 0 }}>
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

        <div className={styles["input-container"]}>
          <div className={styles["input-label"]}>Add price for course: </div>
          <input
            type="number"
            className="login-input"
            placeholder="Price ($)"
            value={price !== undefined ? price : ""}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setPrice(isNaN(value) ? undefined : value);
            }}
          />
        </div>

        <button
          type="submit"
          className={styles["publish-btn"]}
          onClick={handlePublishClick}
        >
          Publish course
        </button>
      </form>
    </div>
  );
};

export default PublishCourse;
