import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography,Grid } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import React, { useState,useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import DoneAllIcon from '@material-ui/icons/DoneAll';
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      width: theme.spacing(300),
      height: theme.spacing(100)
    },
    notification:{
        margin: theme.spacing(4),
        color:"#247ba0"
      },
      avatar:{
        display:"flex",
        flexDirection:"row",
        margin: theme.spacing(1),
      },
      description:{
        padding: theme.spacing(),
        color:"#247ba0"
      },
      closed:{
          marginLeft: theme.spacing(85),
      },
      progress:{
        marginTop: theme.spacing(10),
        marginLeft: theme.spacing(47),
        marginBottom: theme.spacing(10),
      },
      button:{
        backgroundColor:"#247ba0", 
        color:"#fff", 
        marginLeft: theme.spacing(47)
      }
  }
}));
export default function Notification() {
  const classes = useStyles();
  const[data,setData]=useState([])
  const[loding,setLoding]=useState(false);
  useEffect(()=>{
    axios.get(`/api/ticket`)
    .then(response=>{
        setData(response.data)
        setLoding(true);
        console.log(response.data)
    })
}, [data])
  return (
    <div className={classes.root}>
      <Paper>
        <Typography
          variant="h5"
          style={{ display:"flex",
          flexDirection:"row",
          justifyContent:"center",
          alignItems:"center",
          marginTop:"50px",
          color:"#247ba0",
          }}
        >
            <span><Typography
          style={{
            width: "10rem",
            height: "0.4rem",
            backgroundColor: "#247ba0",
            borderRadius: "3px",
            marginRight: "20px",
          }}
        /></span>
        <NotificationsIcon />
          UNREAD NOTIFICATIONS
          <Typography
            style={{
              width: "10rem",
              height: "0.4rem",
              backgroundColor: "#247ba0",
              borderRadius: "3px",
              marginLeft: "40px",
              marignTop: "20px"
            }}
          />
        </Typography>
        <Grid container>
      <Grid item xs={12}  className={classes.avatar} >
        </Grid>
         {loding ? data.map((item) =>{
         return(
        <Grid item xs={12} spacing={3} style={{display:"flex",
        flexDirection:"row",
        marginTop:"0px", marginLeft:"50px"}}>
        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCLCYzRTMEQ6sCMSyUyCycLmNM8aY4f7CCqw&usqp=CAU" style={{ width:50, height:50 }}/>
        <Grid item style={{color:"#247ba0", marginLeft:"15px"}}>
        <Typography variant="body1">{item.clients.Representative_FirstName}has created a new ticket:"{item.Issue}"
        <Typography variant="body2">{item.clients.ClientName}  {item.projects.name} 2 minutes ago</Typography>
        <Typography style={{marginLeft:"1200px", }}> Mark as read</Typography>
        </Typography>
        </Grid>
        </Grid>
       )}):<CircularProgress className={classes.progress}/>}
       </Grid>
       <Typography
          variant="h5"
          style={{ display:"flex",
          flexDirection:"row",
          justifyContent:"center",
          alignItems:"center",
          marginTop:"50px",
          color:"#247ba0",
          }}
        >
            <span><Typography
          style={{
            width: "10rem",
            height: "0.4rem",
            backgroundColor: "#247ba0",
            borderRadius: "3px",
            marginRight: "20px",
          }}
        /></span>
        <DoneAllIcon/>
          READ NOTIFICATIONS
          <Typography
            style={{
              width: "10rem",
              height: "0.4rem",
              backgroundColor: "#247ba0",
              borderRadius: "3px",
              marginLeft: "20px",
              marignTop: "20px"
            }}
          />
        </Typography>
        <Grid container>
      <Grid item xs={12}  className={classes.avatar} >
        </Grid>
         {loding ? data.map((item) =>{
         return(
        <Grid item xs={12} spacing={3} style={{display:"flex",
        flexDirection:"row",
        marginTop:"0px", marginLeft:"50px"}}>
        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCLCYzRTMEQ6sCMSyUyCycLmNM8aY4f7CCqw&usqp=CAU" style={{ width:50, height:50 }}/>
        <Grid item style={{color:"#247ba0", marginLeft:"15px"}}>
        <Typography variant="body1">{item.clients.Representative_FirstName}has created a new ticket:"{item.Issue}"
        <Typography variant="body2">{item.clients.ClientName}  {item.projects.name} 2 minutes ago</Typography>
        <Typography style={{marginLeft:"1200px", }}> Mark as read</Typography>
        </Typography>
        </Grid>
        </Grid>
       )}):<CircularProgress className={classes.progress}/>}
       </Grid>
        </Paper>
    </div>
  );
}
