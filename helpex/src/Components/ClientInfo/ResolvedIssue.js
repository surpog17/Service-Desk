import { makeStyles, Link, Paper, Table, Grid,TableCell, TableHead, Typography, TableBody, TableRow, Toolbar, InputAdornment,TabScrollButton } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import Controls from "../../Components/controls/Controls";
import { Search } from "@material-ui/icons";
import useTable from "../../Components/useTable";
import { id } from 'date-fns/locale';
import NewTicket from "../../Components/AddTicket/NewTicket";
import * as ticketService from "../../services/ticketService";
import Popup from "../../Components/Popup";
import axios from 'axios';
import { useParams,useHistory } from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";
import moment from "moment";

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
        width: '100%'
    },


even:{
backgroundColor:"#fff"
}
})


const headCells = [
    { id: 0, label: 'No' },
    { id: 'issue', label: 'Issue' },
    { id: 'Status', label: 'Status' },
    { id: 'when', label: 'Closed on'}
]
export default function ResolvedIssue() {
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
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.Name.toLowerCase().includes(target.value))
            }
        })
    }
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
    const params= useParams();
    const[data,setData]=useState([])
    const ticket_status=4;
    useEffect(()=>{
        axios.get(`/api/client/${params.id}/ticket/${ticket_status}`)
        .then(response=>{
            setData(response.data)
        })
    }, [params.id])
        
    return (
        <Paper elevation={6} className={classes.root}>
            
            <Toolbar>
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
                    <TblHead />

                <TableBody>
                {data.filter((item)=>{
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
                                        <TableCell>
                                        <Typography>
                                        {(() => {
                                        if (item.ticket_status==4) {
                                        return (
                                            <div style={{
                                                fontWeight: 'bold',
                                                fontSize: '0.75rem',
                                                color: 'white',
                                                backgroundColor: '#00b300',
                                                borderRadius: 8,
                                                padding: '3px 10px',
                                                display: 'inline-block' }}>Close</div>
                                        )
                                        }
                                    })()}
                                        </Typography>
                                        </TableCell>
                                        <TableCell>{moment(item.updated_at).format('LL')}</TableCell>
                                      
                                    </TableRow>
                                    )
                                })
                             }

                </TableBody>
                </TblContainer>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}/>
                <Popup>
                <NewTicket
                    
                    addOrEdit={addOrEdit} /> 
                </Popup>
        </Paper>
            )
            
}