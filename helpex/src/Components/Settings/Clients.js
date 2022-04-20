import React, { useState, useEffect } from 'react'
import ClientForm from "./ClientForm";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../useTable";
import * as employeeService from "../../services/employeeService";
import Controls from "../controls/Controls";
import { Search } from "@material-ui/icons";
import Popup from "../Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../Notification";
import ConfirmDialog from "../ConfirmDialog";
import axios from "axios"
import { useHistory } from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";


const useStyles = makeStyles(theme => ({
    pageContent: {
        marginTop: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
    { id: 'Name', label: 'Client Name' },
    { id: 'adminName', label: 'Client Admin Name' },
    { id: 'email', label: 'Client Email' },
    { id: 'projects', label: 'Active Projects' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Clients() { 

    const classes = useStyles();
    const history = useHistory();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(employeeService.getAllEmployees())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [search, setSearch] = useState("");
    /* pagination */
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
    } = useTable(records, headCells, filterFn);
    const addOrEdit = (employee, resetForm) => {
        if (employee.id === 0)
            employeeService.insertEmployee(employee)
        else
        employeeService.updateEmployee(employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(employeeService.getAllEmployees())
        const client = {
            ClientName:employee.ClientName,
            Representative_FirstName: employee.Representative_FirstName,
            Representative_LastName: employee.Representative_LastName,
            Representative_email: employee.Representative_email,
            ClientDescription: employee.ClientDescription,
        };
    axios.put('/api/clients/'+employee.id, client)
    
    .then(res => console.log(res.data));
    console.log(`Client successfully created!`);
    console.log(`Name: ${employee.ClientName}`);
    console.log(`First Name: ${employee.Representative_FirstName}`);
    console.log(`Last Name: ${employee.Representative_LastName}`);
    console.log(`Email: ${employee.Representative_email}`);
    console.log(`Description: ${employee.ClientDescription}`);
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }
    const changeState = (e, id) => {  
        history.push(`/client/${id}`)
        console.log(`ID:${id}`)
       };

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
            }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        employeeService.deleteEmployee(id);
        setRecords(employeeService.getAllEmployees())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
        axios.delete('/api/clients/'+id);
    }
    
    const[data,setData]=useState([])
    useEffect(()=>{
        axios.get('/api/clients')
        .then(response=>{
            setData(response.data)
        })
    },[]);
   
    return (
        <div>
        
            <Paper elevation={5} className={classes.pageContent}>

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
                    <Controls.Button
                        text="Add Client"
                        variant="contained"
                        color="secondary"
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                    {data.filter((item)=>{
                        if(search==""){
                            return item
                        }else if(item.ClientName.toLowerCase().includes(search.toLowerCase())){
                            return item
                        }
                    }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                        return(
                                <TableRow key={item.id}>
                                    <TableCell onClick={(e) => changeState(e, item.id)}>{item.ClientName}</TableCell>
                                    <TableCell onClick={(e) => changeState(e, item.id)}>{item.Representative_FirstName+" "+item.Representative_LastName}</TableCell>
                                    <TableCell onClick={(e) => changeState(e, item.id)}>{item.Representative_email}</TableCell>
                                    <TableCell onClick={(e) => changeState(e, item.id)}></TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                        text="Edit Client"
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to deactivate this client?',
                                                    subTitle: "",
                                                    onConfirm: () => { onDelete(item.id) }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
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
            <Popup
                title="Add Client"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <ClientForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
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
