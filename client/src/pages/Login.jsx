import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import styles from "./Login.module.css";

import { useAuth } from "../store/auth-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { settoken } = useAuth();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      email,
      password,
    };
    const res = await fetch("http://localhost:3000/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    try {
      if (res.ok) {
        const result = await res.json();

        localStorage.setItem("token", result.token);
        settoken(localStorage.getItem("token"));
        setemail("");
        setpassword("");
        alert("user login successful");
        navigate("/home");
      }
    } catch (error) {
      alert("login failed");
      console.log(error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2>Login</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className={styles.icon} /> Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <FaLock className={styles.icon} /> Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`btn btn-primary ${styles.submitButton}`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
