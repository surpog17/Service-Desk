import React, { useState, useEffect } from "react";
import {
  Paper,
  makeStyles,
  Grid,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  Typography,
} from "@material-ui/core";
import useTable from "../../Components/useTable";
import * as employeeService from "../../services/employeeService";
import Controls from "../../Components/controls/Controls";
import axios from "axios";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
  searchInput: {
    width: "50%",
  },
  newButton: {
    position: "absolute",
    right: "9px",
  },
  priority: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
}));

const headCells = [{ id: "id", label: "No" }];

export default function KnowlegeBase() {
  const classes = useStyles();
  const [records, setRecords] = useState(employeeService.getAllEmployees());
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { TblContainer, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`/api/postmortem`).then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  });
  const changeState = (e, id) => {
    history.push(`/knowlegebases/detail/${id}`);
    console.log(`ID:${id}`);
  };
  return (
    <Paper elevation={2} className={classes.pageContent}>
      <Toolbar>
        <Grid container>
          <Typography variant="h4" color="primary">
            Knowledge Base
          </Typography>{" "}
        </Grid>
        <Controls.Button
          variant="contained"
          text="Knowledge Base"
          color="secondary"
          href="/faq"
          className={classes.newButton}
        />
      </Toolbar>
      <TblContainer>
        {data
          .filter((item) => {
            if (search == "") {
              return item;
            } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
              return item;
            }
          })
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item, index) => {
            return (
              <TableRow key={item.id} onClick={(e) => changeState(e, item.id)}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.ticket.Issue}</TableCell>
                <TableCell>
                  {(() => {
                    if (item.ticket.Tag_id == 1) {
                      return (
                        <div
                          style={{
                            fontWeight: "bold",
                            fontSize: "1rem",
                            color: "black",
                            padding: "10px 0px",
                            display: "inline-block",
                          }}
                        >
                          SLA
                        </div>
                      );
                    }
                    if (item.ticket.Tag_id == 2) {
                      return (
                        <div
                          style={{
                            fontWeight: "bold",
                            fontSize: "1rem",
                            color: "black",
                            padding: "10px 0px",
                            display: "inline-block",
                          }}
                        >
                          PMR
                        </div>
                      );
                    }
                    if (item.ticket.Tag_id == 3) {
                      return (
                        <div
                          style={{
                            fontWeight: "bold",
                            fontSize: "1rem",
                            color: "black",
                            padding: "10px 0px",
                            display: "inline-block",
                          }}
                        >
                          Lesson Learned
                        </div>
                      );
                    }
                  })()}
                </TableCell>
                <TableCell>{item.dateOfIncident}</TableCell>
              </TableRow>
            );
          })}
      </TblContainer>
      <TblPagination />
    </Paper>
  );
}
