import React, { useState, useEffect} from 'react'
import EmployeeForm from "./EmployeeForm";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../useTable";
import * as userService from "../../services/userService";
import Controls from "../controls/Controls";
import { Search } from "@material-ui/icons";
import Popup from "../Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../Notification";
import ConfirmDialog from "../ConfirmDialog";
import axios from "axios";
import TablePagination from "@material-ui/core/TablePagination";
import * as employeeService from "../../services/employeeService";

const useStyles = makeStyles(theme => ({
    pageContent: {
        marginTop: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '67%'
    },
    newButton: {
        position: 'absolute',
        right: '1px'
    },
    uploadButton: {
        position: 'absolute',
        right: '160px'
    },
    input: {
        display: 'none',
      },
}))


const headCells = [
    { id: 'firstName', lastname:'lastName',label: 'Client Name' },
    { id: 'email', label: 'Email Address' },
    { id: 'level', label: 'Support Level' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Employees() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(userService.getAllUsers())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [search, setSearch] = useState("");
    /* pagination */
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
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }

    // const addOrEdit = (employee, resetForm) => {
    //     if (employeeService.id === 0)
    //     employeeService.insertEmployee(employee)
    //     else
    //     employeeService.updateEmployee(employee)
    //     resetForm()
    //     setRecordForEdit(null)
    //     setOpenPopup(false)
    //     setRecords(employeeService.getAllEmployees())
    //     const client = {
    //         firstName:employee.firstName,
    //         lastName: employee.Representative_FirstName,
    //         email: employee.email,
    //         levelName: employee.levelName,
    //     };
    // axios.put('/api/internaluser/'+employee.id, client)
    
    // .then(res => console.log(res.data));
    // console.log(`Client successfully created!`);
    // console.log(`Name: ${employee.ClientName}`);
    // console.log(`First Name: ${employee.Representative_FirstName}`);
    // console.log(`Last Name: ${employee.Representative_LastName}`);
    // console.log(`Email: ${employee.Representative_email}`);
    // console.log(`Description: ${employee.ClientDescription}`);
    //     setNotify({
    //         isOpen: true,
    //         message: 'Submitted Successfully',
    //         type: 'success'
    //     })
    // }
    // const openInPopup = item => {
    //     setRecordForEdit(item)
    //     setOpenPopup(true)
    //         }

    // const onDelete = id => {
    //     setConfirmDialog({
    //         ...confirmDialog,
    //         isOpen: false
    //     })
    //     employeeService.deleteEmployee(id);
    //     setRecords(employeeService.getAllEmployees())
    //     setNotify({
    //         isOpen: true,
    //         message: 'Deleted Successfully',
    //         type: 'error'
    //     })
    //     axios.delete('/api/internaluser/'+id);
    // }
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
            firstName:employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            level_id: employee.level_id,
        };
    axios.put(`/api/internaluser/`+employee.id, client)
    .then(res => console.log(res.data));
    console.log(`Client successfully created!`);
    console.log(`levelName: ${employee.level_id}`);
    console.log(`First Name: ${employee.firstName}`);
    console.log(`Last Name: ${employee.lastName}`);
    console.log(`Email: ${employee.email}`);
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
        axios.delete('/api/internaluser/'+id);
    }
    const[data,setData]=useState([])
    useEffect(()=>{
        axios.get('/api/internaluser')
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
                        onChange={handleSearch}
                    />
                   <div className={classes.uploadButton}>
      <input
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Controls.Button text="Upload Employees"variant="contained" color="secondary" component="span"/>
      </label>
     </div> 
                 
                
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
                    {data.filter((item)=>{
                        if(search==""){
                            return item
                        }else if(item.ClientName.toLowerCase().includes(search.toLowerCase())){
                            return item
                        }
                    }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                        return(
                        <TableRow key={item.id}>
                                    <TableCell>{item.firstName + ' ' +item.lastName}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                   
                                    <TableCell>{item.level.levelName}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
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
                title="Add User"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EmployeeForm
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
