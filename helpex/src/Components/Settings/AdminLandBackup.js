import { makeStyles, Paper, Table, TableCell, TableHead, Typography, TableBody, TableRow } from '@material-ui/core';
import React from 'react';
const UseStyles = makeStyles({
    root: {
        padding: 10,
        paddingLeft: 15
    },

    Table: {
        border: 0
    },


    align: {
        display: "flex",
        justifyContent: "flex-end"
    },
})
const data = [
    {
        id: 0,
        ClientName: "Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. ",
        ClientEmail: "yestif5@gmail.com",
        ActiveProjects: "2"

    },
    {
        id: 0,
        ClientName: "Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. ",
        ClientEmail: "yestif5@gmail.com",
        ActiveProjects: "5"

    },
    {
        id: 0,
        ClientName: "Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. ",
        ClientEmail: "yestif5@gmail.com",
        ActiveProjects: "3"

    },
    {
        id: 0,
        ClientName: "Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. ",
        ClientEmail: "yestif5@gmail.com",
        ActiveProjects: "5"

    },
    {
        id: 0,
        ClientName: "Amet laborum deserunt exercitation est. Amet laborum deserunt exercitation est. ",
        ClientEmail: "yestif5@gmail.com",
        ActiveProjects: "3"

    },



]
const AdminLand = () => {
    const classes = UseStyles()
    return (
        <Paper elevation={6} className={classes.root}>

            <Table className={classes.Table}>
                <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '70%' }} />
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '20%' }} />
                </colgroup>
                <TableHead>
                    <TableRow>
                        <TableCell ><b>No</b></TableCell>
                        <TableCell ><b>Client Name</b></TableCell>
                        <TableCell ><b>Client Email</b></TableCell>
                        <TableCell ><b>Active Projects</b></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        data.map(((res, index) =>
                            <TableRow className={index % 2 === 0 ? classes.even : {}} key={index}>
                                <TableCell><Typography color="primary"> {index + 1}</Typography></TableCell>
                                <TableCell  ><Typography color="primary"> {res.ClientName}</Typography></TableCell>
                                <TableCell s><Typography color="primary"> {res.ClientEmail}</Typography></TableCell>
                                <TableCell ><Typography color="primary"> {res.ActiveProjects}</Typography></TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>

        </Paper>

    )

};



export default AdminLand;