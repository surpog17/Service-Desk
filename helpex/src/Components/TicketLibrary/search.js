import { Grid, Button, TextField, makeStyles, Paper } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import React from 'react';
const UseStyles = makeStyles({
    root:{
        outline:0,
        borderRadius: "100px"
       
    },

    button:{
        height:35
    }
})
const search = () => {
    const classes = UseStyles();
    return (
        <Grid container spacing={2} alignItems="flex-end"  className={classes.root}>
            <Grid md={10} item>
            <Paper elevation={3}>
            <TextField
            placeholder="Search"
            type="text"
            fullWidth
            variant="outlined" 
            />
            </Paper>
            </Grid>
            <Grid md={2} item>
                {/* <Button startIcon={<SearchOutlined/>} className={classes.button} size="large" variant="contained" color="primary">Search</Button> */}
                <Button className={classes.button} 
          style={{ color: "#fff" }}
          variant="contained"
          color="secondary"
          size="large"
        >
         Search
        </Button>
            </Grid>
        </Grid>
            
        
    );
};

export default search;