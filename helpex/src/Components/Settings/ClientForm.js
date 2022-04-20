import React, { useState, useEffect } from 'react'
import { Grid,makeStyles } from '@material-ui/core';
import Controls from "../controls/Controls";
import { useForm, Form } from '../useForm';
import axios from "axios"
import * as employeeService from "../../services/employeeService";

const UseStyles = makeStyles({

    align: {
        display: "flex",
        left:"100px"
  },
    
})


const initialFValues = {
    id: 0,
    ClientName: '',
    Representative_FirstName: '',
    Representative_LastName: '',
    Representative_email: '',
    ClientDescription: '',
    projects: 0,
}

export default function ClientForm(props) {
    const { addOrEdit, recordForEdit } = props
    const classes = UseStyles();


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('ClientName' in fieldValues)
            temp.ClientName = (/^[a-zA-Z]+$/).test(fieldValues.ClientName) ? "" : "This field is required."
        if ('Representative_FirstName' in fieldValues)
            temp.Representative_FirstName = (/^[a-zA-Z]+$/).test(fieldValues.Representative_FirstName) ? "" : "This field is required."
        if ('Representative_LastName' in fieldValues)
            temp.Representative_LastName = (/^[a-zA-Z]+$/).test(fieldValues.Representative_LastName) ? "" : "This field is required."
        if ('Representative_email' in fieldValues)
            temp.Representative_email = (/$^|.+@.+..+/).test(fieldValues.Representative_email) ? "" : "Email is not valid."
        if ('ClientDescription' in fieldValues)
            temp.ClientDescription =fieldValues.ClientDescription ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
           const client = {
                ClientName:values.ClientName,
                Representative_FirstName: values.Representative_FirstName,
                Representative_LastName: values.Representative_LastName,
                Representative_email: values.Representative_email,
                ClientDescription: values.ClientDescription,
            };
    if(values.id==0){
    axios.post('/api/clients', client)
      .then(res => console.log(res.data));
     
    console.log(`Client successfully created!`);
    console.log(`Name: ${values.ClientName}`);
    console.log(`First Name: ${values.Representative_FirstName}`);
    console.log(`Last Name: ${values.Representative_LastName}`);
    console.log(`Email: ${values.Representative_email}`);
    console.log(`Description: ${values.ClientDescription}`);
            
          }
          addOrEdit(values, resetForm);
        }
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
                <Grid item xs={12} container elevation={7}>
                    <Controls.Input
                        name="ClientName"
                        label="Client Name"
                        value={values.ClientName}
                        onChange={handleInputChange}
                        error={errors.ClientName}
                    />
                    <Grid item xs={12} container direction="row">
                        <Grid item xs={6}>
                      <Controls.Input
                        name="Representative_FirstName"
                        label="Client Admin First Name"
                        value={values.Representative_FirstName}
                        onChange={handleInputChange}
                        error={errors.Representative_FirstName}
                    /></Grid>
                    <Grid item xs={6}>
                    <Controls.Input
                        name="Representative_LastName"
                        label="Client Admin Last Name"
                        value={values.Representative_LastName}
                        onChange={handleInputChange}
                        error={errors.Representative_LastName}
                        style={{marginLeft:"-90px"}}
                    />
                    </Grid>
                    </Grid>
                    <Controls.Input
                        label="Client Admin Email"
                        name="Representative_email"
                        value={values.Representative_email}
                        onChange={handleInputChange}
                        error={errors.Representative_email}
                    />
                  <Controls.TextField
                        label="Client Description"
                        name="ClientDescription"
                        value={values.ClientDescription}
                        onChange={handleInputChange}
                        error={errors.ClientDescription}
                    /> </Grid>
                    
                </Grid>
                    <div className={classes.align}>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                    
                    </Form>
    )
}
