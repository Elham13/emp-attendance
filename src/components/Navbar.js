import React, { useEffect, useState } from "react";
import lodash from "lodash";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import styles from "../../styles/splash.module.css";
import router from "next/router";

const Navbar = () => {
  const [user, setUser] = useState({});

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("@user");
    localStorage.removeItem("@clock");
    router.push("/login");
  };

  useEffect(() => {
    const u = localStorage.getItem("@user");
    const userr = JSON.parse(u);
    setUser(userr);
  }, []);

  return (
    <AppBar position='static' className={styles.navAppBar}>
      <Toolbar className={styles.navtoolbar}>
        <div className={styles.toolbaInner}>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>
            {lodash.isEmpty(user)
              ? "Dashboard"
              : `${user.fullName.split(" ")[0]} Dashboard`}
          </Typography>
        </div>
        {lodash.isEmpty(user) ? (
          <Button color='inherit' onClick={handleLogin}>
            Login
          </Button>
        ) : (
          <Button color='inherit' onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
      {/* <ModalDialog open={open} handleClose={handleClose} /> */}
    </AppBar>
  );
};

export default Navbar;
