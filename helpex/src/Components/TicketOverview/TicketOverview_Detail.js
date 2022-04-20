import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import Postmortem from "./Postmortem.js";
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
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Controls from "../../Components/controls/Controls";
import FormControl from "@mui/material/FormControl";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Assignedto from "./AssignedTo";
import Popup from "../../Components/Popup";
import * as userService from "../../services/userService";

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
  const [openPopuppost, setOpenPopupPost] = useState(false);
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

  const params = useParams();
  const { TblContainer, TblHead } = useTable(records, headCells, filterFn);
  const openInPopup = (e, id) => {
    setRecordForEdit(id);
    console.log(`id:${id}`);
    setOpenPopup(true);
  };
  const openInPopupPost = (e, id) => {
    setRecordForEdit(id);
    console.log(`id:${id}`);
    setOpenPopupPost(true);
  };

  const addOrEdit = (user, resetForm) => {
    if (user.id == 0) {
      userService.insertUser(user);
    } else userService.updateUser(user);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setOpenPopupPost(false);
    setRecords(userService.getAllUsers());
    const project = {
      priorty: user.Priorty,
    };
    axios
      .put(`/api/ticket/${user.id}?Priorty=${user.Priorty}`, project)
      .then((res) => console.log(res.data));
    console.log(`Expense successfully created!`);
    console.log(`/api/ticket/${user.id}?Priorty=${user.Priorty}`);
    console.log(`Priorty: ${user.Priorty}`);
    console.log(`id:${user.id}`);
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };
  const open_ticket = 2;
  const Openhandler = (e) => {
    axios
      .put(`/api/ticket/${params.id}?ticket_status=${open_ticket}`)
      .then((res) => console.log(res.data));
    66;
  };
  const [data, setData] = useState({ posts: [] });
  useEffect(() => {
    axios.get(`/api/ticketdetail/${params.id}`).then((response) => {
      console.log(response.data);
      setData({ posts: [response.data] });
      //setPost({ posts: [result.data] });
    });
  }, [params.id]);

  return (
    data.posts &&
    data.posts.map((item) => {
      return (
        <Paper style={{ height: "400px" }}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              style={{ padding: "50px 30px", color: "#247ba0" }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <ClearAllIcon style={{ fontSize: "40px" }} />
                <Typography variant="h4">Ticket Overview</Typography>
              </div>
            </Grid>
            <TblContainer>
              <TblHead />

              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.Issue}</TableCell>
                <TableCell>{item.projects.name}</TableCell>
                <TableCell>{item.clients.ClientName}</TableCell>
                <TableCell>
                  {moment(item.created_at).startOf("day", "hour").fromNow()}
                </TableCell>
                <TableCell>
                  {(() => {
                    if (item.Priorty === 1) {
                      return (
                        <div
                          style={{
                            fontWeight: "bold",
                            fontSize: "0.75rem",
                            color: "white",
                            backgroundColor: "#ff0000",
                            borderRadius: 8,
                            padding: "3px 10px",
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
                            borderRadius: 8,
                            padding: "3px 10px",
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
                            borderRadius: 8,
                            padding: "3px 10px",
                            display: "inline-block",
                          }}
                        >
                          Low
                        </div>
                      );
                    }
                  })()}
                </TableCell>
                <TableCell>
                  {item.internaluser_id === null ? (
                    <div
                      onClick={(e) => {
                        openInPopup(e, item.id);
                      }}
                      style={{
                        fontWeight: "bold",
                        fontSize: "0.75rem",
                        color: "white",
                        backgroundColor: "#ff0000",
                        borderRadius: 8,
                        padding: "0px 20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "fit-content",
                      }}
                    >
                      Assign to
                      <div>
                        <ArrowDropDownIcon />
                      </div>
                    </div>
                  ) : (
                    item.internaluser.firstName +
                    " " +
                    item.internaluser.lastName
                  )}
                </TableCell>{" "}
                <TableCell>
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
                <TableCell>
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
                            color: "white",
                            borderRadius: 8,
                            padding: "3px 20px",
                            display: "inline-block",
                            width: "fit-content",
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
            </TblContainer>
            {(() => {
              if (item.ticket_status != 4) {
                return (
                  <Controls.Button
                    style={{ margin: "30px" }}
                    type="submit"
                    text="Close Ticket"
                    onClick={(e) => {
                      openInPopupPost();
                    }}
                  />
                );
              } else {
                return (
                  <Controls.Button
                    style={{ margin: "30px" }}
                    type="submit"
                    text="Reopen Ticket"
                    onClick={(e) => {
                      Openhandler();
                    }}
                  />
                );
              }
            })()}

            {/* <Grid xs={12} style={{ display: "flex" }}>
              
            </Grid> */}
          </Grid>
          <Popup
            title="Assign to"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <Assignedto
              // recordForEdit={recordForEdit}
              addOrEdit={addOrEdit}
            />
          </Popup>

          <Popup
            title="Post Mortem Report"
            openPopup={openPopuppost}
            setOpenPopup={setOpenPopupPost}
          >
            <Postmortem recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
          </Popup>
        </Paper>
      );
    })
  );
}
