import React, { useState } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar,Typography } from '@material-ui/core';
import useTable from "../useTable";
import * as employeeService from "../../services/employeeService";
import Notification from "../Notification";
import ConfirmDialog from "../ConfirmDialog";


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
    { id: 'status', label: 'Status' },

]

export default function SupportEngineers() {

    const classes = useStyles();
    const [records, setRecords] = useState(employeeService.getAllEmployees())
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);
    return (
        <div>
        
            <Paper elevation={3} className={classes.pageContent}>

                <Toolbar>
                <Typography className={classes.title} variant="h4" color="primary">
                 Client Users 
                </Typography>
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{1}</TableCell>
                                    <TableCell>{" Messay Worku "}</TableCell>
                                    <TableCell>{Math.floor(Math.random() * 6 + 1)}</TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
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
