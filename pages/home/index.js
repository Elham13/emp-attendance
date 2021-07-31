import { useEffect, useState } from "react";
import EmpScreen from "../../src/components/EmpScreen";
import AdminScreen from "../../src/components/AdminScreen";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import Test from "../../src/components/Test";
import Navbar from "../../src/components/Navbar";
import Clock from "../../src/components/Clock";

const home = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("@user");
    const userr = JSON.parse(u);
    setUser(userr);
  }, []);

  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.bodyWrapper}>
        {user?.role === "admin" ? <AdminScreen /> : <EmpScreen />}
        <Clock />
      </div>
    </div>
  );
};

export default home;
