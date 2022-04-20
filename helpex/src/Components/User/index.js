import { Typography,Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import PendingTickets from './PendingTickets';
import ActiveTickets from './ActiveTickets';
import ClosedTicket from './ClosedTickets';

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
            <Grid justifyContent="center" container  spacing={9} > 
            <Grid item md={12}><PendingTickets/></Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                        <Grid item sm={7}><ActiveTickets/></Grid>
                        <Grid item sm={5}><ClosedTicket/></Grid>
                </Grid>
            </Grid>
           </Grid>
       </Grid>
    );
};

export default index;