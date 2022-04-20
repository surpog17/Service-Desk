import {
  Paper,
  Button,
  makeStyles,
  Typography,
  TableBody,
  TableCell,
  Table,
  TableRow,
} from "@material-ui/core";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import React from "react";
const UseStyles = makeStyles({
  root: {
    padding: 50,
    paddingLeft: 15,
    height: '450px',
    overflow: 'hidden auto',
  },

  align: {
    display: "flex",
    justifyContent: "flex-end",
  },
  title: {
    paddingBottom: 20,
    paddingLeft: 15,
  },

});


const MyTickets = props => {
  const classes = UseStyles();
  return (
    <Paper elevation={5} className={classes.root}>
      <div className={classes.align}>
        <Button
          style={{ color: "#fff" }}
          variant="contained"
          color="secondary"
          startIcon={<HelpOutlineOutlinedIcon />}
        >
        My Tickets
        </Button>
        
      </div>

      <Typography className={classes.title} variant="h4" color="primary">
         My Tickets 
      </Typography>
      <Table>
        <TableBody>
          {props.data.map((res, index) => (
            <TableRow
              key={index}
            >
              <TableCell>{res}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default MyTickets;
