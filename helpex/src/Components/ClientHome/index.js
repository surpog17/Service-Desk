import { Button, Paper, Typography,Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useParams,useHistory } from "react-router-dom"; 
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import MyTickets from './MyTickets';
import KnowlegeBase from './KnowlegeBase';
const UseStyles = makeStyles({
    banner:{
        padding:20,
        display:"flex",
        justifyContent:"space-between"

    }
})


function index  (props)  {

    const classes = UseStyles();
    const params= useParams();
    const history = useHistory();
    const changeState = (e, clientid,userId) => {  
        history.push(`/Clientticket/${clientid}/${userId}`)
        console.log(`ID:${params.clientid}:${params.userId}`)
       };
       console.log(props.name)
    return (
        <Grid container direction="column" spacing={2}> 
            <Grid item xs={12}>
                <Paper elevation={2} className={classes.banner}>
                <Typography variant="h4" color="primary">Welcome to Help Ex,{props.name} <b> IE Network Solution's </b> Help Desk</Typography>
                    <Button onClick={(e) => changeState(e, params.clientid, params.userId)} variant="contained" color="secondary" style={{color:"#fff"}}  startIcon={<BrightnessHighIcon/>}>Open A Support Ticket</Button>
                    
                </Paper>

            </Grid>
        
            <Grid item xs={12}>
                <Grid container spacing={2}>
                       
                   <Grid item sm={7}><KnowlegeBase/></Grid>
                        <Grid item sm={5}><MyTickets/></Grid>
                </Grid>
            </Grid>
            
        </Grid>
        
    );
};

export default index;