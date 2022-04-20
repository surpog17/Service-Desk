import React, { useRef, useEffect,useState } from 'react'
import * as yup from 'yup';
import { Grid, makeStyles } from '@material-ui/core';
import {InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Controls from "../../Components/controls/Controls";
import { useForm, Form } from '../../Components/useForm';
import * as employeeService from "../../services/employeeService";
import * as userService from "../../services/userService";
import axios from 'axios'
const useStyles= makeStyles({
    align:{
        display:"flex",
        justifyContent:"flex-end"
    }
})
const initialFValues = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password:'',
    passwordConfirmation:'',
    Project_id:'3', 
}

export default function AddEmployee(props) {
    const classes=useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [showcomfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleconfirmClickShowPassword = () => setShowConfirmPassword(!showcomfirmPassword);
    const handleconfirmMouseDownPassword = () => setShowConfirmPassword(!showcomfirmPassword);
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName? "" : "This field is required."
        if ('lastName' in fieldValues)
            temp.lastName = (/^[a-zA-Z]+$/).test(fieldValues.lastName) ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('password' in fieldValues)
            temp.password = (/$^|.+.+.+.+.+.+.+.+/).test(fieldValues.password) ? "" : "The password must be at least 8 characters."
        if ('passwordConfirmation'in fieldValues)
        temp.passwordConfirmation = fieldValues.passwordConfirmation ? "" : "This field is required"
        if ('Project_id' in fieldValues)
            temp.Project_id = fieldValues.Project_id.length != 0 ? "" : "This field is required."
            if (values.password != values.passwordConfirmation){
                temp.passwordConfirmation = fieldValues.passwordConfirmation ? "" : "Password not match"
            }else{
               
            }
        
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
            const user = {
      firstName:values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password
    };
    axios.post('/api/ClientUser', user)
    
      .then(res => console.log(res.data));
    console.log(`Expense successfully created!`);
    console.log(`fname: ${values.firstName}`);
    console.log(`lname: ${values.lastName}`);
    console.log(`email: ${values.email}`);
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
                    <Grid item xs={12}>
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        style={{width:"180%"}}

                    /></Grid>
                      <Controls.Input
                        label="Set Password"
                        name="password"
                        value={values.password}
                        type="password"
                        onChange={handleInputChange}
                        error={errors.password}
                        type={showPassword ? "text" : "password"}
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                        }}

                        
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                    <Controls.Select
                        name="project_id"
                        label="Assigned Projects"
                        value={values.project_id}
                        onChange={handleInputChange}
                        options={userService.getProjectCollection()}
                        error={errors.project_id}
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
                    
                    <Controls.Input
                    style={{marginTop:"80px"}}
                        label="Confirm Password"
                        name="passwordConfirmation"
                        type="password"
                        value={values.passwordConfirmation}
                        onChange={handleInputChange}
                        error={errors.passwordConfirmation}
                        type={showcomfirmPassword ? "text" : "password"}
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleconfirmClickShowPassword}
                                  onMouseDown={handleconfirmMouseDownPassword}
                                >
                                  {showcomfirmPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                        }}

                    />
                    <br/>
                    <br/>
                    </Grid>
                    </Grid>
                    <div className={classes.align}>
                        
                        <Controls.Button
                            text="Cancel"
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