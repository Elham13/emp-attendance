import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import _ from "lodash";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Checkbox,
  IconButton,
  Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";
import styles from "../../styles/Home.module.css";
import { generalApi } from "../utils/api";
import { headCells, getComparator, stableSort } from "../utils/helpers";
import Loader from "./Loader";
import SnackPopup from "./SnackPopup";

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell, i) => (
          <TableCell key={i}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

const EmpScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [dvrs, setDvrs] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [selected, setSelected] = useState([]);
  const [fetching, setFetching] = useState(false);
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

  const getData = async (id, pageNo) => {
    try {
      setFetching(true);
      const { data } = await axios.get(
        `${generalApi}/dvrs?id=${id}&pageNumber=${pageNo}`
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

  const handleNewDvr = () => {
    router.push("/add-dvr");
  };

  const handleDelete = () => {
    // console.log("Clincked");
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dvrs.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  useEffect(() => {
    const u = localStorage.getItem("@user");
    const userr = JSON.parse(u);
    setUser(userr);
    getData(userr._id);
  }, []);

  // useEffect(() => {
  //   console.log("paginate: ", user);
  // }, [paginate]);

  return (
    <div className={styles.container}>
      <div className={styles.headWrapper}>
        <SnackPopup
          open={popup.open}
          message={popup.message}
          severity={popup.severity}
          handleClose={closePoput}
        />
        <p></p>
        {_.isEmpty(user) ? (
          <h3>Dvr Table</h3>
        ) : (
          <h3>{user.fullName.split(" ")[0]} Dvr table</h3>
        )}
        <Button
          variant='contained'
          onClick={handleNewDvr}
          className={styles.addBtn}
          startIcon={<AddIcon fontSize='small' />}
        >
          New Dvr
        </Button>
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
                  rowCount={dvrs.length}
                />
                <TableBody>
                  {stableSort(dvrs, getComparator(order, orderBy)).map(
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
                          <TableCell align='left'>{row.BusinessName}</TableCell>
                          <TableCell align='left'>
                            {row.ContactPersonName}
                          </TableCell>
                          <TableCell align='left'>
                            {row.ContactPersonNumber}
                          </TableCell>
                          <TableCell align='left'>{row.Email}</TableCell>
                          <TableCell align='left'>{row.Website}</TableCell>
                          <TableCell align='left'>{row.Category}</TableCell>
                          <TableCell align='left'>{row.DataSource}</TableCell>
                          <TableCell align='left'>{row.Status}</TableCell>
                          <TableCell align='left'>{row.Remarks}</TableCell>
                          <TableCell align='left'>
                            {row.AppointmentDate &&
                              moment(row.AppointmentDate).format("DD/MM/YYYY")}
                          </TableCell>
                          <TableCell align='left'>
                            {row.ClientRequirement}
                          </TableCell>
                          <TableCell align='left'>
                            {row.FollowUpDate &&
                              moment(row.FollowUpDate).format("DD/MM/YYYY")}
                          </TableCell>
                          <TableCell align='left'>{row.Qoutation}</TableCell>
                          <TableCell
                            align='left'
                            className={styles.btnContainer}
                          >
                            <button title='Edit' className={styles.editBtn}>
                              Edit
                            </button>
                            <button
                              title='Delete'
                              className={styles.deleteBtn}
                              onClick={handleDelete}
                            >
                              Delete
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
  );
};

export default EmpScreen;
