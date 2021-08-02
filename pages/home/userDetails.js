import React, { useEffect, useState } from "react";
import router from "next/router";
import Navbar from "../../src/components/Navbar";
import axios from "axios";
import { generalApi } from "../../src/utils/api";
import styles from "../../styles/userDetails.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

const userDetails = () => {
  const [user, setUser] = useState(null);

  const getUser = async (id) => {
    try {
      const { data } = await axios.get(`${generalApi}/login?id=${id}`);
      if (data) {
        setUser(data.user);
      }
    } catch (error) {
      error.response
        ? alert(error.response.data.message)
        : alert(error.message);
    }
  };

  useEffect(() => {
    getUser(router.query.id);
  }, []);
  return (
    <div>
      <Navbar />
      {user ? (
        <div className={styles.container}>
          <div className={styles.card}>
            <h2>{user.fullName.split(" ")[0]}'s Details</h2>
            <Table size='small' aria-label='a dense table'>
              <TableHead>
                <TableRow hover>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.mobileNumber}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className={styles.card}>
            <h2>{user.fullName.split(" ")[0]}'s Active time</h2>
            <Table size='small' aria-label='a dense table'>
              <TableHead>
                <TableRow hover>
                  <TableCell>Date</TableCell>
                  <TableCell>Active time</TableCell>
                  <TableCell>Logout reason</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.activeTime.map((at) => (
                  <TableRow hover>
                    <TableCell>{at.date}</TableCell>
                    <TableCell>
                      {at.hr} {at.min} {at.sec}
                    </TableCell>
                    <TableCell>{at.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <p>not user</p>
      )}
    </div>
  );
};

export default userDetails;

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
