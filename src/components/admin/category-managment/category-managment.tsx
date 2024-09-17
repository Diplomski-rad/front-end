import React, { FC, useEffect, useState } from "react";
import styles from "./category-managment.module.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  addCategoryGroup,
  addCategoryToCategoryGroup,
  getCategoryGroups,
} from "../../service/category.service";
import CategoryGroup from "../../model/CategoryGroup";
import { makeToastNotification } from "../../service/toast.service";

const CategoryManagment: React.FC = () => {
  const [categoryGroupId, setCategoryGroupId] = useState<number | "">("");
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);

  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryGroupName, setCategoryGroupName] = useState<string>("");

  const [categoryGroupNameError, setCategoryGroupNameError] =
    useState<boolean>(false);
  const [categoryNameError, setCategoryNameError] = useState<boolean>(false);
  const [selectCategoryGroupError, setSelectCategoryGroupError] =
    useState<boolean>(false);

  const fetchCategoryGroups = async () => {
    try {
      const fetchedGroups = await getCategoryGroups();
      setCategoryGroups(fetchedGroups);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCategoryGroups();
  }, []);

  const handleChange = (event: SelectChangeEvent<number>) => {
    setCategoryGroupId(event.target.value as number);
  };

  const validateAddCategory = (): boolean => {
    setSelectCategoryGroupError(false);
    setCategoryNameError(false);
    let flag = true;

    if (!categoryGroupId) {
      setSelectCategoryGroupError(true);
      flag = false;
    }
    if (!categoryName) {
      setCategoryNameError(true);
      flag = false;
    }
    return flag;
  };

  const validateAddCategoryGroup = (): boolean => {
    setCategoryGroupNameError(false);
    let flag = true;
    if (!categoryGroupName) {
      setCategoryGroupNameError(true);
      flag = false;
    }
    return flag;
  };

  const handleAddCategory = async () => {
    if (validateAddCategory() && typeof categoryGroupId === "number") {
      try {
        await addCategoryToCategoryGroup(categoryGroupId, {
          name: categoryName,
        });
        makeToastNotification("Category successfully added.", true);
        setCategoryName("");
        setCategoryGroupId("");
      } catch (error) {
        makeToastNotification(
          "An error occurred while adding a category.",
          false
        );
      }
    }
  };

  const handleAddCategoryGroup = async () => {
    if (validateAddCategoryGroup()) {
      try {
        await addCategoryGroup({ name: categoryGroupName });
        setCategoryGroupName("");
        fetchCategoryGroups();
        makeToastNotification("Category group successfully added.", true);
      } catch (error) {
        makeToastNotification(
          "An error occurred while adding a category group.",
          false
        );
      }
    }
  };

  return (
    <div className={styles["category-managment-container"]}>
      <h1>Category managment</h1>
      <div className={styles["forms-container"]}>
        <div className={styles.form}>
          <h1>Add category group</h1>
          <div className={styles["input-and-button"]}>
            <input
              type="text"
              placeholder="Category group"
              value={categoryGroupName}
              onChange={(e) => {
                setCategoryGroupName(e.target.value);
              }}
            />
            <button onClick={handleAddCategoryGroup}>Add</button>
          </div>
          {categoryGroupNameError && (
            <div className={styles["error-message"]}>
              *Required category group name
            </div>
          )}
        </div>
        <div className={styles.form}>
          <h1>Add category</h1>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Category group
              </InputLabel>
              <Select
                labelId="category-group-select-label"
                id="category-group-select"
                value={categoryGroupId}
                label="Category group"
                onChange={handleChange}
              >
                {categoryGroups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectCategoryGroupError && (
              <div className={styles["error-message"]}>
                *Required category group
              </div>
            )}
          </Box>
          <div className={styles["input-and-button"]}>
            <input
              type="text"
              placeholder="Category"
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
              }}
            />
            <button onClick={handleAddCategory}>Add</button>
          </div>
          {categoryNameError && (
            <div className={styles["error-message"]}>
              *Required category name
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManagment;
