import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import * as yup from 'yup';
import { Grid, TextField, Paper, makeStyles, Button, Typography} from '@material-ui/core';
import Controls from "../controls/Controls";
import { useForm, Form } from '../useForm';
import * as ticketService from "../../services/ticketService";
import axios from "axios"
import { useParams } from 'react-router';
import moment from 'moment'
import Action from './Action';
import Timelines from './Timeline';
import it from "date-fns/esm/locale/it/index.js";

const UseStyles = makeStyles({
  root: {
    padding: "50px",
    width: "97%",
  },
  font: {
    fontSize: "0.875rem",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: "400",
  },
});

const Ticket = () => {
  const classes = UseStyles();
  const params = useParams();
  const datas = "news";
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
        <Grid item xs={12}>
          <Paper elevation={5} className={classes.root}>
            <Typography variant="h5">Issue </Typography>
            <Typography>{item.Issue}</Typography>
            <br />
            <Typography variant="h5" color="primary">
              Issue Description
            </Typography>
            <Typography color="black" variant="h6" className={classes.font}>
              {item.Description}
            </Typography>
            <br />
            {/* <Typography  variant="h6" style={{color:"#247ba0"}}><span>Client Super Admin Name / <Link href="#" style={{color:"#247ba0"}}>Client Super Admin Email</Link></span></Typography> */}
            <Grid container direction="row">
              <Grid item xs={3}>
                <Typography variant="h5" color="primary">
                  Priority
                </Typography>
                <Typography>
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
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5" color="primary">
                  Tag
                </Typography>
                <Typography>
                  {(() => {
                    if (item.Tag_id === 1) {
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
                    if (item.Tag_id === 2) {
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
                    if (item.Tag_id === 3) {
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
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5" color="primary">
                  Ticket Status{" "}
                </Typography>

                <Typography>
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
                            width: "90px",
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
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5" color="primary">
                  Project{" "}
                </Typography>
                <Typography>{item.projects.name}</Typography>
              </Grid>
            </Grid>
            <br />
            <Typography variant="h5" color="primary">
              When did you face this issue?
            </Typography>
            <Typography> {moment(item.date).format("LLLL")}</Typography>
            <br />
            <Typography variant="h5" color="primary">
              Add Attachments
            </Typography>
            <Typography>{item.document}</Typography>
            <br />
            <Grid item xs={12}>
              <Timelines />
            </Grid>
            <Grid item xs={12}>
              <Action data={item.ticket_status} />
            </Grid>
          </Paper>
        </Grid>
      );
    })
  );
};
export default Ticket;
