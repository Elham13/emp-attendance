import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Checkbox,
  Button,
} from "@material-ui/core";
import moment from "moment";
import axios from "axios";
import Navbar from "../../src/components/Navbar";
import styles from "../../styles/users.module.css";
import EnhancedTableHead from "../../src/components/EnhancedTableHead";
import { generalApi } from "../../src/utils/api";
import { getComparator, stableSort } from "../../src/utils/helpers";
import Loader from "../../src/components/Loader";
import SnackPopup from "../../src/components/SnackPopup";

const User = () => {
  const source = axios.CancelToken.source();
  const router = useRouter();

  const [dvrs, setDvrs] = useState(null);
  const [user, setUser] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [userFetching, setUserFetching] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [selected, setSelected] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 0,
    pages: 0,
  });
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

  const getUser = async (id) => {
    try {
      setUserFetching(true);
      const { data } = await axios.get(`${generalApi}/login?id=${id}`, {
        cancelToken: source.token,
      });
      setUser(data.user);
      setFetching(false);
      // console.log("data: ", data);
    } catch (error) {
      error.response
        ? setPopup({
            open: true,
            severity: "error",
            message: error.response.data.message,
          })
        : setPopup({
            open: true,
            severity: "error",
            message: error.message,
          });
      setFetching(false);
    }
  };

  const getData = async (id, pageNo) => {
    try {
      setFetching(true);
      const { data } = await axios.get(
        `${generalApi}/dvrs?id=${id}&pageNumber=${pageNo}`,
        { cancelToken: source.token }
      );
      setDvrs(data.dvrs);
      setPaginate({
        page: data.page - 1,
        pages: data.pages,
      });
      setFetching(false);
      // console.log("data: ", data);
    } catch (error) {
      error.response
        ? setPopup({
            open: true,
            severity: "error",
            message: error.response.data.message,
          })
        : setPopup({
            open: true,
            severity: "error",
            message: error.message,
          });
      setFetching(false);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dvrs.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (e, newPage) => {
    if (newPage + 1 <= paginate.pages) {
      setPaginate({
        ...paginate,
        page: newPage,
      });
      getData(user._id, newPage + 1);
    } else {
      setPopup({
        open: true,
        severity: "warning",
        message: "End of table, No more data available",
      });
    }
  };

  const handleDelete = () => {
    // console.log("Clincked");
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  useEffect(() => {
    const id = router.query.user;
    if (id) {
      getUser(id);
      getData(id);
    }
  }, [router]);
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <SnackPopup
          open={popup.open}
          message={popup.message}
          severity={popup.severity}
          handleClose={closePoput}
        />
        <div className={styles.headWrapper}>
          {user ? (
            <h3>{user.fullName.split(" ")[0]} Dvr table</h3>
          ) : (
            <h3>Dvr Table</h3>
          )}
        </div>

        <div className={styles.containerInner}>
          {fetching ? (
            <Loader number={10} />
          ) : (
            <>
              <TableContainer>
                <Table size='small'>
                  <EnhancedTableHead
                    onRequestSort={handleRequestSort}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    rowCount={dvrs?.length}
                  />
                  <TableBody>
                    {dvrs &&
                      stableSort(dvrs, getComparator(order, orderBy)).map(
                        (row, index) => {
                          const isItemSelected = isSelected(row._id);
                          const labelId = `enhanced-table-checkbox-${index}`;
                          return (
                            <TableRow
                              hover
                              onClick={(event) => handleClick(event, row._id)}
                              role='checkbox'
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row._id}
                              selected={isItemSelected}
                            >
                              <TableCell padding='checkbox'>
                                <Checkbox
                                  checked={isItemSelected}
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </TableCell>
                              <TableCell
                                component='th'
                                id={labelId}
                                scope='row'
                                padding='none'
                                size='small'
                              >
                                {row._id.substr(row._id.length - 4)}
                              </TableCell>
                              <TableCell align='left'>
                                {moment(row.createdAt).format("DD/MM/YYYY")}
                              </TableCell>
                              <TableCell align='left'>
                                {row.BusinessName}
                              </TableCell>
                              <TableCell align='left'>
                                {row.ContactPersonName}
                              </TableCell>
                              <TableCell align='left'>
                                {row.ContactPersonNumber}
                              </TableCell>
                              <TableCell align='left'>{row.Email}</TableCell>
                              <TableCell align='left'>{row.Website}</TableCell>
                              <TableCell align='left'>{row.Category}</TableCell>
                              <TableCell align='left'>
                                {row.DataSource}
                              </TableCell>
                              <TableCell align='left'>{row.Status}</TableCell>
                              <TableCell align='left'>{row.Remarks}</TableCell>
                              <TableCell align='left'>
                                {row.AppointmentDate &&
                                  moment(row.AppointmentDate).format(
                                    "DD/MM/YYYY"
                                  )}
                              </TableCell>
                              <TableCell align='left'>
                                {row.ClientRequirement}
                              </TableCell>
                              <TableCell align='left'>
                                {row.FollowUpDate &&
                                  moment(row.FollowUpDate).format("DD/MM/YYYY")}
                              </TableCell>
                              <TableCell align='left'>
                                {row.Qoutation}
                              </TableCell>
                              <TableCell
                                align='left'
                                className={styles.btnContainer}
                              >
                                <button title='Edit' className={styles.editBtn}>
                                  Edit
                                </button>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[]}
                component='div'
                count={-1}
                page={paginate.page}
                rowsPerPage={paginate.pages}
                onPageChange={handleChangePage}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default User;
