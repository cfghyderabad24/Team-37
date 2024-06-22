import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import "./App.css";
import axios from "axios";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const onButtonClick = async () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 4) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/auth/login",
          {
            email,
            password,
          }
        );

        if (response.data.success) {
          // Save the token and user details as needed
          // Navigate to the home page
          navigate("/Home");
        } else {
          setApiError(response.data.message);
        }
      } catch (error) {
        setApiError("An error occurred during login. Please try again.");
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          type="password"
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
        />
        {apiError && <label className="errorLabel">{apiError}</label>}
      </div>
    </div>
  );
};

export default Login;
