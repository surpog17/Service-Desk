import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
// import NotificationsIcon from "@material-ui/icons/Notifications";
// import SettingsIcon from "@material-ui/icons/Settings";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import logo from "../../assets/images/helpxLogo.png";

import React from "react";
const UseStyles = makeStyles({
  root: {
    marginBottom: 80,
  },
  Toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    width: 120,
    height: 25,
  },
  titleColor: {
    color: "#247ba0",
    fontSize: 40,
  },

  navbarpaper: {
    zIndex: -1,
  },
});
const index = () => {
  const classes = UseStyles();
  return (
    <AppBar className={classes.root} color="inherit" position="static">
      <Toolbar className={classes.Toolbar}>
        <img className={classes.logo} src={logo} alt="Help Ex Main Logo"></img>

        <div>
          <Typography color="primary" variant="body2">
           Having trouble?<b>Contact Us</b>
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default index;
