import { Typography,Grid, Breadcrumbs, Link, Paper, makeStyles } from '@material-ui/core';
import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import Action from "./Action";
import { useParams } from 'react-router';
import moment  from 'moment';
import DownloadIcon from '@mui/icons-material/Download';
import { grid, style } from '@mui/system';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Timelines from './Timeline'
const UseStyles = makeStyles({
    root:{
      
        padding:20,
        paddingRight:"-20px",
            },
    banner:{
        padding:'2rem',
        justifyContent:"space-between"

    },
    title: {
        // paddingBottom: "-450px",
        paddingLeft: 15,
    },
    crumb:{
        padding:20,
        marginTop:"-60px"   
    },
    color: {
      color:"#247ba0"
    },
    high:{
        fontWeight: 'bold',
        fontSize: '1rem',
        color: 'white',
        width:'200px',
        height: '40px',
        borderRadius: 50,
        padding: '10px 80px',
        display: 'inline-block',
        backgroundColor: '#ff1654'
    },
    medium:{
        fontWeight: 'bold',
        fontSize: '1rem',
        color: 'white',
        width:'200px',
        height: '40px',
        borderRadius: 50,
        padding: '10px 80px',
        display: 'inline-block',
        backgroundColor: '#247ba0',
    },
    text:{
      fontWeight: 'bold',
    }



})
const index = () => {
    const classes = UseStyles();
    const params=useParams();
    const[data,setData]=useState({ posts: [] })
    useEffect(() => {
      axios.get(`/api/ticketdetail/${params.id}`).then((response) => {
        console.log(response.data);
        setData({ posts: [response.data] });
      });
    }, [params.id]);
    return (
      data.posts &&
      data.posts.map((item) => {
        return (
          <Grid
            container
            direction="column"
            spacing={2}
            className={classes.root}
          >
            <Grid item xs={6}>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link color="inherit" href="/">
                  Home
                </Link>
                <Link className={classes.color} href="/user">
                  Ticket
                </Link>
              </Breadcrumbs>
            </Grid>
            <Paper elevation={2} className={classes.banner}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <Typography
                  variant="h5"
                  color="primary"
                  className={classes.text}
                  style={{ display: "flex" }}
                  key={item.id}
                >
                  Issue:
                  <br />
                  <Typography variant="h5">{item.Issue}</Typography>
                </Typography>

                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    position: "absolute",
                    right: "120px",
                  }}
                >
                  {/* position: 'absolute',
        right: '10px' */}

                  {(() => {
                    if (item.Priorty === 1) {
                      return <div className={classes.high}>High</div>;
                    }
                    if (item.Priorty === 2) {
                      return <div className={classes.medium}>Medium</div>;
                    }
                    if (item.Priorty === 3) {
                      return (
                        <div
                          style={{
                            fontWeight: "bold",
                            fontSize: "1rem",
                            color: "white",
                            width: "200px",
                            height: "40px",
                            borderRadius: 50,
                            padding: "10px 80px",
                            display: "inline-block",
                            backgroundColor: "#70c1b3",
                          }}
                        >
                          Low
                        </div>
                      );
                    }
                  })()}
                  {(() => {
                    if (item.ticket_status == 1) {
                      return (
                        <div
                          style={{
                            fontWeight: "bold",
                            fontSize: "1rem",
                            color: "white",
                            backgroundColor: "#247ba0",
                            borderRadius: 50,
                            width: "200px",
                            height: "40px",
                            padding: "10px 80px",
                            display: "inline-block",
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
                            fontSize: "1rem",
                            color: "white",
                            backgroundColor: "#a8a432",
                            borderRadius: 50,
                            width: "200px",
                            height: "40px",
                            padding: "10px 80px",
                            display: "inline-block",
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
                            fontSize: "1rem",
                            color: "white",
                            backgroundColor: "#D7FC31",
                            borderRadius: 50,
                            width: "200px",
                            height: "40px",
                            padding: "10px 55px",
                            display: "inline-block",
                          }}
                        >
                          In progress
                        </div>
                      );
                    }
                    if (item.ticket_status == 4) {
                      return (
                        <div
                          style={{
                            fontWeight: "bold",
                            fontSize: "1rem",
                            color: "white",
                            backgroundColor: "#00b300",
                            borderRadius: 50,
                            width: "200px",
                            height: "40px",
                            padding: "10px 75px",
                            display: "inline-block",
                          }}
                        >
                          closed
                        </div>
                      );
                    }
                  })()}
                </div>
                <br />

                <Typography
                  variant="body2"
                  color="primary"
                  className={classes.color}
                >
                  {" "}
                  {moment(item.date).format("LLLL")}
                </Typography>
              </div>
              <Typography color="#247ba0">
                <p></p>
              </Typography>
              <Typography variant="h6" color="primary" className={classes.text}>
                Issue Description:
              </Typography>
              <Typography>
                <p>{item.Description}</p>
              </Typography>
              <Typography variant="h6" color="primary" className={classes.text}>
                Attachments:{" "}
              </Typography>
              <Typography>
                <p className={classes.color}>
                  {item.document}
                  <a
                    href={`http://172.25.16.100:8000/api/download/${item.document}`}
                    download
                  >
                    <DownloadIcon />
                  </a>
                </p>
              </Typography>
              <Typography variant="h6" color="primary" className={classes.text}>
                Notes{" "}
              </Typography>
              <Grid item xs={12}>
                <Grid item sm={12}>
                  <Timelines />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item sm={12}>
                  <Action />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        );
      })
    );
    
};
export default index;
