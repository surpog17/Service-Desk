import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import axios from "axios";
import { useParams } from "react-router";
export default function FAQ() {
  const params = useParams();
  const [data, setData] = useState({ posts: [] });
  console.log(`testid:${params.id}`);
  useEffect(() => {
    axios.get(`/api/postmortem/${params.id}`).then((response) => {
      console.log(response.data);
      setData({ posts: [response.data] });
      //setPost({ posts: [result.data] });
    });
  }, [params.id]);
  return (
    data.posts &&
    data.posts.map((item) => {
      return (
        <Paper>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", padding: "30px 20px", gap: "20px" }}
          >
            <HelpOutlineIcon style={{ fontSize: "40px", color: "#247ba0" }} />
            <Typography variant="h4" color="#247ba0">
              Knowledge Base
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "grid", padding: "0px 80px 50px", gap: "10px" }}
          >
            <Grid>
              <Typography variant="h5" color="#5d6c76">
                Issue
              </Typography>
              <Typography variant="body1" color="#5d6c76">
                {item.ticket.Issue}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h5" color="#5d6c76">
                What happened?
              </Typography>
              <Typography variant="body1" color="#5d6c76">
                {item.whatHappened}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h5" color="#5d6c76">
                Why did it happen?
              </Typography>
              <Typography variant="body1" color="#5d6c76">
                {item.why_did_it_Happen}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h5" color="#5d6c76">
                How did we respond and resolve the issue?
              </Typography>
              <Typography variant="body1" color="#5d6c76">
                {item.how_was_it_Resolved}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h5" color="#5d6c76">
                Recommendation
              </Typography>
              <Typography variant="body1" color="#5d6c76">
                {item.recomendation}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      );
    })
  );
}
