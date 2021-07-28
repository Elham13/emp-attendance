import Header from "../src/components/Header";
import Splash from "../src/components/Splash";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Splash />
    </div>
  );
}
