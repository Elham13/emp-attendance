import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "axios";
import { useRouter } from "next/router";
import { generalApi } from "../../../src/utils/api";
import Navbar from "../../../src/components/Navbar";
import styles from "../../../styles/admin.module.css";

const index = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    email: "",
    mobileNumber: "",
    role: "",
    password: "",
  });

  const getUser = async (id) => {
    try {
      const { data } = await axios.get(`${generalApi}/login?id=${id}`);
      if (data) {
        setUser(data.user);

        setFormData({
          id: data.user._id,
          fullName: data.user.fullName,
          email: data.user.email,
          mobileNumber: data.user.mobileNumber,
          role: data.user.role,
        });
      }
    } catch (error) {
      error.response
        ? alert(error.response.data.message)
        : alert(error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `${generalApi}/login/finduser`,
        formData
      );
      alert(data.message);
    } catch (error) {
      error.response
        ? alert(error.response.data.message)
        : alert(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getUser(router.query.id);
  }, []);
  return (
    <>
      <Navbar />
      <div className={styles.editBtnWrapper}>
        <Button
          variant='contained'
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
        >
          Back
        </Button>
        <div className={styles.editUserContainer}>
          <h2>Edit user</h2>
          {user ? (
            <form>
              <TextField
                id='standard-basic'
                label='Id'
                fullWidth
                disabled
                value={formData.id}
              />
              <TextField
                id='standard-basic'
                label='Full Name'
                fullWidth
                autoFocus
                value={formData.fullName}
                name='fullName'
                onChange={handleChange}
              />
              <TextField
                id='standard-basic'
                label='Email'
                fullWidth
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                id='standard-basic'
                label='Mobile Number'
                fullWidth
                name='mobileNumber'
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Role</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={formData.role}
                  name='role'
                  onChange={handleChange}
                >
                  <MenuItem value='admin'>Admin</MenuItem>
                  <MenuItem value='emp'>Employee</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id='standard-basic'
                label='Password'
                fullWidth
                name='password'
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                variant='contained'
                color='primary'
                className={styles.btn}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </form>
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
    </>
  );
};

export default index;

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
