import { Grid, makeStyles, Breadcrumbs,Link, Typography } from '@material-ui/core';
import React from 'react';
import AdminTicket from './AdminTicket';




const UseStyles = makeStyles({
    root:{
        padding:46,
        marginTop:"-60px"   
    },
})

const index = () => {
    const classes = UseStyles();
   
      

    return (
        <Grid container spacing={4} direction="column" className={classes.root}>
 
            <Grid item sm={13} xs={13} >
             <Breadcrumbs separator="›" aria-label="breadcrumb">
  <Link color="inherit" href="/client">
    Client Name
  </Link>
  <Link
style={{color:"#247ba0"}}
    href= "/adminticket"
  >
    Open a ticket
  </Link>
</Breadcrumbs>

            </Grid>
        <AdminTicket>
        </AdminTicket>
        </Grid>
     );
}

export default index;