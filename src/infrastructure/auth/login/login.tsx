import React, { useState } from "react";
import "./login.css";
import { enviroment } from "../../../env/enviroment";
import axiosWithBearer from "../jwt/jwt.interceptor";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLoginClick = async () => {
    try {
      const response = await axiosWithBearer.post(
        enviroment.apiHost + "/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;

      // dispatch(
      //   setUser({
      //     username: decodedToken.sub,
      //     email: decodedToken.email,
      //     role: decodedToken.role,
      //   })
      // );

      localStorage.setItem("token", token);
      navigate("/");
      console.log("Login successful");
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else if (err.request) {
        setError("No response from server");
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h1 className="signup-header">Log In</h1>
        <div className="input-container">
          <div>Email</div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
        </div>
        <div className="input-container">
          <div>Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </div>
        <div className="button-container">
          <button
            type="button"
            className="login-button"
            onClick={handleLoginClick}
          >
            Log In
          </button>
          {error && <div className="error-message">{error}</div>}
        </div>
      </form>
      <div className="signup-line">
        Don't have an account yet? <a href="/registration">Create one</a> now.
      </div>
    </div>
  );
};

export default Login;
