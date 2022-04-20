import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Clients from './Clients';
import Employees from './Employees';
import AdminLand from './AdminLand';
import LevelManagement from './LevelManagement';
import RoleManagement from './RoleManagement';
import { Grid } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  // grid: {
  //   paddingLeft:-12,
  // },
  tabs: {
    "& .MuiTabs-indicator": {
      backgroundColor:"#",  
      display: "none",
    
    }
  
  },
  title: {
    // paddingBottom: 5,
    paddingLeft: 15,
  
  },
  
 
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar style={{color:"black",backgroundColor:"#f2f2f2"}}className={classes.Tabstyle} position="static">
        <Tabs
          variant="standard"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab  className={classes.tabBk} label="Clients" href="/clients"
           {...a11yProps(0)} />
          <LinkTab label="Employees" href="/Employees" {...a11yProps(1)} />
          <LinkTab label="AdminLand" href="/AdminLand" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel className={classes.tabBk} value={value} index={0}>
        <Clients/>
      </TabPanel>
      <TabPanel  className={classes.tabBk} value={value} index={1}>
      <Employees/>
      </TabPanel>
      <TabPanel  className={classes.tabBk} value={value} index={2}>
    


      <Grid item xs={12} className={classes.grid}>
                <Grid container spacing={4}>
                <Grid item sm={6}>                
                <RoleManagement/></Grid>
                <Grid item sm={6}>
          <LevelManagement/></Grid>
                </Grid>
            </Grid>
      </TabPanel>
    </div>
  );
}
