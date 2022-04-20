import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Logo from "../../assets/images/helpxLogo.png";

import React from 'react';
const UseStyles = makeStyles({
    root:{
            left:70,
            top:0,
            maxWidth:"98%"
           
    },

    Toolbar:{
        display:"flex",
        justifyContent: "space-between",
    },

    logo:{
        width: 300,//130
        height: 50,
      },

    icons:{
        paddingRight:35,//40
        color:"#247ba0",
        fontSize:30//40

            },
    titleColor:{
        color:"#247ba0",
        fontSize:50
    },
    
    navbarpaper:{
        zIndex:-1
       
    }

})
const index = () => {
    const classes = UseStyles();
    return (
        <div>    
            <AppBar className={classes.root} color="inherit"  position="fixed" >
                  
                <Toolbar className={classes.Toolbar}>
                
                    {/* <Typography  variant="body1" className={classes.titleColor}> Help Desk</Typography> */}
                    <img
              className={classes.logo}
              src={Logo}
              alt="Help Ex Login Logo"
            ></img>
                   
                  <div>
                        <NotificationsIcon className={classes.icons} fontSize="large"/>
                        <SettingsIcon className={classes.icons} fontSize="large"/>
                        <AccountCircleIcon className={classes.icons} fontSize="large"/>
                        </div>
                   
                </Toolbar>
              
                </AppBar>
        </div>
    );
};

export default index;