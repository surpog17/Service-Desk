import React, {useEffect } from 'react'
import { Grid, makeStyles } from '@material-ui/core';
import Controls from "../controls/Controls";
import { useForm, Form } from '../useForm';
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
    firstName: '',
    lastName:'',
    email: '',
    level: '',
}



export default function EmployeeForm(props) {
    const { addOrEdit, recordForEdit } = props
    const classes = UseStyles();


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstName' in fieldValues)
            temp.firstName = (/^[a-zA-Z]+$/).test(fieldValues.firstName) ? "" : "This field is required."
        if ('lastName' in fieldValues)
            temp.lastName = (/^[a-zA-Z]+$/).test(fieldValues.lastName) ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('role' in fieldValues)
            temp.role = fieldValues.role.length !== 0 ? "" : "This field is required."
        if ('level' in fieldValues)
            temp.level = fieldValues.level.length !== 0 ? "" : "This field is required."
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
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const formData = new FormData();
            e.preventDefault()
                formData.append('level_id', values.level);
                formData.append('firstName', values.firstName);
                formData.append('lastName', values.lastName);
                formData.append('email',values.email);
    

        //    const client = {
        //         level: values.level,
        //         firstName:values.firstName,
        //         lastName:values.lastName,
        //         email: values.email,     
        //     };
    if(values.id==0){
    axios.post('/api/internaluser', formData)
      .then(res => console.log(res.data));
    console.log(`Name: ${values.firstName}`);
    console.log(`First Name: ${values.lastName}`);
    console.log(`Last Name: ${values.email}`);
    console.log(`Email: ${values.level}`);            
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
                <Grid item xs={6}>
                    <Controls.Input
                        name="firstName"
                        label="First Name"
                        value={values.firstName}
                        onChange={handleInputChange}
                        error={errors.firstName}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Selectlevel
                        name="level"
                        label="Select Support Level"
                        value={values.level}
                        onChange={handleInputChange}
                        options={clientService.getLevelCollection()}
                        error={errors.level}
                    />
                  
                    
                </Grid>

                <Grid item xs={6}>
                <Controls.Input
                        name="lastName"
                        label="Last Name"
                        value={values.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                    />

                {/* <Controls.Select
                        name="role"
                        label="Select Role"
                        value={values.role}
                        onChange={handleInputChange}
                        options={clientService.getRoleCollection()}
                        error={errors.role}
                    /> */}
                
                  <br/>
                  <br/>
                   
                </Grid>
                   
            </Grid>
               <div className={classes.align}>
                       
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                         <Controls.Button
                            type="submit"
                            text="Submit" />
                </div>
        </Form>
    )
}