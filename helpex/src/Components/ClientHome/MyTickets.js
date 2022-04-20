import {Grid,Paper,Toolbar,Button,makeStyles,Typography,TableBody,TableCell,Table,TableRow,
} from "@material-ui/core";
import React, { useState,useEffect }from "react";
import useTable from "../../Components/useTable";
import Controls from "../../Components/controls/Controls";
import * as ticketService from "../../services/ticketService";
import { useParams,useHistory } from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
const UseStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
  newButton: {
    position: 'absolute',
    right: '10px'
  },

}));
const headCells = []

export default function MyTickets(props) {
  const classes = UseStyles()
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(ticketService.getAllTickets())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = useState("");
    const [loding, setLoding] = React.useState(false)
    const history = useHistory();
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);
    const addOrEdit = (ticket, resetForm) => {
        if (ticket.id == 0)
        ticketService.insertTicket(ticket)
        else
        ticketService.insertTicket(ticket)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(ticketService.getAllTickets())
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        ticketService.deleteTicket(id);
        setRecords(ticketService.getAllTickets())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    } 
       const params =useParams();
    // const history=useHistory();
    // const Linkhandle = () => {  
    //     <a ></a>
    //     console.log(`LinkID:${params.id}`)
    //    };
    const[data,setData]=useState([])
    useEffect(()=>{
        axios.get(`/api/ticketclient/${params.clientid}/clientuser/${params.userId}`)
        .then(response=>{
            setData(response.data)
        })
    }, []) 
    const changeState = (e,id) => {  
      history.push(`/ticket/${params.clientid}/${params.userId}/${id}`)
      console.log(`ID:${id}`)
     };
  return (
    <Paper elevation={2} className={classes.root}>
        <Toolbar>
          <Grid container>
        <Typography variant="h4" color="primary">
         My Tickets 
      </Typography>
          <Controls.Button
        href={"/clientlibrary/"+params.clientid}
        text="My Tickets"
          variant="contained"
          color="secondary"
          // startIcon={<HelpOutlnineOutlinedIcon />}
          className={classes.newButton}
        />
         </Grid>       
      
      </Toolbar>
      
      <TblContainer>
                    <TblHead />
                    {data.filter((item)=>{
                        if(search===""){
                            return item
                        }else if(item.clients.ClientName.toLowerCase().includes(search.toLowerCase())){
                            return item
                        }
                    }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) =>{
                                return(
                    <TableBody>
                                <TableRow key={item.id}>
                                    <TableCell onClick={(e) => changeState(e, item.id)}>{item.id}</TableCell>
                                    <TableCell onClick={(e) => changeState(e, item.id)}>{item.clients.ClientName}</TableCell>
                                    <TableCell onClick={(e) => changeState(e, item.id)}>{item.projects.name}</TableCell>
                                    <TableCell onClick={(e) => changeState(e, item.id)}>{item.Issue}</TableCell>
                                    <TableCell>
                                    <Typography onClick={(e) => changeState(e, item.id)}>
                            {(() => {
                            if (item.Priorty===1) {
                            return (
                                <div style={{
                                    fontWeight: 'bold',
                                    fontSize: '0.75rem',
                                    color: 'white',
                                    backgroundColor: '#ff0000',
                                    borderRadius: 8,
                                    padding: '3px 10px',
                                    display: 'inline-block' }}>High</div>
                            )
                            } if (item.Priorty===2) {
                            return (
                                <div style={{
                                    fontWeight: 'bold',
                                    fontSize: '0.75rem',
                                    color: 'white',
                                    backgroundColor: '#247ba0',
                                    borderRadius: 8,
                                    padding: '3px 10px',
                                    display: 'inline-block' }}>Medium</div>
                            )
                            } 
                            if (item.Priorty===3) {
                                return (
                                    <div style={{
                                        fontWeight: 'bold',
                                        fontSize: '0.75rem',
                                        color: 'white',
                                        backgroundColor: '#00b300',
                                        borderRadius: 8,
                                        padding: '3px 10px',
                                        display: 'inline-block' }}>Low</div>
                                )
                                }
                        })()}
                            </Typography> 
                    </TableCell>
                    </TableRow>
                    </TableBody>
                    )})}
                </TblContainer>
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
            
           
    )
}
