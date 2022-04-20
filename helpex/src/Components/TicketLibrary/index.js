import { Typography,Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import OpenTickets from './OpenTickets';
import ReslovedIssues from './ResolvedIssues'
import ViewListIcon from '@material-ui/icons/ViewList';

const UseStyles = makeStyles({
    root:{             
    },
    text: {
        fontSize:50,
        paddingRight:10,
    },
    icon: {
        display: 'flex',
        alignItems: 'flex-end',
    }
})
const index = () => {
    const classes = UseStyles();
    return (
       <Grid justifyContent="center" container className={classes.root} direction="column" spacing={5}>
           
           <Grid item md={12}>
                <Grid container spacing={4}>
                    <Grid item md={6}>
                    <Typography color="primary" variant="h4"><span className={classes.icon}><ViewListIcon className={classes.text}/>Ticket Library</span></Typography>
                    </Grid>
                   </Grid>
           </Grid>
           <Grid item md={12}>
            <Grid justifyContent="center" container  spacing={9} > 
            <Grid item md={12}><OpenTickets/></Grid>
            <Grid item md={12}><ReslovedIssues/></Grid>
            </Grid>
           </Grid>
       </Grid>
    );
};

export default index;