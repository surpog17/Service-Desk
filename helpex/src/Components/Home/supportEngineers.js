import React, { useState ,useEffect} from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar,Typography } from '@material-ui/core';
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
    },
    searchInput: {
        width: '70%',
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    title: {
        paddingLeft: 15,
        paddingRight: 3,
      },
}))


const headCells = [
    { id: 'id', label: 'No' },
    { id: 'name', label: 'Name' },
    { id: 'activeTickets', label: 'Active Tickets' },

]

export default function SupportEngineers() {

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
        axios.get(`/api/internaluser`)
        .then(response=>{
            setData(response.data)
        })
    }, [])    
    return (
        <div>
        
            <Paper elevation={3} className={classes.pageContent}>

                <Toolbar>
                <Typography className={classes.title} variant="h4" color="primary">
                 Support Engineers 
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
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      {item.firstName + " " + item.lastName}
                    </TableCell>
                    <TableCell>{Math.floor(Math.random() * 6 + 1)}</TableCell>
                  </TableRow>
                );
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
