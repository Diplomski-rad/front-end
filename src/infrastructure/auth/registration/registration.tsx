import React, { useState } from "react";
import "./registration.css";
import axiosWithBearer from "../jwt/jwt.interceptor";
import { enviroment } from "../../../env/enviroment";
import { useNavigate } from "react-router-dom";
import BasicUserRegistration from "../model/basicUserRegistration";

const Registration: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [surnameError, setSurnameError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [confirmationError, setConfirmationError] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const clearErrors = () => {
    setPasswordError(null);
    setUsernameError(null);
    setEmailError(null);
    setConfirmationError(null);
    setNameError(null);
    setSurnameError(null);
  };

  const validateEmail = (email: string) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUpClick = async () => {
    //Clear all old errors
    clearErrors();

    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      return;
    } else if (username === "" || username === null) {
      setUsernameError("Username is required");
      return;
    } else if (name === "" || name === null) {
      setNameError("First name is required");
      return;
    } else if (surname === "" || surname === null) {
      setSurnameError("Last name is required");
      return;
    } else if (password === "" || password === null || password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    } else if (password !== confirmedPassword) {
      setConfirmationError("The password confirmation does not match.");
      return;
    } else {
      try {
        const registration: BasicUserRegistration = {
          name: name,
          surname: surname,
          username: username,
          email: email,
          password: password,
        };

        const response = await axiosWithBearer.post(
          enviroment.apiHost + "/auth/basic-user-registration",
          registration
        );

        const token = response.data.token;

        localStorage.setItem("token", token);
        navigate("/");
      } catch (err: any) {
        if (err.response) {
          const status = err.response.status;
          console.log(err.response);
          const message = err.response.data || "An unexpected error occurred";

          switch (status) {
            case 400:
              setError(message);
              break;
            case 500:
              console.log(message);
              break;
            default:
              console.log(message);
          }
        } else {
          console.log("An unexpected error occurred");
        }
      }
    }
  };

  return (
    <div className="registration-container">
      <form className="registration-form">
        <h1 className="signup-header">Sign up</h1>
        <div className="input-container">
          <div>First name</div>
          <input
            type="text"
            className="login-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <div className="error-message">{nameError}</div>}
        </div>
        <div className="input-container">
          <div>Last name</div>
          <input
            type="text"
            className="login-input"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          {surnameError && <div className="error-message">{surnameError}</div>}
        </div>
        <div className="input-container">
          <div>Username</div>
          <input
            type="text"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && (
            <div className="error-message">{usernameError}</div>
          )}
        </div>
        <div className="input-container">
          <div>Email</div>
          <input
            type="text"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="error-message">{emailError}</div>}
        </div>
        <div className="input-container">
          <div>Password</div>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <div className="error-message">{passwordError}</div>
          )}
        </div>
        <div className="input-container">
          <div>Confirm password</div>
          <input
            type="password"
            className="login-input"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
          {confirmationError && (
            <div className="error-message">{confirmationError}</div>
          )}
        </div>
        <div className="button-container">
          <button
            type="button"
            className="login-button"
            onClick={handleSignUpClick}
          >
            Sign up
          </button>
          {error && <div className="error-message">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default Registration;
