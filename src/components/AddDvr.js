import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@material-ui/core";
import moment from "moment";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../styles/addDvr.module.css";
import { generalApi } from "../utils/api";
import SnackPopup from "./SnackPopup";
import router from "next/router";

const AddDvr = () => {
  const [frm, setFrm] = useState({
    user: "",
    businessName: "",
    contactPersonName: "",
    contactPersonNumber: "",
    website: "",
    email: "",
    category: "",
    dataSrc: "",
    remarks: "",
    status: "",
    clientReq: "",
    qoutation: "",
    appointmentDate: "",
    followUpDate: "",
  });

  const [err, setErr] = useState({
    businessName: false,
    contactPersonName: false,
    contactPersonNumber: false,
    category: false,
    dataSrc: false,
    status: false,
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

  const handleChange = (e) => {
    setFrm({
      ...frm,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const {
      businessName,
      contactPersonName,
      contactPersonNumber,
      category,
      dataSrc,
      status,
    } = frm;

    if (businessName === "") {
      setErr({
        ...err,
        businessName: true,
      });
      return;
    }

    if (contactPersonName === "") {
      setErr({
        ...err,
        contactPersonName: true,
      });
      return false;
    }

    if (contactPersonNumber === "") {
      setErr({
        ...err,
        contactPersonNumber: true,
      });
      return false;
    }

    if (dataSrc === "") {
      setErr({
        ...err,
        dataSrc: true,
      });
      return false;
    }

    if (status === "") {
      setErr({
        ...err,
        status: true,
      });
      return false;
    }

    if (category === "") {
      setErr({
        ...err,
        category: true,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // submit
      try {
        // console.log("Here");
        const { data } = await axios.post(`${generalApi}/dvrs`, frm);
        setPopup({
          open: true,
          message: "Dvr created successfully ",
          severity: "success",
        });

        router.reload();
      } catch (error) {
        error.response
          ? setPopup({
              open: true,
              message: error.response.data.message,
              severity: "error",
            })
          : setPopup({
              open: true,
              message: error.message,
              severity: "error",
            });
      }
    }
    // alert("Please fill the required fields");
  };

  useEffect(() => {
    const u = localStorage.getItem("@user");
    const user = JSON.parse(u);
    setFrm({
      ...frm,
      user: user._id,
    });
  }, []);

  return (
    <div className={styles.container}>
      <SnackPopup
        open={popup.open}
        message={popup.message}
        severity={popup.severity}
        handleClose={closePoput}
      />
      <form autoComplete='off' className={styles.form}>
        <h3>Add new Dvr</h3>
        <TextField
          error={err.businessName}
          id='standard-basic'
          label='Business Name'
          name='businessName'
          value={frm.businessName}
          onChange={handleChange}
          fullWidth
          autoFocus
        />
        <TextField
          error={err.contactPersonName}
          id='standard-basic'
          label='Contact person name'
          name='contactPersonName'
          value={frm.contactPersonName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          error={err.contactPersonNumber}
          id='standard-basic'
          label='Contact person number'
          name='contactPersonNumber'
          value={frm.contactPersonNumber}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          id='standard-basic'
          label='Email'
          name='email'
          value={frm.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          id='standard-basic'
          label='Website'
          name='website'
          value={frm.website}
          onChange={handleChange}
          fullWidth
        />
        <FormControl fullWidth error={err.category}>
          <InputLabel id='demo-simple-select-label'>Category</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            name='category'
            value={frm.category}
            onChange={handleChange}
          >
            <MenuItem value='Education'>Education</MenuItem>
            <MenuItem value='FMCG'>FMCG</MenuItem>
            <MenuItem value='Hospitals'>Hospitals</MenuItem>
            <MenuItem value='BFSI'>BFSI</MenuItem>
            <MenuItem value='Hotels & Resturants'>Hotels & Resturants</MenuItem>
            <MenuItem value='Fitness & Spa'>Fitness & Spa</MenuItem>
            <MenuItem value='.com Industry'>.com Industry</MenuItem>
            <MenuItem value='Durables (Electronic items)'>
              Durables (Electronic items)
            </MenuItem>
            <MenuItem value='Furniture & Interiors'>
              Furniture & Interiors
            </MenuItem>
            <MenuItem value='Real Estate'>Real Estate</MenuItem>
            <MenuItem value='Service'>Service</MenuItem>
            <MenuItem value='Others'>Others</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth error={err.dataSrc}>
          <InputLabel id='demo-simple-select-label'>Data Source</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            name='dataSrc'
            value={frm.dataSrc}
            onChange={handleChange}
          >
            <MenuItem value='Just Dial'>Just Dial</MenuItem>
            <MenuItem value='India Mart'>India Mart</MenuItem>
            <MenuItem value='Online'>Online</MenuItem>
            <MenuItem value='News Paper'>News Paper</MenuItem>
            <MenuItem value='Direct Visit'>Direct Visit</MenuItem>
            <MenuItem value='Previous Data'>Previous Data</MenuItem>
            <MenuItem value='Social Media'>Social Media</MenuItem>
            <MenuItem value='Others'>Others</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id='standard-basic'
          label='Remarks'
          name='remarks'
          value={frm.remarks}
          onChange={handleChange}
          fullWidth
        />
        <FormControl fullWidth error={err.status}>
          <InputLabel id='demo-simple-select-label'>Status</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            name='status'
            value={frm.status}
            onChange={handleChange}
          >
            <MenuItem value='Appointment'>Appointment</MenuItem>
            <MenuItem value='Client'>Client</MenuItem>
            <MenuItem value='Follow Up'>Follow Up</MenuItem>
            <MenuItem value='Prospect'>Prospect</MenuItem>
            <MenuItem value='Approached'>Approached</MenuItem>
            <MenuItem value='Call, Mail & WhatsApp'>
              Call, Mail & WhatsApp
            </MenuItem>
            <MenuItem value='No requirement at present'>
              No requirement at present
            </MenuItem>
            <MenuItem value='Business Proposal'>Business Proposal</MenuItem>
            <MenuItem value='Not interested'>Not interested</MenuItem>
          </Select>
        </FormControl>

        {frm.status === "Appointment" && (
          <>
            <TextField
              id='date'
              label='Appointment Date'
              type='date'
              fullWidth
              name='appointmentDate'
              value={frm.appointmentDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              id='date'
              label='Followup Date'
              type='date'
              fullWidth
              name='followUpDate'
              value={frm.followUpDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </>
        )}

        {frm.status === "Client" && (
          <>
            <TextField
              id='standard-basic'
              label='Client Requirement'
              name='clientReq'
              value={frm.clientReq}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              id='date'
              label='Followup Date'
              type='date'
              fullWidth
              name='followUpDate'
              value={frm.followUpDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </>
        )}

        {(frm.status === "Follow Up" ||
          frm.status === "Approached" ||
          frm.status === "Call, Mail & WhatsApp" ||
          frm.status === "No requirement at present" ||
          frm.status === "Business Proposal") && (
          <TextField
            id='date'
            label='Followup Date'
            type='date'
            fullWidth
            name='followUpDate'
            value={frm.followUpDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}

        {frm.status === "Prospect" && (
          <>
            <TextField
              id='date'
              label='Followup Date'
              type='date'
              fullWidth
              name='followUpDate'
              value={frm.followUpDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id='standard-basic'
              label='Give a qoutation'
              name='qoutation'
              value={frm.qoutation}
              onChange={handleChange}
              fullWidth
            />
          </>
        )}

        <Button
          variant='contained'
          color='primary'
          onClick={handleSubmit}
          className={styles.submit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddDvr;
