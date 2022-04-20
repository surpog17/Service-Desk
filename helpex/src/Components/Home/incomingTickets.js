import React, { useState, useEffect } from 'react'
import { Paper, makeStyles, Grid, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Typography } from '@material-ui/core';
import useTable from "../../Components/useTable";
import Controls from "../../Components/controls/Controls";
import { Search } from "@material-ui/icons";
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../Components/Notification";
import ConfirmDialog from "../../Components/ConfirmDialog";
import axios from 'axios';
import * as userService from "../../services/userService";
import Popup from "../../Components/Popup";
import EditPriority from "./EditPriority"
import * as clientService from "../../services/clientService";
import TablePagination from "@material-ui/core/TablePagination";
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory, useParams } from "react-router-dom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const useStyles = makeStyles(theme => ({
    pageContent: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
    },
    searchInput: {
        width: '50%',
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    title: {
        display: 'flex',
        justifyContent: 'start',
    },
    priority: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    },
    progress: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(60),
        marginBottom: theme.spacing(5),

    }
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
    const [records, setRecords] = useState(clientService.getAllClients())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = React.useState("")
    const [loding, setLoding] = React.useState(false)
    const history = useHistory();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const {
        TblContainer,
        TblHead,
    } = useTable(records, headCells, filterFn);
    const addOrEdit = (user, resetForm) => {
        if (user.id == 0) {
            userService.insertUser(user)
        } else
            userService.updateUser(user)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(userService.getAllUsers())
        const project = {
            priorty: user.Priorty,
        };
        axios.put(`/api/ticket/${user.id}?Priorty=${user.Priorty}`, project).then(res => console.log(res.data));
        console.log(`Expense successfully created!`);
        console.log(`/api/ticket/${user.id}?Priorty=${user.Priorty}`);
        console.log(`Priorty: ${user.Priorty}`);
        console.log(`id:${user.id}`);
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }
    const openInPopup = (e, id) => {
        setRecordForEdit(id)
        console.log(`id:${id}`)
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
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(`/api/ticket`)
            .then(response => {
                setData(response.data)
                setLoding(true)
                console.log(response.data)
            })
    }, [])











    const changeState = (e, id) => {
        history.push(`/ticketdetail/${id}`)
        console.log(`ID:${id}`)
    };
    return (
        <div>

            <Paper elevation={2} className={classes.pageContent}>

                <Toolbar>
                    <Grid container>
                        <Typography className={classes.title} variant="h4" color="primary">
                            Incoming Tickets
                        </Typography>
                    </Grid>
                    <Controls.Input
                        label="Search Client"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    {loding ? data.filter((item) => {
                        if (search === "") {
                            return item
                        } else if (item.clients.ClientName.toLowerCase().includes(search.toLowerCase())) {
                            return item
                        }
                    }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                        return (
                            <TableBody>
                                <TableRow key={item.id}>
                                    <TableCell onClick={(e) => changeState(e, item.id)}>{item.id}</TableCell>
                                    <TableCell onClick={(e) => changeState(e, item.id)}>{item.clients.ClientName}</TableCell>
                                    <TableCell onClick={(e) => changeState(e, item.id)}>{item.projects.name}</TableCell>
                                    <TableCell onClick={(e) => changeState(e, item.id)}>{item.Issue}</TableCell>
                                    <TableCell>
                                        <Typography onClick={(e) => { openInPopup(e, item.id) }}>

                                            {(() => {
                                                if (item.Priorty === 1) {
                                                    return (
                                                        <div style={{
                                                            fontWeight: 'bold',
                                                            fontSize: '0.75rem',
                                                            color: 'white',
                                                            backgroundColor: '#ff0000',
                                                            borderRadius: 8,
                                                            padding: '0px 20px',
                                                            display: 'flex',
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            width: "fit-content",

                                                        }}>High
                                                            <div>
                                                                <ArrowDropDownIcon />
                                                            </div>
                                                        </div>

                                                    )
                                                } if (item.Priorty === 2) {
                                                    return (
                                                        <div>
                                                            <div style={{
                                                                fontWeight: 'bold',
                                                                fontSize: '0.75rem',
                                                                color: 'white',
                                                                backgroundColor: '#247ba0',
                                                                borderRadius: 8,
                                                                padding: '3px 10px',
                                                                display: 'flex',
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                width: "fit-content",
                                                            }}>Medium
                                                                <ArrowDropDownIcon />
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                if (item.Priorty === 3) {
                                                    return (
                                                        <div style={{
                                                            fontWeight: 'bold',
                                                            fontSize: '0.75rem',
                                                            color: 'white',
                                                            backgroundColor: '#00b300',
                                                            borderRadius: 8,
                                                            padding: '0px 20px',
                                                            display: 'flex',
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            width: "fit-content",
                                                        }}>Low
                                                            <div>
                                                                <ArrowDropDownIcon />
                                                            </div></div>
                                                    )
                                                }
                                            })()}
                                        </Typography>
                                    </TableCell>
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
                                </TableRow>
                            </TableBody>
                        )
                    }) : <CircularProgress className={classes.progress} />}
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
                title="Edit Priority"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EditPriority
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
