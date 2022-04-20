import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import useTable from "../useTable";
import * as employeeService from "../../services/employeeService";
import Controls from "../controls/Controls";
import { Search } from "@material-ui/icons";
import Notification from "../Notification";
import ConfirmDialog from "../ConfirmDialog";
import axios from "axios";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    overflow: "hidden auto",
  },
  searchInput: {
    width: "90%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
  title: {
    paddingLeft: 15,
    paddingRight: 500,
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
  advanced: {
    marginLeft: 50,
  },
}));

const headCells = [
  { id: "id", label: "No" },
  { id: "issue", label: "Issue" },
  { id: "tags", label: "Tags" },
  { id: "date", label: "Posted On" },
];

export default function FAQ() {
  const classes = useStyles();
  const history = useHistory();
  const [records, setRecords] = useState(employeeService.getAllEmployees());
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.Name.toLowerCase().includes(target.value)
          );
      },
    });
  };
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
  const changeState = (e, id) => {
    history.push(`/knowlegebases/detail/${id}`);
    console.log(`ID:${id}`);
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`/api/postmortem`).then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  });
  return (
    <div>
      <Paper elevation={2} className={classes.pageContent}>
        <Toolbar>
          <Grid container spacing={9} alignItems="flex-end">
            <Grid item sm={6}>
              {" "}
              <Controls.Input
                style={{}}
                className={classes.searchInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
              />{" "}
            </Grid>
          </Grid>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {data
              .filter((item) => {
                if (search == "") {
                  return item;
                } else if (
                  item.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => {
                return (
                  <TableRow
                    key={item.id}
                    onClick={(e) => changeState(e, item.id)}
                  >
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
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}
