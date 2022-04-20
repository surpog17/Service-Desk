import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import * as yup from 'yup';
import { Grid, TextField, Paper, makeStyles, Button, Typography} from '@material-ui/core';
import Controls from "../controls/Controls";
import { useForm, Form } from '../useForm';
import * as ticketService from "../../services/ticketService";
import axios from "axios"


const UseStyles = makeStyles({

    root: {
        padding:"30px",
        width:"97%",
    },
    font:{
        fontSize:"0.875rem",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight:"400",
    }, 
    text:{
        color:"#247ba0"
    }, 
    date:{
        fontSize:"0.875rem",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight:"400",
        color:"#247ba0"
    }   
})



export default function Article(props) {
    const classes = UseStyles();




    //     axios.post('/api/ticket/', project)
    
    //   .then(res => console.log(res.data));
    // console.log(`Expense successfully created!`);
    // console.log(`Name: ${values.Title}`);
    // console.log(`Amount: ${values.Description}`);
    // console.log(`Description: ${values.client_id}`);
    // console.log(`Date: ${values.project_id}`);
    // console.log(`Status:${values.status}`);
    //         addOrEdit(values, resetForm);
    //     }
    // }

    // useEffect(() => {
    //     if (recordForEdit != null)
    //         setValues({
    //             ...recordForEdit
    //         })
    // }, [recordForEdit])


    return (
        <Grid item xs={12}>
                <Paper elevation={5} className={classes.root}>
                <Typography variant="h2" className={classes.text}><b>Article Title</b> </Typography>
                <Typography  variant="h6" className={classes.date}><b>Posted on:</b>19 Aug,2021</Typography><br/>
                <Typography color="black" variant="h6" className={classes.font}> 
                        Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.
                    Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.
                    Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.
                    Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.
                    Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.
                    Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.
                    Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.
                    Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.<br/><br/>

                       Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.
                    Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.
                    Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.
                    Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.
                    Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.
                    Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.
                    Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.
                    </Typography><br/>
                    
                        <Typography className={classes.font} color="secondary"><b>Tags:</b> Network, Software, DCIM</Typography>
                   
                </Paper>

            </Grid>

    )
}

