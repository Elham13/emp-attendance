import { useEffect, useState } from "react";
import router from "next/router";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import "../styles/globals.css";
import IdleTimer from "../src/utils/timer";
import { generalApi } from "../src/utils/api";

function MyApp({ Component, pageProps }) {
  const [reason, setReason] = useState("Lunch");
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    const u = localStorage.getItem("@user");
    const c = localStorage.getItem("@clock");
    const user = JSON.parse(u);
    const clock = JSON.parse(c);

    try {
      const { data } = await axios.post(`${generalApi}/login/logout`, {
        id: user._id,
        clock: {
          date: new Date(),
          reason: reason,
          hr: clock.hr,
          min: clock.min,
          sec: clock.sec,
        },
      });
    } catch (error) {
      error.response
        ? alert(error.response.data.message)
        : alert(error.message);
    }
  };

  const handleChange = (e) => {
    setReason(e.target.value);
  };

  const handleClose = () => {
    handleLogout();
    setOpen(false);
    localStorage.removeItem("@user");
    localStorage.removeItem("@clock");
    router.push("/login");
  };

  useEffect(() => {
    const timer = new IdleTimer({
      timeout: 300, //expire after 10 seconds
      onTimeout: () => {
        setOpen(true);
      },
      onExpired: () => {
        //do something if expired on load
        setOpen(true);
      },
    });

    return () => {
      timer.cleanUp();
    };
  }, []);
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Reason of inactivity</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Loged out for</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={reason}
              onChange={handleChange}
            >
              <MenuItem value='Lunch'>Lunch</MenuItem>
              <MenuItem value='Speaking to clients'>
                Speaking to clients
              </MenuItem>
              <MenuItem value='Busy on call'>Busy on call</MenuItem>
              <MenuItem value='Busy in appointments'>
                Busy in appointments
              </MenuItem>
              <MenuItem value='In office meeting'>In office meeting</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Login
          </Button>
        </DialogActions>
      </Dialog>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
