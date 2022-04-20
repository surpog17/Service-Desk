import { Typography,Grid, Breadcrumbs,MenuItem, Link, Paper, makeStyles } from '@material-ui/core';
import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import { useParams,useHistory } from 'react-router';
import Controls from "../controls/Controls";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import * as clientService from "../../services/clientService";
import { useForm, Form } from '../../Components/useForm';
import Swal from 'sweetalert';
const UseStyles = makeStyles({
    root:{
      
        padding:20,
        paddingRight:"-20px",
        
    },
    banner:{
        padding:10,
        justifyContent:"space-between"

    },
    text: {
        fontWeight:"bold"
    },
    title: {
        // paddingBottom: "-450px",
        paddingLeft: 15,
    },
    crumb:{
        padding:20,
        marginTop:"-60px"   
    },
   stat:{
       marginTop:"10px", 
       fontWeight:"bold",
   },
align:{
    marginTop:"-20px"
},
// satus: {
//     marginTop:"10px",
//     fontweight:"bold"
// }

})
const Action = (props) => {
    const classes = UseStyles();
    const params=useParams();
    const [ticket_status, setTicketStatus] = useState('');
    const [note_name, setNote] = useState('');
    const history = useHistory();
    const[data,setData]=useState({ posts: [] })
    useEffect(()=>{
        axios.get(`/api/ticketdetail/${params.id}`)
        .then(response=>{
            console.log(response.data)
            setData({posts:[response.data.ticket_status]});
        })

    }, [params.id])

    const saveStudent = (e) => {
        const formData = new FormData();
        e.preventDefault();
        formData.append('note_name', note_name);
        formData.append('ticket_status', ticket_status);
        axios.post(`/api/notes/?Ticket_id=${params.id}`, formData)
        .then(res =>{
            if(res.data.status === 200)
            {
                
                console.log(`note_name:${note_name}`)
                console.log(`ticket_id:${params.id}`)
                console.log(`ticket_status:${data.ticket_status}`)
            }

                history.push(`/ticketdetail/${params.id}`)
           
        });
        axios.put(`/api/ticket/${params.id}?ticket_status=${ticket_status}`, formData).then(res => console.log(res.data));

        
    }

    return (
      <Form onSubmit={saveStudent}>
        <Paper elevation={0.5} className={classes.banner}>
          <Grid
            container
            direction="column"
            spacing={2}
            className={classes.root}
          >
            <Grid item sm={6}>
              <Typography variant="h5" color="primary" className={classes.text}>
                Actions
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <Link href={`/ticketoverviews/detail/${params.id}`}>
                <MenuItem style={{ paddingLeft: 13, color: "#247ba0" }}>
                  Close
                </MenuItem>
              </Link>
              <Link href={`/ticketoverviews/detail/${params.id}`}>
                <MenuItem style={{ paddingLeft: 13, color: "#247ba0" }}>
                  Assign
                </MenuItem>
              </Link>
              <Link href={`/ticketoverviews/detail/${params.id}`}>
                <MenuItem style={{ paddingLeft: 13, color: "#247ba0" }}>
                  Escalate
                </MenuItem>
              </Link>

              <Typography variant="h5" color="primary" className={classes.stat}>
                Status
                <Controls.SelectStatus
                  name="ticket"
                  onChange={(e) => setTicketStatus(e.target.value)}
                  options={clientService.getStatusCollection()}
                />
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography variant="h5" color="primary" className={classes.stat}>
                Notes{" "}
              </Typography>

              <div className={classes.align}>
                <TextareaAutosize
                  onChange={(e) => setNote(e.target.value)}
                  name="note_name"
                  fontFamily="arial"
                  minRows={3}
                  style={{
                    width: 700,
                    borderRadius: 8,
                    marginLeft: "70px",
                    marginTop: "0px",
                  }}
                />
                <Controls.Button
                  style={{
                    marginTop: "-55px",
                    marginLeft: "800px",
                    width: "60px",
                    height: "30px",
                  }}
                  type="submit"
                  className="btn btn-primary"
                  text="Add"
                />
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Form>
    );
   
    
};
export default Action;
