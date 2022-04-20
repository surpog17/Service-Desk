import React, { useState } from 'react'
import { Paper,Grid, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment,Typography } from '@material-ui/core';
import useTable from "../useTable";
import * as employeeService from "../../services/employeeService";
import Notification from "../Notification";
import ConfirmDialog from "../ConfirmDialog";
import Controls from "../../Components/controls/Controls";
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import { Search } from "@material-ui/icons";
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
    { id: 'client', label: 'Client' },
    { id: 'projet', label: 'Project' },
    { id: 'ticket', label: 'TicketTitle' },
    { id: 'time', label: 'Time Elapsed' },
    { id: 'priority', label: 'Priority' },
    { id: 'status', label: 'status' },
    { id: 'action', label: 'Action' },


]

export default function PendingTickets() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(employeeService.getAllEmployees())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const High=1;
    const Medium=2;
    const Low=3;
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);
    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.ClientName.toLowerCase().includes(target.value))
            }
        })
    } 
    
    return (
        <div>
        
            <Paper elevation={3} className={classes.pageContent}>

            <Toolbar>
                    <Grid container>
                <Typography className={classes.title} variant="h4" color="primary">
                 Pending Tickets 
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
                                    <TableCell>{1}</TableCell>
                                    <TableCell>{"ERA"}</TableCell>
                                    <TableCell>{"Data Center "}</TableCell>
                                    <TableCell>{" UPS "}</TableCell>
                                    <TableCell>{"2 hours 30 min"}</TableCell>
                                    <TableCell>
                                    {(() => {
                            if (High==2) {
                            return (
                                <div style={{
                                    fontWeight: 'bold',
                                    fontSize: '0.75rem',
                                    color: 'white',
                                    backgroundColor: '#ff0000',
                                    borderRadius: 8,
                                    padding: '3px 10px',
                                    display: 'inline-block' }}>High</div>
                            )
                            } if (Medium==2) {
                            return (
                                <div style={{
                                    fontWeight: 'bold',
                                    fontSize: '0.75rem',
                                    color: 'white',
                                    backgroundColor: '#247ba0',
                                    borderRadius: 8,
                                    padding: '3px 10px',
                                    display: 'inline-block' }}>Medium</div>
                            )
                            } 
                            if (Low==3) {
                                return (
                                    <div style={{
                                        fontWeight: 'bold',
                                        fontSize: '0.75rem',
                                        color: 'white',
                                        backgroundColor: '#00b300',
                                        borderRadius: 8,
                                        padding: '3px 10px',
                                        display: 'inline-block' }}>Low</div>
                                )
                                }
                        })()}
                                    </TableCell>
                                    <TableCell>
                                    {(() => {
                            if (High==1) {
                            return (
                                <div style={{
                                    fontWeight: 'bold',
                                    fontSize: '0.75rem',
                                    color: 'white',
                                    backgroundColor: '#000',
                                    borderRadius: 8,
                                    padding: '3px 10px',
                                    display: 'inline-block' }}>Pending</div>
                            )
                            } if (High) {
                            return (
                                <div style={{
                                    fontWeight: 'bold',
                                    fontSize: '0.75rem',
                                    color: 'white',
                                    backgroundColor: '#247ba0',
                                    borderRadius: 8,
                                    padding: '3px 10px',
                                    display: 'inline-block' }}>New</div>
                            )
                            } 
                        })()}
                                    </TableCell>
                                    <TableCell>
                                    <Controls.ActionButton
                                            title="Edit Project"
                                            color="primary"
                                            backgroundColor=""
                                            onClick={() => { openInPopup(item) }}>
                                            <CheckOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>                                
                                        </TableCell>
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
