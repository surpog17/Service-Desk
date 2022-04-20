import React,{ useState, useEffect} from 'react';
import { grid, style } from '@mui/system';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useParams } from 'react-router';
import { Typography,Grid, Breadcrumbs, Link, Paper, makeStyles } from '@material-ui/core';
import axios from 'axios';
import moment  from 'moment';
import NoteIcon from '@mui/icons-material/Note';export default function Timelines() {
    const params = useParams();
    const[data,setData]=useState()
    console.log(`noteid:${params.id}`)
    useEffect(()=>{
        axios.get(`/api/notes/${params.id}`)
        .then(response=>{
            console.log(response.data)
            setData(response.data);
            console.log("notes")
            console.log(response.data)
        })
    }, [])

    return (
                <div style={{marginLeft:"-80%"}}>
                   <Timeline position="right">
                   {data && data.map((item) =>{
            return (
              <TimelineItem>
                <TimelineOppositeContent
                  sx={{ m: "auto 0" }}
                  align="right"
                  variant="body2"
                  color="text.secondary"
                >
                  <Typography variant="body1">
                    {item.clientUser_id === null
                      ? "Support Engineer"
                      : item.clientuser.firstName +
                        " " +
                        item.clientuser.lastName}
                  </Typography>
                  {moment(item.created_at).format("LL")}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot>
                    <NoteIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  {(() => {
                    if (item.ticket_status == 1) {
                      return (
                        <div
                          style={{
                            fontWeight: "bold",
                            fontSize: "0.75rem",
                            color: "white",
                            backgroundColor: "#247ba0",
                            borderRadius: 8,
                            padding: "3px 10px",
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
                            fontSize: "0.75rem",
                            color: "white",
                            backgroundColor: "#a8a432",
                            borderRadius: 8,
                            padding: "3px 10px",
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
                            fontSize: "0.75rem",
                            color: "white",
                            backgroundColor: "#D7FC31",
                            borderRadius: 8,
                            padding: "3px 10px",
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
                            fontSize: "0.75rem",
                            color: "white",
                            backgroundColor: "#00b300",
                            borderRadius: 8,
                            padding: "3px 10px",
                            display: "inline-block",
                          }}
                        >
                          closed
                        </div>
                      );
                    }
                  })()}
                  <Typography>{item.Note_Name}</Typography>
                </TimelineContent>
              </TimelineItem>
            );})}
      </Timeline>
  </div>
 
 );
 
};