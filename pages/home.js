import { useEffect, useState } from "react";
import Image from "next/image";
import EmpScreen from "../src/components/EmpScreen";
import AdminScreen from "../src/components/AdminScreen";
import styles from "../styles/home.module.css";
import { useRouter } from "next/router";

const home = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    console.log("Router: ", router.query);
  }, [router]);

  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <Image
          src='/images/logo.png'
          alt='logo'
          width={60}
          height={60}
          className={styles.logo}
        />
        <h1 className={styles.title}>Welcome to GMS Elham</h1>
        <button type='submit' className={styles.logout} id='logoutBtn'>
          Logout
        </button>
      </div>

      <div className={styles.bodyWrapper}>
        {isAdmin ? <AdminScreen /> : <EmpScreen />}
        <div className={styles.sessionWrapper}>
          <h4 id='yourSession'>Your session is started</h4>
          <div className={styles.clock}>
            <h2 id='hr'>02</h2>
            <span>:</span>
            <h2 id='min'>30</h2>
            <span>:</span>
            <h2 id='sec'>25</h2>
            <button id='puseClock'>Pause</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
