import React,{useState} from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import DialogActions from "@mui/material/DialogActions";
import Controls from "../../Components/controls/Controls";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Grid,InputAdornment, IconButton, makeStyles } from '@material-ui/core';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
}));
const Input = styled("input")({
  display: "none"
});
const useStyles = makeStyles((theme) => ({
    button: {
      //margin: theme.spacing(3),
    marignTop:"10%"
    },
 }));

export default function BasicGrid() {
    const classes=useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [showcomfirmPassword, setShowConfirmPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);   
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleconfirmClickShowPassword = () => setShowConfirmPassword(!showcomfirmPassword);
    const handleconfirmMouseDownPassword = () => setShowConfirmPassword(!showcomfirmPassword);
    const handleNewClickShowPassword = () => setShowNewPassword(!showNewPassword);
    const handleNewMouseDownPassword = () => setShowNewPassword(!showNewPassword);

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false
  });  
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const [file, setFile] = useState(null);

    const handleChange = function loadFile(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0]);
            setFile(file);
            console.log("files:"+file)
        }
    };
  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5,
            width:200,
            marignTop:"100px"
        }}
    />
);

  return (
    <Box sx={{ flexGrow: 1, justifyContent: "center" }}>
      <Grid sx={{ justifyContent: "center" }} container spacing={3}>
        <Grid item xs={12
        }>
          <Item>
            <Stack
              sx={{ justifyContent: "center" }}
              direction="row"
              alignItems="center"
              spacing={3}
            >
              <label htmlFor="upload">
                <Input accept="image/*" id="upload" type="file" onChange={handleChange} />

                <Avatar
                  src={file}
                  alt="Jon box" 
                  id="upload" 
                  accept="image/*"
                  id="avatar"
                  sx={{
                    backgroundColor: "#247ba0",
                    color: "#fff",
                    width: 76,
                    height: 76,
                    // display:none
                  }}
                />

                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={{ width: 0, height: 0 }}
                >
                  <AddAPhotoIcon color="#247ba0" />
                </IconButton>
              </label>
            </Stack>
            <br />
            <Typography
              color="#247ba0"
              variant="h4"
              gutterBottom
              component="div"
            >
              Jon Doe
            </Typography>
            <Typography
              color="#247ba0"
              variant="h6"
              gutterBottom
              component="div"
            >
              Organization lorem ipsum
            </Typography>
            <div>
              <FormControl sx={{ m: 1, width: "40%" }} variant="outlined">
              <Controls.Input
                        name="firstName"
                        label="Name"
                        margin="dense"
                     id="outlined-name-input"
                     type="text"
                    />
                <Controls.Input
                  autoFocus
                  margin="dense"
                  id="outlined-name-input"
                  label="Email "
                  type="email"

                />
              </FormControl>
            </div>
            
            <Typography
              
              color="#247ba0"
              variant="h6"
              gutterBottom
              component="div"
              style={{ 
                display:"flex",
               flexDirection:"row",
               justifyContent:"center",
               marignTop: "30px"
              }}
            >
              
              <Typography
          style={{
            width: "10rem",
            height: "0.2rem",
            backgroundColor: "#247ba0",
            borderRadius: "3px",
            marginRight: "20px",}} />
            Change Password
            <Typography
          style={{
            width: "10rem",
            height: "0.2rem",
            backgroundColor: "#247ba0",
            borderRadius: "3px",
            marginRight: "20px",
          }}
            />
              </Typography>
              
            <div>
              <FormControl sx={{ m: 1, width: "40%" }} variant="outlined">
            <Controls.Input
                        autoFocus
                        margin="dense"
                        label="Old Password"
                        name="password"                        
                        type={showPassword ? "text" : "password"}
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                style={{fontSize:'10px'}}
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>)}}
                    />
                    <Controls.Input
                        label="New Password"
                        autoFocus
                        margin="dense"
                        name="passwordConfirmation"
                        type="password"
                        value={values.passwordConfirmation}
                        type={showcomfirmPassword ? "text" : "password"}
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleNewClickShowPassword}
                                  onMouseDown={handleNewMouseDownPassword}
                                >
                                  {showcomfirmPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>)}}
                    />
                    <Controls.Input
                        label="Confirm Password"
                        autoFocus
                        margin="dense"
                        name="passwordConfirmation"
                        type="password"
                        value={values.passwordConfirmation}
                        type={showcomfirmPassword ? "text" : "password"}
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleconfirmClickShowPassword}
                                  onMouseDown={handleconfirmMouseDownPassword}
                                >
                                  {showcomfirmPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>)}}
                    />
                    </FormControl>
                    </div>
                    <div style={{marignTop:""}}> 
                <Controls.Button 
                text="CANCEL CHANGE"
                color="primary"
                variant="outlined"
                style={{borderColor:"#ff1654",color:"#ff1654"}}
                />
                <Controls.Button text="SAVE CHANGE"  style={{backgroundColor:"#247ba0", color:"#fff", marginLeft:"9%"}}/>
                </div>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}