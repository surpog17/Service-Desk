import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Tabs, Tab, Typography, AppBar, Box } from '@material-ui/core';
import Employee from './Employee';

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
  tabs: {
    "& .MuiTabs-indicator": {
      display: "none",
      backgroundColor:"#f2f2f2",
    
    }
  
  }
 
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.Tabstyle} position="static">
        <Tabs
          variant="standard"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab  className={classes.tabBk} label="Employees" href="/Employees" {...a11yProps(0)} />
          
        </Tabs>
      </AppBar>
      <TabPanel className={classes.tabBk} value={value} index={0}>
        <Employee/>
      </TabPanel>

    </div>
  );
}
