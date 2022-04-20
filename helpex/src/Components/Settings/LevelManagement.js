import React, { useState,useEffect } from 'react'
import LevelForm from "./LevelForm"
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar,Typography } from '@material-ui/core';
import useTable from "../useTable";
import * as employeeService from "../../services/employeeService";
import Controls from "../controls/Controls";
import Popup from "../Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import BlockIcon from '@material-ui/icons/Block';
import Notification from "../Notification";
import ConfirmDialog from "../ConfirmDialog";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    pageContent: {
        marginTop: theme.spacing(5),
        padding: theme.spacing(2)
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
        paddingRight: 50,
      },
    editButton: {
        position: 'absolute',
        right: '-10px'
    },
      align: {
        display: "flex",
        justifyContent: "flex-end",
        height:"100%",

  },
}))


const headCells = [
    { id: 'id', label: 'No' },
    { id: 'level', label: 'Level' },
    { id: 'actions', label: 'Actions', disableSorting: true }

]

export default function LevelManagement() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(employeeService.getAllEmployees())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = React.useState("")
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
        TblPagination,
        recordsAfterPagingAndSorting
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
            levelName:employee.levelName,
        };
    axios.put('/api/level/'+employee.id, client)
    
    .then(res => console.log(res.data));
    console.log(`Client updated successfully created!`);
    console.log(`Description: ${employee.levelName}`);
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
        axios.delete('/api/level/'+id);
    }
    const[data,setData]=useState([])
    useEffect(()=>{
        axios.get(`/api/level`)
        .then(response=>{
            setData(response.data)
            console.log(response.data)
        })
    }, [])
    return (
        <div>
        
            <Paper elevation={5} className={classes.pageContent}>

                <Toolbar>
                <Typography className={classes.title} variant="h5" color="primary">
                 Level Management 
                </Typography>  
                
                    <Controls.Button
                        text="Add Level"
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
    if(search===""){
        return item
    }else if(item.clients.ClientName.toLowerCase().includes(search.toLowerCase())){
        return item
    }else if(item.projects.name.toLowerCase().includes(search.toLowerCase())){
        return item
    }else if(item.Issue.toLowerCase().includes(search.toLowerCase())){
        return item
    }
}).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) =>{
            return(<TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.levelName}</TableCell>
                                    <TableCell>                                    
                                    <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                                                         
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure you want to deactivate this Level?',
                                                    subTitle: "",
                                                    onConfirm: () => { onDelete(item.id) }
                                                })
                                            }}>
                                            <BlockIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                  
                                </TableRow>
                           )})}
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
           
            <Popup
                title="Add Levels"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
            <LevelForm
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
