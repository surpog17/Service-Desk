import React, { useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import AddEmployee from "./AddEmployee";
import { Paper, makeStyles, TableBody, TableRow,Typography, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../Components/useTable";
import * as employeeService from "../../services/employeeService";
import Controls from "../../Components/controls/Controls";
import { Search } from "@material-ui/icons";
import Popup from "../../Components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../Components/Notification";
import ConfirmDialog from "../../Components/ConfirmDialog";
import axios from "axios";

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
    { id: 0, label: 'No' },
    { id: 'firstName', lastname:'lastName', label: 'Employee Name' },
    { id: 'email', label: 'Email Address' },
    { id: 'projects', label: 'Assigned Projects' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Employees() {
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(employeeService.getAllEmployees())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);
    
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.ClientName.toLowerCase().includes(target.value))
            }
        })
    }
    const addOrEdit = (employee, resetForm, refreshpage) => {
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
            Representative_email:employee.Representative_email,
            ClientDescription:employee.ClientDescription
          };
          axios.put('/api/clients/'+employee.id, client)
            .then(res => console.log(res.data));
          console.log(`Expense successfully created!`);
          console.log(`Name: ${employee.ClientName}`);
          console.log(`Amount: ${employee.Representative_FirstName}`);
          console.log(`Description: ${employee.Representative_LastName}`);
          console.log(`Description: ${employee.Representative_email}`);
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
    }, [])
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
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add Employee"
                        variant="contained"
                        color="secondary"
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                   {data.map(item =>
                                    (<TableRow key={item.id}>
                                    <TableCell>{1}</TableCell>
                                    <TableCell>{item.firstName + ' ' +item.lastName}</TableCell>

                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>
                                        <Typography> {item.projects}</Typography> </TableCell>
                                        <TableCell>
                                        <Controls.ActionButton
                                            title="Edit Project"
                                            color="primary"
                                            backgroundColor=""
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="big" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure you want to deactivate this account?',
                                                    subTitle: "",
                                                    onConfirm: () => { onDelete(item.id) }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
    
                                    </TableRow>
                                    ))
                            }
                </TableBody>
                    
                </TblContainer>
                {/* <TblPagination /> */}
            </Paper>
            <Popup
                title="Add Employee"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <AddEmployee
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
