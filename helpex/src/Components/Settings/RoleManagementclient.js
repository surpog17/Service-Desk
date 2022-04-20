import React, { useState, useEffect } from 'react'
import { Grid, Checkbox,FormControlLabel, FormControl, FormHelperText, TextField, Typography,makeStyles, Paper, FormGroup, FormLabel} from '@material-ui/core';
import Controls from "../../Components/controls/Controls";
import { useForm, Form} from '../../Components/useForm';
import * as roleService from "../../services/roleService";
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      
    },
    formControl: {
      margin: theme.spacing(3),
      color:"#247ba0"
    },
    FormGroup:{
       marginTop:15 
    },
    align: {
        display: "flex",
        justifyContent: "flex-end",
  },
  })); 

const initialFValues = {
    id: 0,
    role: '',
    user:'',
    project:'',
    client:'',
  
}



export default function RoleManagementclient(props) {
    const { addOrEdit, recordForEdit } = props
    const classes = useStyles();
    const [state, setState] = React.useState({
        user: false,
        project: false,
        client: false,
      });
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
      const { user, project, client } = state;

    

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('role' in fieldValues)
        temp.role = fieldValues.role ? "" : "This field is required."
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
                {/* <Grid item xs={12}> */}
                    <Controls.Input
                        name="role"
                        label="Role"
                        value={values.role}
                        onChange={handleInputChange}
                        error={errors.role}
                        sty

                    /> </Grid>
                    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Permission</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox  style={{color:"#247ba0"}}onChange={handleChange} name="user" />}
            label="Manage Users"
          />
          <FormControlLabel
            control={<Checkbox  style={{color:"#247ba0"}}onChange={handleChange} name="project" />}
            label="Manage Users"
          />
          <FormControlLabel
            control={<Checkbox  style={{color:"#247ba0"}}onChange={handleChange} name="client" />}
            label="Manage Users"
          />
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup className={classes.FormGroup}>
          <FormControlLabel
            control={<Checkbox style={{color:"#247ba0"}} onChange={handleChange} name="user" />}
            label="Manage Projects"
          />
          <FormControlLabel
            control={<Checkbox  style={{color:"#247ba0"}} onChange={handleChange} name="project" />}
            label="Manage Projects"
          />
          <FormControlLabel
            control={<Checkbox style={{color:"#247ba0"}} onChange={handleChange} name="client" />}
            label="Manage Projects"
          />
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup className={classes.FormGroup}>
          <FormControlLabel
            control={<Checkbox style={{color:"#247ba0"}} onChange={handleChange} name="user" />}
            label="Manage Clients"
          />
          <FormControlLabel
            control={<Checkbox  style={{color:"#247ba0"}} onChange={handleChange} name="project" />}
            label="Manage Clients"
          />
          <FormControlLabel
            control={<Checkbox style={{color:"#247ba0"}} onChange={handleChange} name="client" />}
            label="Manage Clients"
          />
        </FormGroup>        
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup className={classes.FormGroup}>
          <FormControlLabel
            control={<Checkbox style={{color:"#247ba0"}} onChange={handleChange} name="user" />}
            label="Manage Tickets"
          />
          <FormControlLabel
            control={<Checkbox  style={{color:"#247ba0"}} onChange={handleChange} name="project" />}
            label="Manage Tickets"
          />
          <FormControlLabel
            control={<Checkbox style={{color:"#247ba0"}}onChange={handleChange} name="client" />}
            label="Manage Tickets"
          />
        </FormGroup>
      </FormControl>
    </div>
                
                   
           
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