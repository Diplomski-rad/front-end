import React, { useEffect, useState } from "react";
import styles from "./user-managment.module.css";
import Searchbar from "../../user/landing-page/searchbar/searchbar";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import CustomPaginationActionsTable from "../../shared/table/table";
import { getAllUsers, searchUser } from "../../service/user.service";
import User from "../../model/User";

const UserManagment: React.FC = () => {
  const search = async (query: string) => {
    if (query !== "") {
      try {
        const users = await searchUser({ query: query, flag: radioValue });
        setUsers(users);
      } catch (error) {}
    }
  };

  const [users, setUsers] = useState<User[]>([]);

  const [radioValue, setRadioValue] = useState<string>("username");

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getAllUsers();
      const sortedUsers = fetchedUsers.sort((a, b) =>
        a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1
      );
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error while fetching users: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles["user-managment-container"]}>
      <h1>User managment</h1>
      <Searchbar setSearchQuery={search} />
      <div className={styles["radio-group-container"]}>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="username"
            name="radio-buttons-group"
            onChange={(e) => {
              setRadioValue(e.target.value);
              console.log(radioValue);
            }}
          >
            <FormControlLabel
              value="username"
              control={<Radio />}
              label="Username"
              sx={{ color: "white" }}
            />
            <FormControlLabel
              value="email"
              control={<Radio />}
              label="Email"
              sx={{ color: "white" }}
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className={styles["table-container"]}>
        <CustomPaginationActionsTable users={users} onBanUnban={fetchUsers} />
      </div>
    </div>
  );
};

export default UserManagment;
