import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label, value,error=null, onChange, ...other } = props;
    return (
        <TextField
            variant="outlined" 
            label={label}
            multiline
            rows={5}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && {error:true,helperText:error})}
        />
    )
}
