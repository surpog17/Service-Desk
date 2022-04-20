import React, { useState,useEffect } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment,Typography } from '@material-ui/core';
import useTable from "../useTable";
import * as employeeService from "../../services/employeeService";
import Notification from "../Notification";
import ConfirmDialog from "../ConfirmDialog";
import axios from 'axios';
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles(theme => ({
    pageContent: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        overflow: 'hidden auto',
    },
    searchInput: {
        width: '70%',
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    title: {
        display: 'flex',
        justifyContent:'start'
      },
}))


const headCells = [
    { id: 'id', label: 'No' },
    { id: 'client', label: 'Client' },
    { id: 'project', label: 'Project' },
    { id: 'title', label: 'Ticket Title' },
    { id: 'status', label: 'Status' },
   
]

export default function InternalTickets() {

    const classes = useStyles();
    const [records, setRecords] = useState(employeeService.getAllEmployees())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
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
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);
    const[data,setData]=useState([])
    useEffect(()=>{
        axios.get(`/api/pendingtickets/`)
        .then(response=>{
            setData(response.data)
        })
    }, [])
    return (
        <div>
        
            <Paper elevation={3} className={classes.pageContent}>

                <Toolbar>
                <Typography className={classes.title} variant="h4" color="primary">
                 Active Tickets 
                </Typography>
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
                return(<TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.clients.ClientName}</TableCell>
                                    <TableCell>{item.projects.name}</TableCell>
                                    <TableCell>{item.Issue}</TableCell>
                                    <TableCell>
                                    <Typography style={{
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        color: 'white',
                        backgroundColor: '#D7fc31',
                        borderRadius: 8,
                        padding: '3px 10px',
                        display: 'inline-block'
                    }}>In-Progress</Typography> </TableCell>
                                
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
            </Paper>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
       </div>
    )
}
