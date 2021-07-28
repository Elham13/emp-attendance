import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/login.module.css";
import { generalApi } from "../src/utils/api";

const register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    mobileNumber: "",
    role: "",
    password: "",
    password2: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const valid = () => {
    const { email, fullName, mobileNumber, role, password, password2 } =
      formData;
    if (
      email !== "" &&
      fullName !== "" &&
      mobileNumber !== "" &&
      role !== "" &&
      password !== "" &&
      password !== ""
    ) {
      if (password === password2) {
        return true;
      }
      alert("Passwords do not match");
      return false;
    }
    alert("Make sure all required fields are filled");
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (valid()) {
      setSubmitting(true);
      try {
        const { data } = await axios.post(`${generalApi}/login`, formData);
        setSubmitting(false);
        router.push("/login");
        setFormData({
          email: "",
          fullName: "",
          mobileNumber: "",
          role: "",
          password: "",
          password2: "",
        });
      } catch (error) {
        setSubmitting(false);
        error.response
          ? console.log(error.response.data.message)
          : console.log(error.message);
      }
    }
  };

  //   useEffect(() => {
  //     console.log(formData);
  //   }, [formData]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <Image src='/images/logo.png' alt='logo' width={100} height={100} />
      </div>
      <h2 className={styles.title}>Signup</h2>
      <form className={styles.form}>
        <div className={styles.inputWrapper}>
          <label htmlFor='email'>
            Email <span>*</span>
          </label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor='fullName'>
            Full Name <span>*</span>
          </label>
          <input
            type='text'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor='mobileNumber'>
            Mobile Number <span>*</span>
          </label>
          <input
            type='tel'
            name='mobileNumber'
            value={formData.mobileNumber}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor='role'>
            Role <span>*</span>
          </label>
          <select name='role' onChange={handleChange} value={formData.role}>
            <option>Select a role</option>
            <option value='admin'>Admin</option>
            <option value='emp'>Employee</option>
          </select>
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor='password'>
            Password <span>*</span>
          </label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor='password2'>
            Confirm Password <span>*</span>
          </label>
          <input
            type='password'
            name='password2'
            value={formData.password2}
            onChange={handleChange}
          />
        </div>

        <button className={styles.submitBtn} onClick={handleSubmit}>
          {submitting ? "Loading" : "Signup"}
        </button>
        <p className={styles.question}>
          Already registered?{" "}
          <a href='/login' className={styles.forgotPwd}>
            login
          </a>
        </p>
      </form>
    </div>
  );
};

export default register;
