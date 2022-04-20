import React, { useState, useEffect } from 'react'
import { Grid,InputAdornment, IconButton, makeStyles } from '@material-ui/core';
import Controls from "../../Components/controls/Controls";
import { useForm, Form } from '../../Components/useForm';
import * as clientService from "../../services/clientService";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useParams } from "react-router-dom";
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
    lastName: '',
    email: '',
    password:'',
    passwordConfirmation:'',
    project:'',

}
export default function AddUser(props) {
    const params = useParams();
    const { addOrEdit, recordForEdit } = props
    const classes = UseStyles();  
    const [showPassword, setShowPassword] = useState(false);
    const [showcomfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);   
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleconfirmClickShowPassword = () => setShowConfirmPassword(!showcomfirmPassword);
    const handleconfirmMouseDownPassword = () => setShowConfirmPassword(!showcomfirmPassword);

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
//         password: Yup.string()
//  |       .min(6, 'Password must be at least 6 charaters')
//  |       .required('Password is required'),
//  |     confirmPassword: Yup.string()
//  |       .oneOf([Yup.ref('password'), null], 'Password must match')
//  |       .required('Confirm password is required'),

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
      password: values.password,
      project:values.project,

    };
    if(values.id==0){
    axios.post(`/api/ClientUser?project_id=${values.project}&client_id=${params.id}`, user)
    
      .then(res => console.log(res.data));
    console.log(`Expense successfully created!`);
    console.log(`fname: ${values.id}`);
    console.log(`lname: ${values.lastName}`);
    console.log(`email: ${values.project}`);
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
                        // type="password"
                        onChange={handleInputChange}
                        error={errors.password}
                        type={showPassword ? "text" : "password"}
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                style={{fontSize:'10px'}}
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>)}}
                    />
                    <Controls.Select
                        name="project"
                        label="Select Assigned Projects"
                        value={values.project}
                        onChange={handleInputChange}
                        options={clientService.getProjectCollection()}
                        error={errors.project}
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
                        label="Confirm Password"
                        name="passwordConfirmation"
                        type="password"
                        style={{ marginTop:"80px"}}
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
                              </InputAdornment>)}}
                    />
                     

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
                            text="Submit" 
                        />
                    </div>
                
         
        </Form>
    )
}
