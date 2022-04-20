import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import {
  Paper,
  makeStyles,
  Grid,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import useTable from "../../Components/useTable";
import * as clientService from "../../services/clientService";
import TablePagination from "@material-ui/core/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Controls from "../../Components/controls/Controls";
import { Search } from "@material-ui/icons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > :not(style)": {
      m: 1,
      margin: theme.spacing(2),
    },
  },
  ticketoverview: {
    marignTop: "100px",
  },
}));
const headCells = [
  { id: 0, label: "TIcket ID" },
  { id: "Issue", label: "Issue" },
  { id: "Project", label: "Project" },
  { id: "Client", label: "Client" },
  { id: "Timeelapsed", label: "Time Elapsed" },
  { id: "Priority", label: "Priority" },

  { id: "Assignedto", label: "Assigned To" },
  { id: "Tags", label: "Tags" },
  { id: "Status", label: "Status" },
];
export default function SimplePaper() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(clientService.getAllClients());
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState("");
  const [loding, setLoding] = React.useState(false);
  const history = useHistory();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { TblContainer, TblHead } = useTable(records, headCells, filterFn);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`/api/ticket`).then((response) => {
      setData(response.data);
      setLoding(true);
      console.log(response.data);
    });
  }, []);
  const changeState = (e, id) => {
    history.push(`/ticketoverviews/detail/${id}`);
    console.log(`ID:${id}`);
  };
  return (
    <Paper>
      <Grid container spacing={1}>
        <Grid item xs={12} style={{ padding: "50px 30px", color: "#247ba0" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <ClearAllIcon style={{ fontSize: "40px" }} />
            <Typography variant="h4">Ticket Overview</Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Toolbar>
            <Grid container></Grid>
            <Controls.Input
              label="Search Client"
              className={classes.searchInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </Toolbar>
          <TblContainer>
            <TblHead />
            {data
              .filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item.clients.ClientName.toLowerCase().includes(
                    search.toLowerCase()
                  )
                ) {
                  return item;
                } else if (
                  item.projects.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ) {
                  return item;
                } else if (
                  item.Issue.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell onClick={(e) => changeState(e, item.id)}>
                      {item.id}
                    </TableCell>
                    <TableCell onClick={(e) => changeState(e, item.id)}>
                      {item.Issue}
                    </TableCell>
                    <TableCell onClick={(e) => changeState(e, item.id)}>
                      {item.projects.name}
                    </TableCell>
                    <TableCell onClick={(e) => changeState(e, item.id)}>
                      {item.clients.ClientName}
                    </TableCell>
                    <TableCell onClick={(e) => changeState(e, item.id)}>
                      {moment(item.created_at).startOf("day", "hour").fromNow()}
                    </TableCell>
                    <TableCell onClick={(e) => changeState(e, item.id)}>
                      {(() => {
                        if (item.Priorty == 1) {
                          return (
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "0.75rem",
                                color: "white",
                                backgroundColor: "#ff0000",
                                width: "90px",
                                borderRadius: 8,
                                padding: "3px 33px",
                                display: "inline-block",
                              }}
                            >
                              High
                            </div>
                          );
                        }
                        if (item.Priorty === 2) {
                          return (
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "0.75rem",
                                color: "white",
                                width: "90px",
                                borderRadius: 8,
                                padding: "3px 23px",
                                display: "inline-block",
                                backgroundColor: "#247ba0",
                              }}
                            >
                              Medium
                            </div>
                          );
                        }
                        if (item.Priorty === 3) {
                          return (
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "0.75rem",
                                color: "white",
                                backgroundColor: "#00b300",
                                width: "90px",
                                borderRadius: 8,
                                padding: "3px 33px",
                                display: "inline-block",
                              }}
                            >
                              Low
                            </div>
                          );
                        }
                      })()}
                    </TableCell>
                    <TableCell onClick={(e) => changeState(e, item.id)}>
                      {item.internaluser_id === null ? (
                        <div style={{}}>Not assigned</div>
                      ) : (
                        item.internaluser.firstName +
                        " " +
                        item.internaluser.lastName
                      )}
                    </TableCell>
                    <TableCell onClick={(e) => changeState(e, item.id)}>
                      {(() => {
                        if (item.Tag_id == 1) {
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
                        if (item.Tag_id == 2) {
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
                        if (item.Tag_id == 3) {
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
                    <TableCell onClick={(e) => changeState(e, item.id)}>
                      {(() => {
                        if (item.ticket_status == 1) {
                          return (
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "0.75rem",
                                color: "white",
                                width: "90px",
                                borderRadius: 8,
                                padding: "3px 33px",
                                display: "inline-block",
                                backgroundColor: "#247ba0",
                              }}
                            >
                              New
                            </div>
                          );
                        }
                        if (item.ticket_status == 2) {
                          return (
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "0.75rem",
                                color: "white",
                                borderRadius: 8,
                                width: "90px",
                                padding: "3px 28px",
                                display: "inline-block",
                                backgroundColor: "#a8a432",
                              }}
                            >
                              Open
                            </div>
                          );
                        }
                        if (item.ticket_status == 3) {
                          return (
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "0.75rem",
                                width: "fit-content",
                                color: "white",
                                borderRadius: 8,
                                padding: "3px 20px",
                                display: "inline-block",
                                backgroundColor: "#d7fc31",
                              }}
                            >
                              In Progress
                            </div>
                          );
                        }
                        if (item.ticket_status == 4) {
                          return (
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "0.75rem",
                                color: "white",
                                width: "90px",
                                borderRadius: 8,
                                padding: "3px 23px",
                                display: "inline-block",
                                backgroundColor: "#70c1b3",
                              }}
                            >
                              Closed
                            </div>
                          );
                        }
                      })()}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TblContainer>
        </Grid>
      </Grid>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
