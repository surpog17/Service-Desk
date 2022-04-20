import { Grid, makeStyles, Typography} from '@material-ui/core';
import React from 'react';
// import Clients from './Clients';
// import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import Tabs from './Tabs';
// import Tabs from './TabsNew';

const UseStyles = makeStyles({
    banner: {
        padding: 20,
        display: "flex",
        justifyContent: "space-between"
    },
    

})


const index = () => {
    

    return (
        <Grid container direction="column" spacing={6} className="{classes.UseStyles}">
            <Grid item md={12}>
                <Tabs />
            </Grid>
        </Grid>
    );
};

export default index;