import _ from "lodash";
import axios from "axios";
import { generalApi } from "./api";

export const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "BusinessName",
    numeric: false,
    disablePadding: false,
    label: "Business Name",
  },
  {
    id: "ContactPersonName",
    numeric: false,
    disablePadding: false,
    label: "Contact Person Name",
  },
  {
    id: "ContactPersonNumber",
    numeric: false,
    disablePadding: false,
    label: "Contact Person Number",
  },
  { id: "Email", numeric: false, disablePadding: false, label: "Email" },
  { id: "Website", numeric: false, disablePadding: false, label: "Website" },
  { id: "Category", numeric: false, disablePadding: false, label: "Category" },
  {
    id: "DataSource",
    numeric: false,
    disablePadding: false,
    label: "DataSource",
  },
  { id: "Status", numeric: false, disablePadding: false, label: "Status" },
  { id: "Remarks", numeric: false, disablePadding: false, label: "Remarks" },
  {
    id: "AppointmentDate",
    numeric: false,
    disablePadding: false,
    label: "Appointment Date",
  },
  {
    id: "ClientRequirement",
    numeric: false,
    disablePadding: false,
    label: "Client Requirement",
  },
  {
    id: "FollowUpDate",
    numeric: false,
    disablePadding: false,
    label: "Followup Date",
  },
  {
    id: "Qoutation",
    numeric: false,
    disablePadding: false,
    label: "Qoutation",
  },
];

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const getUser = () => {
  const u = localStorage.getItem("@user");
  const user = JSON.parse(u);
  if (user) {
    return { exist: true, user };
  }
  return { exist: false, user };
};
