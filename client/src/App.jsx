import React from "react";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import styles from "./App.module.css";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
function App() {
  return (
    <>
      <div className={styles.homeContainer}>
        <Sidebar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
