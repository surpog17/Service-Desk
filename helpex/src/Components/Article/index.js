import { Grid, makeStyles, Breadcrumbs,Link, Typography } from '@material-ui/core';
import React from 'react';
import Article from './Article';

const UseStyles = makeStyles({
    root:{
        padding:40,
        marginTop:"-60px"   
    },
    text:{
        color:"#247ba0"
    }
})

const index = () => {
    const classes = UseStyles();
    return (
        <Grid container spacing={4} direction="column" className={classes.root}>
 
            <Grid item sm={13} xs={13} >
             <Breadcrumbs separator="›" aria-label="breadcrumb">
  <Link color="inherit" href="/faq">
    Knowledge Base 
  </Link>
  <Link
className={classes.text}
    href= "/adminticket">
    Article 
  </Link>
</Breadcrumbs>
            </Grid>
        <Article>
        </Article>
        </Grid>
     ); 
}

export default index;