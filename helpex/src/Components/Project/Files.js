import React, { useState,useEffect } from 'react'
import FilesForm from "./FilesForm";
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
import * as userService from "../../services/userService";
import { useHistory,useParams } from "react-router-dom";
import axios from "axios"
import { datatype } from 'faker/locale/zh_CN';

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
        right: '10px'
    },
   table: {
       width: '1000px'
   }
}))


const headCells = [

    { id: 'filename', label: 'File Name' },
    { id: 'description', label: 'Description' },
    {id: 'tags', label: 'Tags'},
    {id: 'file',label: 'File'},
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

    const addOrEdit = (user, resetForm) => {
        if (user.id == 0){
            userService.insertUser(user)
        }else
            userService.updateUser(user)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(userService.getAllUsers())
        const files = {
            filename:user.filename,
            description: user.description,
            tags: user.tags,
            file: user.file,
          };
          axios.put('/api/upload/'+user.id, files)
          
            .then(res => console.log(res.data));
          console.log(`Expense successfully created!`);
          console.log(`Name: ${user.filename}`);
          console.log(`Amount: ${user.tags}`);
          console.log(`Description: ${user.description}`);
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
        userService.deleteUser(id);
        setRecords(userService.getAllUsers())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
        axios.delete('/api/upload/'+id);
    }
    const[data,setData]=useState([])
    useEffect(()=>{
        axios.get(`/api/projectfile/${params.id}`)
        .then(response=>{
            setData(response.data);
            console.log(response.data)
        })
    }, [userService.getAllUsers()])
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
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Upload file"
                        variant="contained"
                        color="secondary"
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer className={classes.table}>
                    <TblHead />
                    <TableBody>
                    {data && data.map((item) =>{
                                return(
                                <TableRow key={item.id}>
                                    <TableCell onClick={(e) => changeState(e, item.id)}>{item.filename}</TableCell>
                                    <TableCell onClick={(e) => changeState(e, item.id)}>{item.description}</TableCell>
                                    <TableCell onClick={(e) => changeState(e, item.id)}>
                                    {(() => {
                            if (item.tag_id==1) {
                            return (
                                <div style={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    color: 'black',
                                    padding: '10px 0px',
                                    display: 'inline-block',
                                }}>SLA</div>
                            )
                            } if (item.tag_id==2) {
                            return (
                                <div style={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    color: 'black',
                                    padding: '10px 0px',
                                    display: 'inline-block',
                                     }}>PMR</div>
                            )
                            } 
                            if (item.tag_id==3) {
                                return (
                                    <div style={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    color: 'black',
                                    padding: '10px 0px',
                                    display: 'inline-block',
                                         }}>Lesson Learned</div>
                                )
                                }
                        })()}     
                                    </TableCell>
                                    <TableCell onClick={(e) => changeState(e, item.id)}>{item.tag_id}</TableCell>
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
                <TblPagination />
            </Paper>
            <Popup
                title="Add File"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <FilesForm
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