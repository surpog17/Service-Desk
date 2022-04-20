import { Paper, makeStyles,Grid, TableBody, TableRow, TableCell, Toolbar, InputAdornment,Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import React, { useState,useEffect } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Controls from "../../Components/controls/Controls";
import moment from "moment";
import {useParams, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
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
}));
export default function SimplePaper() {
  const classes = useStyles();
  const[data,setData]=useState([])
  const[loding,setLoding]=useState(false);
  const history = useHistory();
  const changeState = ()=>{
   history.push('/notification')
  }
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
    
      <Paper elevation={3} >
      <Grid>
      <Grid item xs={12} >
      <Box sx={{ width: "100%",height: 90, border: '1px solid #247ba0' , borderRadius: "27px 27px 0px 0px"  }}>
        <Typography variant="h5" className={classes.notification}>NOTIFICATION
        <Typography variant="caption" style={{marginLeft:"450px"}}> Make all as read</Typography>
        </Typography>
        </Box>
        </Grid>
         {loding ? data.map((item) =>{
         return(
        <Grid item xs={12} className={classes.avatar} spacing={3}>
        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCLCYzRTMEQ6sCMSyUyCycLmNM8aY4f7CCqw&usqp=CAU" style={{ width:50, height:50 }}/>
        <Grid item className={classes.description}>
        <Typography variant="body1">{item.clients.Representative_FirstName} has created a new ticket:  "{item.Issue}"
        <Typography variant="body2">{item.clients.ClientName}  {item.projects.name} {moment(item.created_at).endOf('day').fromNow()}   </Typography>
        <CloseIcon className={classes.closed}/>
        </Typography>
        </Grid>
        </Grid>
       )}):<CircularProgress className={classes.progress}/>}
       <Controls.Button text="SEE ALL" onClick={changeState} className={classes.button}/>
       </Grid>
        </Paper>
    </div>
  );
}
