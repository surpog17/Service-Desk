import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { makeStyles } from '@material-ui/styles';
import FAQ from './knowledgebase';
const data = [
    {
        id:0,
        issue:"Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.",
        tags:"Open,Closed,Random",
        date:"May 25 2021"
    },
    
    {
        id:0,
        issue:"Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.Amet laborum deserunt exercitation est.Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.",
        tags:"Open,Closed,Random",
        date:"May 25 2021"
    },
    
    {
        id:0,
        issue:"Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.",
        tags:"Open,Closed,Random",
        date:"May 25 2021"
    },
    
    {
        id:0,
        issue:"Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.",
        tags:"Open,Closed,Random",
        date:"May 25 2021"
    },
    
    {
        id:0,
        issue:"Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.",
        tags:"Open,Closed,Random",
        date:"May 25 2021"
    },
    {
        id:0,
        issue:"Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.",
        tags:"Open,Closed,Random",
        date:"May 25 2021"
    },
    
    {
        id:0,
        issue:"Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.",
        tags:"Open,Closed,Random",
        date:"May 25 2021"
    },
    
    {
        id:0,
        issue:"Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.",
        tags:"Open,Closed,Random",
        date:"May 25 2021"
    },
    
    {
        id:0,
        issue:"Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.",
        tags:"Open,Closed,Random",
        date:"May 25 2021"
    },
    
    {
        id:0,
        issue:"Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est.",
        tags:"Open,Closed,Random",
        date:"May 25 2021"
    },

    

]
const UseStyles = makeStyles({

      title: {
        paddingLeft: 15,
      },
     
})
    
const index = () => {
    const classes = UseStyles();
    return (
       <Grid container spacing={4} direction="column">

           <Grid className={classes.root} item sm={12}>
            <Typography color="primary" variant="h4"><span style={{display:"flex", alignItems:"flex-end"}}><HelpOutlineOutlinedIcon style={{fontSize:50, paddingRight:10}}/> Knowledge Base</span></Typography>
           </Grid>

           <Grid item sm={12}>
            
              <FAQ data={data}/>
                    
           </Grid>

       </Grid>
    );
};

export default index;