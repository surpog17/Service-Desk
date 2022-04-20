import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@mui/material/Collapse';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function FAQ() {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };
  const handleClick4 = () => {
    setOpen4(!open4);
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  }));
  

  return (
      
        <Paper>
      <Grid item xs={12} sx={{ justifyContent: 'center' }}>
      <Grid item xs={12}  sx={{ display: 'flex', padding:'30px 350px', gap:'20px' }}>
          <HelpOutlineIcon style={{fontSize:'55px', color:'#247ba0'}} />
       <Typography variant="h3" color="#247ba0">
       Frequently Asked Questions
       </Typography>
      </Grid>
      <Grid item xs={12}  sx={{ display: 'flex', padding:'0px 430px'}}>
       <Typography variant="body1" color="#247ba0" sx={{ display: 'flex'}}>
       Everything you need to know about HelpEx
       </Typography>
       </Grid>
        <br />
        <Grid item xs={12}  sx={{ display:'grid' ,padding:'0px 70px 50px', gap:'10px', justifyContent:'center'}}>
        <div onClick={handleClick} sx={{ display: 'flex' }}>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{ color: '#374955' }}
          >
            How do i update my profile ?
            {open ? (
              <RemoveCircleIcon
                sx={{
                  marginLeft: '390px',
                  fontSize: 'medium',
                }}
              />
            ) : (
              <AddCircleIcon
                sx={{
                  marginLeft: '390px',
                  fontSize: 'medium',
                }}
              />
            )}
          </Typography>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              sx={{
                color: '#374955',
              }}
            >
              To change your profile picture
              <br />
              1.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse tellus est, tincidunt nec cursus sit amet, laoreet ac
              eros.
              <br />
              2.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse tellus est, tincidunt nec cursus sit amet, laoreet ac
              eros.
            </Typography>
          </Collapse>
        </div>
        <div onClick={handleClick1} sx={{ display: 'flex' }}>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{ color: '#374955' }}
          >
            Question lorem ipsum dolor sit amet?
            {open1 ? (
              <RemoveCircleIcon
                sx={{ marginLeft: '257px', fontSize: 'medium' }}
              />
            ) : (
              <AddCircleIcon sx={{ marginLeft: '257px', fontSize: 'medium' }} />
            )}
          </Typography>
          <Collapse in={open1} timeout="auto" unmountOnExit>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              sx={{ color: '#374955' }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse tellus est, tincidunt nec cursus sit amet, laoreet ac
              eros.
            </Typography>
          </Collapse>
        </div>
        <div onClick={handleClick2} sx={{ display: 'flex' }}>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{ color: '#374955' }}
          >
            Question lorem ipsum dolor sit amet?
            {open2 ? (
              <RemoveCircleIcon
                sx={{ marginLeft: '257px', fontSize: 'medium' }}
              />
            ) : (
              <AddCircleIcon sx={{ marginLeft: '257px', fontSize: 'medium' }} />
            )}
          </Typography>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              sx={{ color: '#374955' }}
            ></Typography>
          </Collapse>
        </div>
        <div onClick={handleClick3} sx={{ display: 'flex' }}>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{ color: '#374955' }}
          >
            Question lorem ipsum dolor sit amet?
            {open3 ? (
              <RemoveCircleIcon
                sx={{ marginLeft: '257px', fontSize: 'medium' }}
              />
            ) : (
              <AddCircleIcon sx={{ marginLeft: '257px', fontSize: 'medium' }} />
            )}
          </Typography>
          <Collapse in={open3} timeout="auto" unmountOnExit>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              sx={{ color: '#374955' }}
            ></Typography>
          </Collapse>
        </div>
        <div onClick={handleClick4} sx={{ display: 'flex' }}>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{ color: '#374955' }}
          >
            Question lorem ipsum dolor sit amet?
            {open4 ? (
              <RemoveCircleIcon
                sx={{ marginLeft: '257px', fontSize: 'medium' }}
              />
            ) : (
              <AddCircleIcon sx={{ marginLeft: '257px', fontSize: 'medium' }} />
            )}
          </Typography>
          <Collapse in={open4} timeout="auto" unmountOnExit>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              sx={{ color: '#374955' }}
            ></Typography>
          </Collapse>
        </div>
        </Grid>
      </Grid>
      </Paper>
  );
}