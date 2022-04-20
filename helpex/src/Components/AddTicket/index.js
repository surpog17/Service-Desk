import { Grid, makeStyles, Breadcrumbs,Link, Typography } from '@material-ui/core';
import React from 'react';
import NewTicket from './NewTicket';




const UseStyles = makeStyles({
    root:{
        padding:46,
        marginTop:"-60px"   

        // length:10

    },
   
   
})

const index = () => {
    const classes = UseStyles();
   
      

    return (
        <Grid container spacing={4} direction="column" className={classes.root}>
 
            <Grid item sm={13} xs={13} >
             {/* <Typography color="black" variant="h7"  ><span>Home /<b> Open a ticket</b></span></Typography> */}
             <Breadcrumbs separator="›" aria-label="breadcrumb">
  <Link color="inherit" href="/clienthome" 
  >
    Home
  </Link>
  <Link
style={{color:"#247ba0"}}
    href= "/addticket"
    // aria-current="page"
  >
    Open a ticket
  </Link>
</Breadcrumbs>

            </Grid>
        <NewTicket>
        </NewTicket>
        </Grid>
     );
}

export default index;