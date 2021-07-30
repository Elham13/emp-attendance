import Header from "../src/components/Header";
import Splash from "../src/components/Splash";
import styles from "../styles/Home.module.css";
import Navbar from "../src/components/Navbar";

export default function Home() {
  return (
    <div className={styles.splashContainer}>
      <Header />
      <Navbar />
      <Splash />
    </div>
  );
}
