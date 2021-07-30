import router from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/splash.module.css";
import { getUser } from "../utils/helpers";

const Splash = () => {
  return (
    <div className={styles.card}>
      <h1>Welcome to GMS Employee Reports</h1>
      <p>A place where you can manage your day to day activities</p>
    </div>
  );
};

export default Splash;
