import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

const Clock = () => {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [hour, setHour] = useState("00");
  const [isActive, setIsActive] = useState(true);
  const [counter, setCounter] = useState(0);

  const handlePause = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    let intervalId;

    const c = localStorage.getItem("@clock");
    if (c) {
      const clock = JSON.parse(c);

      if (isActive) {
        intervalId = setInterval(() => {
          //   const secondCounter = counter % 60;
          //   const minuteCounter = Math.floor(counter / 60);
          //   const hourCounter = Math.floor(counter / 3600);
          let secondCounter = Number(clock.sec);
          let minuteCounter = Number(clock.min);
          let hourCounter = Number(clock.hr);

          secondCounter += 1;
          if (secondCounter === 60) {
            minuteCounter += 1;
            secondCounter = 0;
          }
          if (minuteCounter === 60) {
            hourCounter += 1;
            minuteCounter = 0;
          }

          let computedSecond =
            String(secondCounter).length === 1
              ? `0${secondCounter}`
              : secondCounter;
          clock["sec"] = computedSecond;
          let computedMinute =
            String(minuteCounter).length === 1
              ? `0${minuteCounter}`
              : minuteCounter;
          clock["min"] = computedMinute;
          let computedHoure =
            String(hourCounter).length === 1 ? `0${hourCounter}` : hourCounter;
          clock["hr"] = computedHoure;

          setSecond(computedSecond);
          setMinute(computedMinute);
          setHour(computedHoure);
          localStorage.setItem("@clock", JSON.stringify(clock));

          //   setCounter((counter) => counter + 1);
        }, 1000);
      }
    } else {
      if (isActive) {
        intervalId = setInterval(() => {
          let secondCounter = counter % 60;
          let minuteCounter = Math.floor(counter / 60);
          let hourCounter = Math.floor(counter / 3600);
          const clockObj = {};

          let computedSecond =
            String(secondCounter).length === 1
              ? `0${secondCounter}`
              : secondCounter;
          let computedMinute =
            String(minuteCounter).length === 1
              ? `0${minuteCounter}`
              : minuteCounter;
          let computedHoure =
            String(hourCounter).length === 1 ? `0${hourCounter}` : hourCounter;

          setSecond(computedSecond);
          setMinute(computedMinute);
          setHour(computedHoure);
          clockObj["sec"] = computedSecond;
          clockObj["min"] = computedMinute;
          clockObj["hr"] = computedHoure;

          localStorage.setItem("@clock", JSON.stringify(clockObj));

          setCounter((counter) => counter + 1);
        }, 1000);
      }
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  return (
    <div className={styles.sessionWrapper}>
      <h4 id='yourSession'>
        {isActive ? "Your session is started" : "Start your session"}
      </h4>
      <div className={styles.clock}>
        <h2 id='hr'>{hour}</h2>
        <span>:</span>
        <h2 id='min'>{minute}</h2>
        <span>:</span>
        <h2 id='sec'>{second}</h2>
        <button id='puseClock' onClick={handlePause}>
          {isActive ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );
};

Clock.getInitialProps = async (ctx) => {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const json = await res.json();
  return { stars: json.stargazers_count };
};

export default Clock;
