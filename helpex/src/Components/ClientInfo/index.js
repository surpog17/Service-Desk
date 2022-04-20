import { Typography,Grid, Breadcrumbs, Link, makeStyles } from '@material-ui/core';
import React from 'react';
import OpenTickets from './OpenTickets';
import ResolvedIssue from './ResolvedIssue';
import Client from './Client';
import ProjectName from './ProjectName';
import User from './User';
import { useParams,useHistory } from "react-router-dom";


const UseStyles = makeStyles({
  root:{
    padding:10,
        
},
  title: {
    paddingBottom: 5,
    paddingLeft: 15,

},



})
const index = () => {
    const classes = UseStyles();
    const params = useParams();
    return (
       <Grid justify="center" container className={classes.root} direction="column" spacing={5}>
           
           <Grid item md={12} container spacing={4}>
                    <Grid item md={6}>
                    
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
  <Link color="inherit" href="/setting" 
  >
    Client Management 
  </Link>
  <Link
style={{color:"#247ba0"}}
href= {"/client/"+params.id}
    // aria-current="page"
  >
    Client  
  </Link>
</Breadcrumbs>

                    
                    </Grid>
            
                    <Client>
                     </Client>
                   
                
           </Grid>

           <Grid item md={12}>

            <Grid justify="center" container  spacing={4} > 

            <Grid item md={6}> 
            <Typography className={classes.title} variant="h5" color="primary">
              Open Tickets
            </Typography>       
            <OpenTickets/></Grid>
            <Grid item md={6}>
            <Typography className={classes.title} variant="h5" color="primary">
                Resloved Issues
                </Typography>
              <ResolvedIssue/></Grid>
            <Grid item md={6}><ProjectName/></Grid>
            <Grid item md={6}><User/></Grid>

            </Grid>


           </Grid>
           
       </Grid>
    );
};

export default index;
