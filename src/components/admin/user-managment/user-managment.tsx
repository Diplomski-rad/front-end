import React, { FC, useEffect, useState } from "react";
import styles from "./user-managment.module.css";
import Searchbar from "../../user/landing-page/searchbar/searchbar";

import CustomPaginationActionsTable from "../../shared/table/table";
import { getAllUsers } from "../../service/user.service";
import User from "../../model/User";

const UserManagment: React.FC = () => {
  const search = async (query: string) => {};

  const [users, setUsers] = useState<User[]>([]);

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
      <div className={styles["table-container"]}>
        <CustomPaginationActionsTable users={users} onBanUnban={fetchUsers} />
      </div>
    </div>
  );
};

export default UserManagment;
