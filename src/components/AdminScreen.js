import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import { generalApi } from "../utils/api";
import Link from "next/link";
import styles from "../../styles/admin.module.css";
import { useEffect, useState } from "react";
import SnackPopup from "./SnackPopup";
import Loader from "./Loader";

const AdminScreen = () => {
  const source = axios.CancelToken.source();
  const router = useRouter();
  const [fetching, setFetching] = useState(false);
  const [users, setUsers] = useState([]);
  const [popup, setPopup] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const closePoput = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setPopup({
      open: false,
      message: "",
      severity: "success",
    });
  };

  const getUsers = async () => {
    try {
      setFetching(true);
      const { data } = await axios.get(`${generalApi}/login/finduser`, {
        cancelToken: source.token,
      });
      setUsers(data.users);
      setFetching(false);
      // console.log("data: ", data);
    } catch (error) {
      error.response
        ? setPopup({
            open: true,
            severity: "error",
            message: error.response.data,
          })
        : setPopup({
            open: true,
            severity: "error",
            message: error.message,
          });
      setFetching(false);
    }
  };

  const deleteUser = async (e, id) => {
    e.stopPropagation();
    try {
      const { data } = await axios.delete(`${generalApi}/login?id=${id}`);
      setPopup({
        open: true,
        message: data.message,
        severity: "success",
      });
      getUsers();
      console.log("Data: ", data);
    } catch (error) {
      error.response
        ? setPopup({
            open: true,
            severity: "error",
            message: error.response.data,
          })
        : setPopup({
            open: true,
            severity: "error",
            message: error.message,
          });
      console.log("Error: ", error);
    }
  };

  const handleUpdateUser = (e, id) => {
    e.stopPropagation();
    router.push({
      pathname: "/home/editUser",
      query: { id: id },
    });
  };

  const handleRowClick = (e) => {
    console.log("Row clicked");
  };

  useEffect(() => {
    getUsers();

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, []);

  return (
    <div className={styles.container}>
      <SnackPopup
        open={popup.open}
        message={popup.message}
        severity={popup.severity}
        handleClose={closePoput}
      />
      <div className={styles.cardsWrapper}>
        {users?.map((user) => (
          <Link
            key={user._id}
            href={`/home/${encodeURIComponent(user._id)}`}
            passHref
          >
            <div className={styles.card}>
              <h3>{user.fullName.split(" ")[0]}'s Dvr</h3>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.empWrapper}>
        <h2>List of employees</h2>
        <TableContainer component={Paper}>
          {fetching ? (
            <Loader number={10} />
          ) : (
            <Table size='small' aria-label='a dense table'>
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell align='left'>Name</TableCell>
                  <TableCell align='left'>Mobile number</TableCell>
                  <TableCell align='left'>Email</TableCell>
                  <TableCell align='left'>Role</TableCell>
                  <TableCell align='left'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((row, i) => (
                  <TableRow
                    key={row._id}
                    hover
                    onClick={() =>
                      router.push({
                        pathname: "/home/userDetails",
                        query: { id: row._id },
                      })
                    }
                  >
                    <TableCell component='th' scope='row'>
                      {i + 1}
                    </TableCell>
                    <TableCell align='left'>{row.fullName}</TableCell>
                    <TableCell align='left'>{row.mobileNumber}</TableCell>
                    <TableCell align='left'>{row.email}</TableCell>
                    <TableCell align='left'>{row.role}</TableCell>
                    <TableCell align='left' className={styles.btnContainer}>
                      <button
                        title='Edit'
                        className={styles.editBtn}
                        onClick={(e) => handleUpdateUser(e, row._id)}
                      >
                        Edit
                      </button>
                      <button
                        title='Delete'
                        className={styles.deleteBtn}
                        onClick={(e) => deleteUser(e, row._id)}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </div>
    </div>
  );
};

export default AdminScreen;
