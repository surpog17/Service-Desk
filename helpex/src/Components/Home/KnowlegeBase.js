// import {
//   Paper,
//   Button,
//   makeStyles,
//   Typography,
//   TableBody,
//   TableCell,
//   Table,
//   TableRow,
// } from "@material-ui/core";
// import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
// import React from "react";
// const UseStyles = makeStyles({
//   root: {
//     padding: 50,
//     paddingLeft: 15,
//     height: '450px',
//     overflow: 'hidden auto',
//   },

//   align: {
//     display: "flex",
//     justifyContent: "flex-end",
//   },
//   title: {
//     paddingBottom: 20,
//     paddingLeft: 15,
//   },
 
// });
// const KnowlegeBase = props => {
//   const classes = UseStyles();
//   return (
//     <Paper elevation={5} className={classes.root}>
//       <div className={classes.align}>
//         <Button
//           style={{ color: "#fff" }}
//           variant="contained"
//           color="secondary"
//           startIcon={<HelpOutlineOutlinedIcon />}
//         >
//           Knowledge Base
//         </Button>
//       </div>

//       <Typography className={classes.title} variant="h4" color="primary">
//         Knowledge Base 
//       </Typography>
//       <Table>
//         <TableBody>
//           {props.data.map((res, index) => (
//             <TableRow
//               key={index}
//             >
//               <TableCell>{res}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Paper>
//   );
// };

// export default KnowlegeBase;
import { Paper, Button, makeStyles, Typography, TableBody, TableCell, Table, TableRow } from '@material-ui/core';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import React from 'react';
const UseStyles = makeStyles({
    root:{
        padding:10,
        paddingLeft:15
    },

    align:{
        display:"flex",
        justifyContent:"flex-end"
    },
    even:{
        backgroundColor:"#f3ffbd"
        }
})
const KnowlegeBase = (props) => {
    const classes = UseStyles()
    return (
       <Paper elevation={5} className={classes.root}>
           <div className={classes.align}>
           <Button style={{color:"#fff"}} variant="contained" color="secondary" startIcon={<HelpOutlineOutlinedIcon/>}>Knowledge Base</Button>
           </div>

           <Typography variant="h6" color="primary">Knowledge Base</Typography>
            <Table>
                <TableBody>
                {

                    props.data.map( (res, index) => 
                    <TableRow key={index} className={index%2==0? classes.even : {}}>
                    <TableCell >{res}</TableCell>
                    </TableRow>
                    ) 

                }    
                </TableBody>
            </Table>
            

       </Paper>
    );
};

export default KnowlegeBase;