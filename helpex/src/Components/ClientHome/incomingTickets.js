import React, { useState } from 'react'
// import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../Components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment,Typography } from '@material-ui/core';
import useTable from "../../Components/useTable";
import * as employeeService from "../../services/employeeService";
import Controls from "../../Components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../Components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../Components/Notification";
import ConfirmDialog from "../../Components/ConfirmDialog";


const useStyles = makeStyles(theme => ({
    pageContent: {
        marginTop: theme.spacing(5),
        padding: theme.spacing(2)
    },
    searchInput: {
        width: '50%',
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    title: { 
        paddingLeft: 15,
        paddingRight: 500,
      },
    priority: {
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 50,
      },
}))


const headCells = [
    { id: 'id', label: 'No' },
    { id: 'client', label: 'Client' },
    { id: 'project', label: 'Project' },
    { id: 'title', label: 'Ticket Title' },
    { id: 'priority', label: 'Priority' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function InternalTickets() {

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
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

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

    const addOrEdit = (employee, resetForm) => {
        if (employee.id == 0)
            employeeService.insertEmployee(employee)
        else
            employeeService.updateEmployee(employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(employeeService.getAllEmployees())
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
    }

    return (
        <div>
        
            <Paper elevation={2} className={classes.pageContent}>

                <Toolbar>
                <Typography className={classes.title} variant="h4" color="primary">
                 Incoming Tickets 
                </Typography>
                    <Controls.Input
                        label="Search Clients"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="end">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    {/* <Controls.Button
                        text="Add Client"
                        variant="contained"
                        color="secondary"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    /> */}
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{1}</TableCell>
                                    <TableCell>{" IE Networks "}</TableCell>
                                    <TableCell>{"Service Desk"}</TableCell>
                                    <TableCell>{"Ticket title goes here"}</TableCell>
                                    <TableCell><Typography className="classes.priority">{"High"}</Typography> </TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <CheckOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure you want to reject this incoming ticket?',
                                                    subTitle: "",
                                                    // onConfirm: () => { onDelete(item.id) }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                {/* <TblPagination /> */}
            </Paper>
            {/* <Popup
                title="Add Client"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EmployeeForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup> */}
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
