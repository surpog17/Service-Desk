import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Logo from "../../assets/images/helpxLogo.png";

export default function SimplePaper() {
  return (
    <Box
      sx={{
        display: 'inlineflex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '100%',
          height: 550,
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: 'inlineflex',
          justifyContent: 'center',

          textAlign: 'center',
          verticalAlign: 'middle',
          color: '#247ba0',
          backgroundImage:
            'url()'
          }}
      >
                <img
                  width="190px" //130
                  height="30px"
                  src={Logo}
                  alt="Help Ex Login Logo"
                />
        <Typography
          variant="h6"
          display="block"
          gutterBottom
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            verticalAlign: 'middle',
            color: '#247ba0',
          }}
        >
          404|Not Found
        </Typography>
      </Paper>
    </Box>
  );
}