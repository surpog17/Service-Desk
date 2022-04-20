import { makeStyles, Paper,Grid, Typography, Link} from '@material-ui/core';
import React,{useEffect,useState} from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";
const UseStyles = makeStyles({
    root:{
        padding:20,
        paddingRight:"-20px",
        width:"100%",
    },
    font:{
        fontSize:"0.875rem",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight:"400",
    },
  
    
})


const Client = () => {
    const params=useParams();
    const classes = UseStyles();
    
    const[data,setData]=useState({ posts: [] })
    console.log(`testid:${params.id}`)
    useEffect(()=>{
        axios.get(`/api/clients/${params.id}`)
        .then(response=>{
            console.log(response.data)
            setData({posts:[response.data]});
            //setPost({ posts: [result.data] });
        })
    }, [params.id])
    return (
    data.posts && data.posts.map((item) =>{
            return(
            <Grid item xs={12}>
                <Paper elevation={5} className={classes.root}>
                    <Typography variant="h4" color="primary">{item.ClientName}</Typography><br/>
                    <Typography color="black" variant="h6" 
                    style={{fontSize:"0.875rem",
                    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                    fontWeight:"400"

                    }}>
                       {item.ClientDescription}
                    </Typography><br/><br/>
                    <Typography  variant="h6" style={{color:"#247ba0"}}><span>{item.Representative_FirstName+" "+ item.Representative_LastName}/<Link href="#" style={{color:"#247ba0"}}>{item.Representative_email}</Link></span></Typography>

                </Paper>

            </Grid>
            )})
            );
            
};



export default Client;


    
