import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import { useParams } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from 'react'

export default function Select(props) {

    const { name, label, value,error=null, onChange } = props;
    const params = useParams();
    const[data,setData]=useState([])
    useEffect(()=>{
        axios.get(`/api/project/${params.clientid}`)
        .then(response=>{
            setData(response.data)
            console.log(response.data)
        })
    }, [])
    return (
        <FormControl variant="outlined"
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                {
                    data.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
