import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Employees from './Employees';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
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
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    
  },
  tabs: {
    "& .MuiTabs-indicator": {
      display: "none",
      
     
    },
    "& .MuiTabs-root": {
      maxWidth: 500,
  
    },
    tabPanel: {
      backgroundColor: "rgba(1,1,1,0.1)",
      paddingTop: 12,
      maxWidth: 5004
    },
    newStyle: {
      backgroundColor: 'red',
      '&$selected': {
          backgroundColor: 'blue'
      },
      // style={{backgroundColor:"#cbcfd2",color:"#899399"}}
  }
  
    
  
  }
}));

export default function TabsNew() {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example" 
           className={classes.tabs}>
          <Tab  className={classes.newStyle}
            value="one"
            label="Clients"
            wrapped
            {...a11yProps('one')}
          />
          <Tab className={classes.newStyle} value="two" label="Internal Users" {...a11yProps('two')} />
          <Tab className={classes.newStyle} value="three" label="AdminLand" {...a11yProps('three')} />
        </Tabs>
        
      </AppBar>
      <TabPanel value={value} index="one">
      <Employees/>
      </TabPanel>
      <TabPanel value={value} index="two">
      <Employees/>
      </TabPanel>
      <TabPanel value={value} index="three">
      <Employees/>
      </TabPanel>
    </div>
  );
}
