import React from "react";
import {
  FaHome,
  FaQuoteRight,
  FaHeart,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

import { useAuth } from "../store/auth-store";

const Sidebar = () => {
  const { token } = useAuth();
  const istoken = !!token;

  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <FaHome className={styles.icon} />
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <span className={styles.text}>Home</span>
          </Link>
        </li>
        <li>
          <AiOutlineSearch className={styles.icon} />
          <Link to={"/search"} style={{ textDecoration: "none" }}>
            <span className={styles.text}>Search by Author</span>
          </Link>
        </li>
        <li>
          <FaQuoteRight className={styles.icon} />
          <Link to={"/morequotes"} style={{ textDecoration: "none" }}>
            <span className={styles.text}>More Quotes</span>
          </Link>
        </li>

        {istoken ? (
          <>
            <li>
              <FaHeart className={styles.icon} />
              <Link to={"/likedquotes"} style={{ textDecoration: "none" }}>
                <span className={styles.text}>Liked Quotes</span>
              </Link>
            </li>
            <li>
              <BiLogOut className={styles.icon} />
              <Link to={"/logout"} style={{ textDecoration: "none" }}>
                <span className={styles.text}>LogOut</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <FaSignInAlt className={styles.icon} />
              <Link to={"/login"} style={{ textDecoration: "none" }}>
                <span className={styles.text}>LogIn</span>
              </Link>
            </li>
            <li>
              <FaUserPlus className={styles.icon} />
              <Link to={"/signup"} style={{ textDecoration: "none" }}>
                <span className={styles.text}>SignUp</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
