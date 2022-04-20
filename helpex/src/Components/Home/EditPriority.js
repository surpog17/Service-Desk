import React, { useState, useEffect } from 'react'
import { Grid, makeStyles } from '@material-ui/core';
import Controls from "../../Components/controls/Controls";
import { useForm, Form } from '../../Components/useForm';
import * as clientService from "../../services/clientService";
import axios from 'axios';

const UseStyles = makeStyles({

    align: {
        display: "flex",
        justifyContent: "flex-end",
  },
     
})

const initialFValues = {
    id: 0,
}
export default function EditPriority(props) {
    const { addOrEdit, recordForEdit } = props
    const classes = UseStyles();  
    const[Priorty,setPriorty]=useState('');

    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\,])(?=.{8,})");
    

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        // const password = temp.password
        if ('firstName' in fieldValues)
            temp.firstName = (/^[a-zA-Z]+$/).test(fieldValues.firstName) ? "" : "This field is required."
        if ('lastName' in fieldValues)
            temp.lastName = (/^[a-zA-Z]+$/).test(fieldValues.lastName) ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('password' in fieldValues)
            temp.password = (strongRegex).test(fieldValues.password) ? "" : "The password must be at least 8 characters."
            // const pwd = temp.password;
        // if ('passwordConfirmation'in fieldValues)
        // temp.password = (strongRegex).test(fieldValues.password)
        // temp.passwordConfirmation =(pwd).test(fieldValues.passwordConfirmation) ? "" : "The password need to match."
        if (values.password !== values.passwordConfirmation){
            temp.passwordConfirmation =(values.password !== values.passwordConfirmation) ? "" : "Password not match"
        }else{
           
        }
        if ('project' in fieldValues)
            temp.project = fieldValues.project.length !== 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = (e,id) => {
        const formData = new FormData();
        e.preventDefault()
        formData.append('Priorty', Priorty);
        console.log(`test:" ${Priorty}`)
        console.log(axios.put(`/api/ticket/${recordForEdit}?Priorty=${Priorty}`,).then(res => console.log(res.data)));

    addOrEdit(values, resetForm);
        }
    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item sm={12}>
            <Controls.SelectPriority
                        name="Priorty"
                        label="Priority"
                        //value={values.Priorty}
                        onChange={(e)=>setPriorty(e.target.value)}
                        options={clientService.getPriorityCollection()}
                        error={errors.priorty}/>
                        </Grid>
                    </Grid>
                    <div className={classes.align}>
                        
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                            <Controls.Button
                            type="submit"
                            text="Submit" 
                        />
                    </div>
        </Form>
    )
}
