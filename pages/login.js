import styles from "../styles/login.module.css";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { generalApi } from "../src/utils/api";
import Link from "next/link";

const login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.mobileNumber && formData.password) {
      try {
        setSubmitting(true);
        const { data } = await axios.post(
          `${generalApi}/login/finduser`,
          formData
        );
        setSubmitting(false);
        localStorage.setItem("@user", JSON.stringify(data.user));
        router.push("/home");
      } catch (error) {
        setSubmitting(false);
        error.response
          ? console.log(error.response.data.message)
          : console.log(error.message);
      }
    } else {
      alert("Make sure all fields are filled");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <img src='/images/logo.png' alt='logo' />
      </div>
      <h2 className={styles.title}>Employees Login</h2>

      <form action='/login' method='POST' className={styles.form}>
        <div className={styles.inputWrapper}>
          <label htmlFor='mobileNumber'>Mobile Number</label>
          <input
            type='number'
            name='mobileNumber'
            value={formData.mobileNumber}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button
          type='submit'
          className={styles.submitBtn}
          onClick={handleSubmit}
        >
          {submitting ? "Loading" : "Login"}
        </button>
        <Link href='/register'>
          <a>Register</a>
        </Link>
      </form>
    </div>
  );
};

export default login;
