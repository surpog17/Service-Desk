import { Grid, makeStyles, Breadcrumbs,Link, Typography } from '@material-ui/core';
import React from 'react';
import Ticket from './Ticket';
import moment from 'moment'
import { useParams} from 'react-router-dom';
const UseStyles = makeStyles({
    root:{
        padding:20,
        marginTop:"-60px"   
    },
    text:{
        color:"#247ba0"
    }
})

const index = () => {
    const classes = UseStyles();
    const params=useParams();
    return (
        <Grid container spacing={4} direction="column" className={classes.root}>
 
            <Grid item sm={13} xs={13} >
             <Breadcrumbs separator="›" aria-label="breadcrumb">
  <Link color="inherit"  href= {"/ClientHome/"+ params.clientid/params.userId}>
    Home 
  </Link>
  <Link
className={classes.text}
    href= {"/ClientHome/"+ params.clientid+"/"+params.userId}>
    Ticket
 
  </Link>
</Breadcrumbs>
            </Grid>
        <Ticket>
        </Ticket>
        </Grid>
     ); 
}

export default index;