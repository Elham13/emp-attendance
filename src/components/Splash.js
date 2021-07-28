import styles from "../../styles/splash.module.css";

const Splash = () => {
  return (
    <div className={styles.card}>
      <h1>Welcome to Global Marketing Solutions</h1>
      <p>A place where you can introduce your Business to the world</p>
      <a href='/login' className=''>
        Login
      </a>
    </div>
  );
};

export default Splash;
