import Nav from "../Navbar/Login-navbar";
import Login from "../Login/Login";
import Background from "../../assets/images/login-background.png";
import { makeStyles, Grid } from "@material-ui/core";
import React from "react";
const UseStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 10,
    paddingLeft: 15,
  },
  backgroundimg: {
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    height: '100vh'

  },
  align: {
    margin:20,
    display: "flex",
    justifyContent: "flex-end",
  },
  footer: {
   marginTop:100
  },

});
const index = props => {
  const classes = UseStyles();
  return (
  <Grid className={classes.backgroundimg} container direction="column">
      <Grid item>
        <Nav />
      </Grid>
      <Grid >
        <Login  />
      </Grid>
  </Grid>

  );
};

export default index;
