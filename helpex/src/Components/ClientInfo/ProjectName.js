import React, { useState,useEffect } from 'react'
import AddProject from "./AddProject";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../Components/useTable";
import * as projectService from "../../services/projectService";
import Controls from "../../Components/controls/Controls";
import { Search } from "@material-ui/icons";
import Popup from "../../Components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../Components/Notification";
import ConfirmDialog from "../../Components/ConfirmDialog";
import * as employeeService from "../../services/employeeService";
import { useHistory,useParams } from "react-router-dom";
import axios from "axios"
import { datatype } from 'faker/locale/zh_CN';
import TablePagination from "@material-ui/core/TablePagination";
import _ from "lodash";
const useStyles = makeStyles(theme => ({
    pageContent: {
        marginTop: theme.spacing(5),
        padding: theme.spacing(3),
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        left: '75%'
    }
}))


const headCells = [
    { id: 0, label: 'No' },
    { id: 'Name', label: 'Project Name' },
    { id: 'startdate', id:'enddate', label: 'SLA Date' },
    {id: 'closureDate', id:'closureDate', label: 'Closure Date'},
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function ProjectName() {

    const classes = useStyles();
    const history = useHistory();
    const params = useParams();
    
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(projectService.getAllProjects())
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
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.Name.toLowerCase().includes(target.value))
            }
        })
    }

    
    const addOrEdit = (employee, resetForm) => {
        if (employee.id === 0)
            employeeService.insertEmployee(employee)
        else
            employeeService.updateEmployee(employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(employeeService.getAllEmployees())
        const project = {
            name:employee.name,
            startDate: employee.startDate,
            dueDate: employee.dueDate,
            closerDate: employee.closerDate,
        };
    axios.put('/api/project/'+employee.id, project)
    
    .then(res => console.log(res.data));
    console.log(`Client successfully created!`);
    console.log(`Name: ${employee.name}`);
    console.log(`Amount: ${employee.startDate}`);
    console.log(`Description: ${employee.dueDate}`);
    
        setNotify({
            isOpen: true,
            message: `${employee.name} Project Created Successfully`,
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
        axios.delete('/api/project/'+id);
    }
    const[data,setData]=useState([])
    useEffect(()=>{
        axios.get(`/api/project/${params.id}`)
        .then(response=>{
            setData(response.data);
            console.log(response.data)
        })
    }, [])
    const changeState = (e, id) => {  
        history.push(`/project/${id}`)
        console.log(`ID:${id}`)
       };
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
                        text="Add Project"
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
                        }else if(item.name.toLowerCase().includes(search.toLowerCase())){
                            return item
                        }
                    }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                return(
                                <TableRow key={item.id}>
                                    <TableCell onClick={(e) => changeState(e, item.id)}>{item.id}</TableCell>
                                    <TableCell onClick={(e) => changeState(e, item.id)}>{item.name}</TableCell>
        
                                    <TableCell onClick={(e) => changeState(e, item.id)}>{item.startDate + ' - ' +item.dueDate}</TableCell>
                                    <TableCell onClick={(e) => changeState(e, item.id)}>{item.closureDate}</TableCell>
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
                                                    title: 'Are you sure you want to deactivate this Project?',
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
                title="Add Project"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <AddProject
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