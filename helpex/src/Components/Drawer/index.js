import React, { useState} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme, Typography, Grid, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar,Drawer, CssBaseline, Divider} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import Logo from "../../assets/images/helpxLogo.png";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import DomainOutlinedIcon from "@material-ui/icons/DomainOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import ViewListIcon from '@material-ui/icons/ViewList';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link,useHistory, useParams} from 'react-router-dom'
import Popper from '@material-ui/core/Popper';
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Notification from "./Notification"
import ClearAllIcon from '@material-ui/icons/ClearAll';

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor:"white",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    
  },
  menuButton: {
    marginRight: 36,
    backgroundColor:"#fff"
  
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#247ba0",
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: "#247ba0",
    color:"#fff"
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    
  },
  logo:{
    width: 300,//130
    height: 50,
    marginTop:10,

  },
  icons: {
    color: "#fff",
    fontSize: 40,
    alignContent:"center"
  },
  Closeicons:{
    color:"#247ba0" 
  },
  texts:{
    color:"#fff",
    fontSize:40,
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  },
  Navicons:{
    marginLeft:"35px",
    color:"#247ba0",
  },
  cons:{
    display:"flex",
    justifyContent: "flex-end",
   
  },
  popper: {
    marginTop: "2%"
  }
  // active: {
  //   backgroundColor: "#fff",
  //   borderTopLeftRadius: "40%",
  //   borderBottomLeftRadius: "40%",
  //   paddingTop: 50,
  //   marginBottom:20,
  //   color: "",
  // },
}));

export default function MiniDrawer() {
  const [click, setClick] = useState(4);
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const params = useParams();
  const [placement, setPlacement] = React.useState();
  
  const [open, setOpen] = React.useState(false);
  const [openNotification, setOpenNotification] = React.useState(false);
  const handleClickNotification = (newPlacement) => (event) => {
    setAnchorEls(event.currentTarget);
    setOpenNotification((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEls, setAnchorEls] = React.useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (e ,clientid,userId) => {
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push(`/Profile/${clientid}/${userId}`)
    console.log(params.clientid)
  };
  const changeState = (e, clientid,userId) => {  
    history.push(`/Profile/${clientid}/${userId}`)
    console.log(`ID:${params.clientid}:${userId}`)
   };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={(e) => handleMenuClose(e, params.clientid, params.userId)}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (<AccountCircleIcon onClick={handleProfileMenuOpen} />);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon className={classes.Closeicons} />
          </IconButton>
          <Grid item xs={12}>
          <Typography variant="h6" noWrap>
          <img
              className={classes.logo}
              src={Logo}
              alt="Help Ex Login Logo"
            />
          </Typography>
          </Grid>
          <Popper className={classes.popper} open={openNotification} anchorEl={anchorEls} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={5}>
              <Notification/>
          </Fade>
        )}
      </Popper>
          <div className={classes.cons} >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon onClick={handleClickNotification("bottom-start")} className={classes.Navicons} fontSize="large"/>
            </Badge>
            <SettingsIcon className={classes.Navicons} fontSize="large"/>
            <AccountCircleIcon className={classes.Navicons} fontSize="large" onClick={handleProfileMenuOpen} />
            </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{color:"#fff"}} /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Home"].map((text, index) => (
            <ListItem button key={text}component={Link} to="/">
              <ListItemIcon>
                {index % 2 === 0 ? <HomeOutlined className={classes.icons} /> : <HomeOutlined />}
              </ListItemIcon>
              <ListItemText primary={text} className={classes.texts}/>
            </ListItem>
          ))}
        </List>
        <List>
          {["Library"].map((text, index) => (
            <ListItem button key={text} component={Link} to="/library">
              <ListItemIcon>
                {index % 2 === 0 ? <ViewListIcon className={classes.icons} /> : <ViewListIcon/>}
              </ListItemIcon>
              <ListItemText primary={text} className={classes.texts} />
            </ListItem>
          ))}
        </List>
        <List>
          {["Setting"].map((text, index) => (
            <ListItem button key={text} component={Link} to="/setting">
              <ListItemIcon>
                {index % 2 === 0 ? <DomainOutlinedIcon className={classes.icons} /> : <DomainOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} className={classes.texts}/>
            </ListItem>
          ))}
        </List>
        <List>
          {["FAQ"].map((text, index) => (
            <ListItem button key={text} component={Link} to="/faq">
              <ListItemIcon>
                {index % 2 === 0 ? <HelpOutlineOutlinedIcon className={classes.icons} /> : <HelpOutlineOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} className={classes.texts}/>
            </ListItem>
          ))}
        </List>
        <List>
          {["Ticket Overview"].map((text, index) => (
            <ListItem button key={text} component={Link} to="/ticketoverview">
              <ListItemIcon>
                {index % 2 === 0 ? <ClearAllIcon className={classes.icons} /> : <ClearAllIcon />}
              </ListItemIcon>
              <ListItemText primary={text} className={classes.texts}/>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
