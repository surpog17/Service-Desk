import { Button, Paper, Typography,Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import MyTickets from './MyTickets';
import Incoming from './incomingTickets';
import ActiveTickets from './activeTickets';
import SupportEngineers from './supportEngineers';
const UseStyles = makeStyles({
  
})


const index = () => {

    const classes = UseStyles();
    return (
        <Grid container direction="column" spacing={2}> 
                <Paper elevation={2} className={classes.banner}>

                    <Typography variant="h4" color="primary">Welcome to Help Ex, <b> IE Network Solution's </b> Help Desk</Typography>
                </Paper>                    
                <Grid item sm={12}><Incoming/></Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                       
                        <Grid item sm={7}><ActiveTickets/></Grid>
                        <Grid item sm={5}><SupportEngineers/></Grid>
                </Grid>
            </Grid>
            
        </Grid>
        
    );
};

export default index;