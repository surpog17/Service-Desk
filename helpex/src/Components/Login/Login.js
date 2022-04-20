import Logo from "../../assets/images/helpxLogo.png";
import { Paper, Button, makeStyles, Typography, Grid} from "@material-ui/core";
import React,{ useState} from "react";
import {useHistory } from "react-router-dom";
import Alert from '@mui/material/Alert';

import axios from 'axios';
import index from "../ClientHome";

const UseStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 60,
    paddingBottom: 50,
    marginBottom: 50,
    borderRadius: 15
  },

  logo: {
    width: 100,
    height: 20,
  },
  fields: {
    borderRadius: 30,
    display: "flex",
    justifyContent:'center',
    paddingRight: 20,
    padding: 8,
    width: "100%",
    outline: "none",
    border: 0,
    boxShadow: "1px 1px 5px 0px rgba(1,1,1,0.3)",
  },

  
});



const Login = props => {
  const classes = UseStyles();
  const [requiremessage,setRequireMassage] = useState('');
  const [message,setMassage] = useState('');
  //const username = useState("");
  const [user, setUser] = useState({
    email: "",
    password:"",
    id:""
  });
  const history = useHistory();
  const {email,password,id} = user;
      const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
      const signIn = () =>
    {
 
      // const users = { username };  // To Store Email in Localstore and send to Home Page 
 
      //  if(user.email === '')
      //  {
      //   setRequireMassage('')
      //  }
      //  else if(user.password === '')
      //  {
      //   setRequireMassage('Password Field is empty')
      //  }
 
       axios.post("/api/clientlogin/",user)
       .then(response => {
        setMassage(response.data.message);
        localStorage.setItem("message",response.data);
        console.log('testId:',response.data.userId);
        console.log('clientid:',response.data.clientid);
        history.push(`/ClientHome/${response.data.clientid}/${response.data.userId}`)
        console.log('message',response.data);
      })
      .catch((error) => {
        //console.log(error.response.data.status);
        console.log(error.response.data.message);
        setMassage(error.response.data.message); 
        
    });
    }
  return (
  
    <Grid container direction="column" alignItems="center">
        <Alert severity="warning" color="info">
        {message}
        </Alert>  
      <Paper className={classes.root} elevation={3}>
        <Grid
          container
          direction="column"
          spacing={6}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <img
              className={classes.logo}
              src={Logo}
              alt="Help Ex Login Logo"
            ></img>
          </Grid>

          <Grid item xs={12}>
            <Typography color="primary" variant="h6" align="center">
              Welcome to HelpEx Service Desk
            </Typography>
            <Typography color="primary" variant="h6" align="center">
              Login to continue
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {/* <input
              className={classes.fields}
              variant="filled"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
            <br />
            <input
              className={classes.fields}
              variant="filled"
              type="password"
              placeholder="Password"
              name="password" 
              value={password}
            /> */}
            <input className={classes.fields} label='Email'  name="email" value={email}  onChange={e => onInputChange(e)} placeholder='Enter Email' type='text' fullWidth required/>
            <br/>
            <input className={classes.fields} label='Password'  name="password" value={password}  onChange={e => onInputChange(e)} placeholder='Enter password' type='password' fullWidth required/>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={8}>
                <Typography color="primary" to="#" variant="body2" align="left">
                  Forgot Password?
                </Typography>
              </Grid>
              <Grid container item xs={4} justifyContent="flex-end">
                <Button color="secondary" variant="contained" onClick={signIn}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
