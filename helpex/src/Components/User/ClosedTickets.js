import React, { useState } from 'react'
import { Paper,Grid, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment,Typography } from '@material-ui/core';
import useTable from "../useTable";
import * as employeeService from "../../services/employeeService";
import Controls from "../controls/Controls";
import { Search } from "@material-ui/icons";
import Notification from "../Notification";
import ConfirmDialog from "../ConfirmDialog";


const useStyles = makeStyles(theme => ({
    pageContent: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        overflow: 'hidden auto',
    },
    searchInput: {
        width: '70%',
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    title: {
        display: 'flex',
        justifyContent:'start'
      },
}))


const headCells = [
    //{ id: 'id', label: 'No' },
    { id: 'tickettitle', label: 'Ticket Title' },
    { id: 'pc', label: 'Project/Client' },
    { id: 'time', label: 'Time Elapsed' },
    { id: 'Closed', label: 'Closed on' },
   
]

export default function ClosedTickets() {

    const classes = useStyles();
    const [records, setRecords] = useState(employeeService.getAllEmployees())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
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
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.Name.toLowerCase().includes(target.value))
            }
        })
    }
        return (
        <div>
        
            <Paper elevation={3} className={classes.pageContent}>

            <Toolbar>
                    <Grid container>
                <Typography className={classes.title} variant="h4" color="primary">
                 Closed Tickets 
                </Typography>
                </Grid>
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
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    {/* <TableCell>{1}</TableCell> */}
                                    <TableCell>{" IE Networks "}</TableCell>
                                    <TableCell>{"Service Desk"}</TableCell>
                                    <TableCell>{"1 Day,12hr,30min"}</TableCell>
                                <TableCell>{"Oct 20 2021"}</TableCell>
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
