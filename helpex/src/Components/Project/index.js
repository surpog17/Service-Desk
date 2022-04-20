import { Typography,Grid, Breadcrumbs, Link, Paper, makeStyles } from '@material-ui/core';
import React,{ useState, useEffect} from 'react';
import Files from './Files';
import ClientUsers from './ClientUsers';
import InternalUsers from './InternalUsers';
import axios from 'axios';
import { useParams } from 'react-router';

const UseStyles = makeStyles({
    root:{
      
        padding:20,
        paddingRight:"-20px",
        
    },
    
    title: {
        // paddingBottom: "-450px",
        paddingLeft: 15,
    },
    crumb:{
        padding:20,
        marginTop:"-60px"   
    },



})
const index = () => {
    const classes = UseStyles();
    const params=useParams();
    const[data,setData]=useState({ posts: [] })
    console.log(`testid:${params.id}`)
    useEffect(()=>{
        axios.get(`/api/client/${params.id}/project/${params.id}`)
        .then(response=>{
            console.log(response.data)
            setData({posts:[response.data]});
            //setPost({ posts: [result.data] });
        })
    }, [params.id])
    return (
        data.posts && data.posts.map((item) =>{
            return(
        <Grid container direction="column" spacing={2} className={classes.root}> 
            
                <Grid item xs={6}>
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link color="inherit" href="/client/:id">
                   Client Name 
               </Link>
                <Link
                  style={{color:"#247ba0"}}
                  href= "/project">
                      Project Name  
                  </Link>
                  </Breadcrumbs>
                      </Grid> 
                <Paper elevation={2} className={classes.banner}>
                <Grid item sm={12} style={{display: 'flex', justifyContent:'end', width: '100%', paddingRight:'20px' }}>
                <p variant="h9" style={{color:"#247ba0"}}>SLA Start Date - SLA End Date / Closure Date</p>    
                </Grid>
                 <Grid item xs={12} style={{display: 'flex', justifyContent: 'space-between', width: '100%', }}> 
                <Typography variant="h4" color="primary" key={item.id} style={{paddingLeft:'20px'}}>{item.name}</Typography>
                <Typography  variant="h6" style={{color:"#247ba0",paddingRight:'20px'}}>{item.startDate+" - "+ item.dueDate} / {item.closureDate}</Typography>
            </Grid>
            </Paper>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                       
                   <Grid item sm={6}><ClientUsers/></Grid>
                    <Grid item sm={6}><InternalUsers/></Grid>
                    <Grid item sm={6}><Files/></Grid>
                </Grid>
            </Grid>
        </Grid>
    )})
    );
    
};
export default index;
