import React, { useEffect, useState } from 'react'
import AddUser from "./AddUser";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../Components/useTable";
import * as clientService from "../../services/clientService";
import Controls from "../../Components/controls/Controls";
import { Search } from "@material-ui/icons";
import Popup from "../../Components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../Components/Notification";
import ConfirmDialog from "../../Components/ConfirmDialog";
import * as userService from "../../services/userService";
import {useParams } from "react-router-dom";
import axios from "axios"
import TablePagination from "@material-ui/core/TablePagination";
const useStyles = makeStyles(theme => ({
    pageContent: {
        marginTop: theme.spacing(5),
        padding: theme.spacing(3),
        overflow:'hidden auto'
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
    { id: 'firstName', lastname:'lastName', label: 'Client User' },
    { id: 'email', label: 'Email Address' },
    { id: 'project', label: 'Project' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function ProjectName() {
    const params = useParams();
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(clientService.getAllClients())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch]= useState("")
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

    const addOrEdit = (user, resetForm) => {
        if (user.id === 0){
            userService.insertUser(user)
        }else
        userService.updateUser(user)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(userService.getAllUsers())
        const project = {
        firstName:user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
          };
          axios.put('/api/ClientUser/'+user.id, project)
          
            .then(res => console.log(res.data));
          console.log(`Expense successfully created!`);
          console.log(`Name: ${user.firstName}`);
          console.log(`Amount: ${user.lastName}`);
          console.log(`Description: ${user.email}`);
          console.log(`id:${user.id}`);
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
        clientService.deleteClient(id);
        setRecords(clientService.getAllClients())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }
    const[data,setData]=useState([])
    useEffect(()=>{
        axios.get(`/api/ClientUser/${params.id}`)
        .then(response=>{
            setData(response.data)
            console.log(response.data)
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
                        onChange={(event)=>{
                            setSearch(event.target.value);
                        }}
                    />
                    <Controls.Button
                        text="Add User"
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
                        }else if(item.firstName.toLowerCase().includes(search.toLowerCase())){
                            return item
                        }
                    }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                return(
                                <TableRow key={item.id}>
                                    <TableCell>{item.firstName + ' ' +item.lastName}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.projects.name}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            title="Edit User"
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
                                                    title: 'Are you sure you want to deactivate this User?',
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
                <AddUser
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