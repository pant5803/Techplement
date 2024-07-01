import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import styles from "./SignUp.module.css";

import { useAuth } from "../store/auth-store";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const { settoken } = useAuth();

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      username,
      email,
      password,
    };
    const res = await fetch("http://localhost:3000/register", {
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
        setusername("");
        setemail("");
        setpassword("");
        alert("user registered successfully");
        navigate("/home");
      }
    } catch (error) {
      alert("user not registered, server error");
      console.log(error);
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.signUpForm}>
        <h2>Sign Up</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="username">
              <FaUser className={styles.icon} /> Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className={styles.icon} /> Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
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
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`btn btn-primary ${styles.submitButton}`}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
