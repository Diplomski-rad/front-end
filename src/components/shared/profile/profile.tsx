import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./profile.module.css";
import editImage from "../../../assets/edit.png";
import confirm from "../../../assets/check.png";
import discard from "../../../assets/crossed.png";
import { jwtDecode } from "jwt-decode";
import UserDto from "../../model/UserDto";
import {
  changeUserPassword,
  getCurrentAuthor,
  getCurrentBasicUser,
  updateUser,
} from "../../service/user.service";
import { makeToastNotification } from "../../service/toast.service";

const Profile: FC = () => {
  const token = localStorage.getItem("token");
  let decodedToken: any = null;
  if (token) {
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      console.error(error);
    }
  }

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  //   const [editedName, setEditedName] = useState("");
  //   const [editedSurame, setEditedSurame] = useState("");
  //   const [editedUsername, setEditedUserame] = useState("");

  const [user, setUser] = useState<UserDto | null>(null);

  const [nameEdit, setNameEdit] = useState<boolean>(false);
  const [surnameEdit, setSurnameEdit] = useState<boolean>(false);
  const [usernameEdit, setUsernameEdit] = useState<boolean>(false);

  const [changePassord, setChangePassword] = useState<boolean>(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const surnameInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);

  const discardName = () => {
    setNameEdit(false);
    setName(user?.name ?? "");
  };

  const discardSurname = () => {
    setSurnameEdit(false);
    setSurname(user?.surname ?? "");
  };
  const discardUsername = () => {
    setUsernameEdit(false);
    setUsername(user?.username ?? "");
  };

  const handleChangePasswordClick = () => setChangePassword(true);
  const handleDiscardChangePasswordClick = () => setChangePassword(false);

  const submitName = async () => {
    if (name !== "") {
      try {
        await updateUser({ name: name, surname: null, username: null });
        makeToastNotification("Name successfully changed", true);
        setNameEdit(false);
        setUser((prevUser) => (prevUser ? { ...prevUser, name: name } : null));
      } catch (error) {}
    } else {
      makeToastNotification("Error: Name cannot be empty", false);
    }
  };

  const submitSurname = async () => {
    if (surname !== "") {
      try {
        await updateUser({ name: null, surname: surname, username: null });
        makeToastNotification("Surname successfully changed", true);
        setSurnameEdit(false);
        setUser((prevUser) =>
          prevUser ? { ...prevUser, surname: surname } : null
        );
      } catch (error) {}
    } else makeToastNotification("Error: Surname cannot be empty", false);
  };

  const submitUsername = async () => {
    if (username !== "") {
      try {
        await updateUser({ name: null, surname: null, username: username });
        makeToastNotification("Username successfully changed", true);
        setUsernameEdit(false);
        setUser((prevUser) =>
          prevUser ? { ...prevUser, username: username } : null
        );
      } catch (error: any) {
        makeToastNotification(
          error.message || "Error updating username",
          false
        );
      }
    } else makeToastNotification("Error: Username cannot be empty", false);
  };

  const submitChangePassword = async () => {
    if (oldPassword === "")
      makeToastNotification("Old password is required.", false);
    else if (newPassword === "")
      makeToastNotification("New password is required.", false);
    else if (newPassword === confirmPassword) {
      try {
        await changeUserPassword({
          oldPassword: oldPassword,
          newPassword: newPassword,
        });
        makeToastNotification("Password changed successfully", true);
        setChangePassword(false);
      } catch (error: any) {
        makeToastNotification(
          error.message || "Error changing password",
          false
        );
      }
    } else {
      makeToastNotification(
        "The new password and the confirmation password do not match",
        false
      );
    }
  };

  useEffect(() => {
    const setCursorToEnd = () => {
      if (nameInputRef.current) {
        const { current } = nameInputRef;
        current.focus();
        current.setSelectionRange(current.value.length, current.value.length);
      }
      if (surnameInputRef.current) {
        const { current } = surnameInputRef;
        current.focus();
        current.setSelectionRange(current.value.length, current.value.length);
      }
      if (usernameInputRef.current) {
        const { current } = usernameInputRef;
        current.focus();
        current.setSelectionRange(current.value.length, current.value.length);
      }
    };

    if (nameEdit || surnameEdit || usernameEdit) {
      setCursorToEnd();
    }
  }, [nameEdit, surnameEdit, usernameEdit]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (decodedToken.role === "Author") {
          const user = await getCurrentAuthor();
          setUser(user);
          setName(user.name);
          setUsername(user.username);
          setSurname(user.surname);
        } else if (decodedToken.role === "User") {
          const user = await getCurrentBasicUser();
          setUser(user);
          setName(user.name);
          setUsername(user.username);
          setSurname(user.surname);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [decodedToken.role]);

  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profile-layout"]}>
        <div className={styles["page-header"]}>Profile</div>
        <div>
          <div className={styles["data-row"]}>
            <div>Name: </div>
            <input
              ref={nameInputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles["data-input"]}
              disabled={!nameEdit}
            />
            {nameEdit ? (
              <div className={styles["confirm-reject"]}>
                <div className={styles.confirm} onClick={submitName}>
                  <img src={confirm} alt="confirm" height={15} width={15} />
                </div>
                <div className={styles.discard} onClick={discardName}>
                  <img src={discard} alt="discard" height={15} width={15} />
                </div>
              </div>
            ) : (
              <div
                className={styles["edit-icon"]}
                onClick={() => setNameEdit(true)}
              >
                <img src={editImage} alt="edit" height={20} width={20} />
              </div>
            )}
          </div>
          <div className={styles["data-row"]}>
            <div>Surname: </div>
            <input
              ref={surnameInputRef}
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className={styles["data-input"]}
              disabled={!surnameEdit}
            />
            {surnameEdit ? (
              <div className={styles["confirm-reject"]}>
                <div className={styles.confirm} onClick={submitSurname}>
                  <img src={confirm} alt="confirm" height={15} width={15} />
                </div>
                <div className={styles.discard} onClick={discardSurname}>
                  <img src={discard} alt="discard" height={15} width={15} />
                </div>
              </div>
            ) : (
              <div
                className={styles["edit-icon"]}
                onClick={() => setSurnameEdit(true)}
              >
                <img src={editImage} alt="edit" height={20} width={20} />
              </div>
            )}
          </div>
          <div className={styles["data-row"]}>
            <div>Username: </div>
            <input
              ref={usernameInputRef}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles["data-input"]}
              disabled={!usernameEdit}
            />
            {usernameEdit ? (
              <div className={styles["confirm-reject"]}>
                <div className={styles.confirm} onClick={submitUsername}>
                  <img src={confirm} alt="confirm" height={15} width={15} />
                </div>
                <div className={styles.discard} onClick={discardUsername}>
                  <img src={discard} alt="discard" height={15} width={15} />
                </div>
              </div>
            ) : (
              <div
                className={styles["edit-icon"]}
                onClick={() => setUsernameEdit(true)}
              >
                <img src={editImage} alt="edit" height={20} width={20} />
              </div>
            )}
          </div>
          <div className={styles["data-row"]}>
            <div>Email: </div>
            <input
              type="email"
              value={user?.email ?? ""}
              className={styles["data-input"]}
              disabled
            />
          </div>

          {decodedToken.role === "Author" && (
            <div className={styles["data-row"]}>
              <div>PayPal account: </div>
              <input
                type="email"
                value={user?.payPalEmail ?? ""}
                className={styles["data-input"]}
                disabled
              />
            </div>
          )}

          {changePassord ? (
            <div className={styles["change-password-form"]}>
              <label>Old password:</label>
              <input
                type="password"
                className={styles["data-input"]}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <label>New password:</label>
              <input
                type="password"
                className={styles["data-input"]}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label>Confirm new password:</label>
              <input
                type="password"
                className={styles["data-input"]}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className={styles["button-container"]}>
                <button
                  className={styles["save-btn"]}
                  onClick={submitChangePassword}
                >
                  Submit
                </button>
                <button
                  className={styles["discard-btn"]}
                  onClick={handleDiscardChangePasswordClick}
                >
                  Discard
                </button>
              </div>
            </div>
          ) : (
            <button
              className={styles["change-password-button"]}
              onClick={handleChangePasswordClick}
            >
              Change Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
