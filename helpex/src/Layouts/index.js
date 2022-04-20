import { makeStyles, Grid, Hidden } from '@material-ui/core';
import React from 'react';
import NavBar from "./../Components/Navbar"
import Drawer from "./../Components/Drawer"
const UseStyles = makeStyles({
    root:{
        display:"flex",
    },

    page:{
        width: "95%",
        flexGrow:1
    },

    Drawer: {
       
        position:"fixed",
        backgroundColor:"#247ba0"
    },
    nav:{
        height:55,
        marginBottom:60
    }

})


const index = (props) => {
    const classes = UseStyles();

    return (
            <div>
        {/* <Hidden smDown> <div className={classes.Drawer}> <Drawer/> </div> </Hidden> */}
        <Grid container justifyContent="center">
        
            <Grid justifyContent="center" item xs={11}>
            
            
            <div className={classes.root}>
            <Drawer/>
            <div className={classes.page}>
            <div className={classes.nav}></div>
                {props.children}
            </div>

            </div>


            </Grid>

        </Grid>
     
           
           </div>
    
    );
};

export default index;