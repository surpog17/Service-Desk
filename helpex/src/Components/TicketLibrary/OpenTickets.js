import { makeStyles, Paper, Table, Grid,TableCell, TableHead, Typography, TableBody, TableRow, Toolbar, InputAdornment, TabScrollButton } from '@material-ui/core';
import React, {useState,useEffect} from 'react';
import Controls from "../../Components/controls/Controls";
import { Search } from "@material-ui/icons";
import useTable from "../../Components/useTable";
import { id } from 'date-fns/locale';
import NewTicket from "../../Components/AddTicket/NewTicket";
import * as ticketService from "../../services/ticketService";
import Popup from "../../Components/Popup";
import TablePagination from "@material-ui/core/TablePagination";
import TableView from "@material-ui/core"
import { useParams,useHistory } from "react-router-dom";
import axios from 'axios';
const UseStyles = makeStyles({        
    root:{
        padding:40,
    },
    font:{
        fontSize:"0.875rem",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight:"400"
    },
    searchInput: {
        width: '100%',
    },
    even:{
        backgroundColor:"#fff"
    }
})
const headCells = [
    { id: 0, label: 'No' },
    { id: 'issue', label: 'Issue' },
    {id: 'project', label: 'Project'},
    { id: 'status', label: 'Status' },
    { id: 'when', label: 'Opened on'}
]
export default function OpenTickets() {
    const classes = UseStyles()
    const params =useParams();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(ticketService.getAllTickets())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = useState("");
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    }
    const[data,setData]=useState([])
    useEffect(()=>{
        axios.get(`/api/opentickets/`)
        .then(response=>{
            setData(response.data)
        })
    }, [])
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
    return (
        <Paper elevation={6} className={classes.root}>
            
            <Toolbar>
                <Grid container>
                    <Typography className={classes.title} variant="h5" color="primary">
                        Open Tickets
                    </Typography>
                    </Grid>
                    <Controls.Input
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={(event)=>{
                            setSearch(event.target.value);
                        }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead/>

                <TableBody>{data.filter((item)=>{
                if(search==""){
                    return item
                }else if(item.Issue.toLowerCase().includes(search.toLowerCase())){
                    return item
                }
            }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                return(
                                     <TableRow key={item.id}>
                                     <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.Issue}</TableCell>
                                    <TableCell>{item.projects.name}</TableCell>
                                        <TableCell>
                                        <Typography>
                            {(() => {
                             if (item.ticket_status==2) {
                            return (
                                <div style={{
                                    fontWeight: 'bold',
                                    fontSize: '0.75rem',
                                    color: 'white',
                                    borderRadius: 8,
                                    width:'90px',
                                    padding: '3px 28px',
                                    display: 'inline-block',
                                    backgroundColor: '#a8a432',
                                     }}>Open</div>
                            )
                            } 
                        })()}
                            </Typography>
                    </TableCell>
                                        <TableCell>{item.date}</TableCell>
    
                                    </TableRow>
                                        )})}
                                        </TableBody>
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
                <Popup>
                <NewTicket
                    
                    addOrEdit={addOrEdit} /> 
                </Popup>

        </Paper>
            )
            
}