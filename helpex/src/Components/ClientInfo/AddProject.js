import React, { useState, useEffect } from 'react'
import { Grid, TextField, Typography, Paper, makeStyles} from '@material-ui/core';
import Controls from "../../Components/controls/Controls";
import { useForm, Form } from '../../Components/useForm';
import * as userService from "../../services/userService";
import { useHistory,useParams } from "react-router-dom";
import axios from "axios"

const UseStyles = makeStyles({

    align: {
        display: "flex",
        justifyContent: "flex-end",
  },
     
})
const initialFValues = {
    id: 0,
    client_id:'',
    name: '',
    startdate: '',
    dueDate: '',
    closuredate:'',
}



export default function AddProject(props) {
    const { addOrEdit, recordForEdit } = props
    const classes = UseStyles();
    const params = useParams();
    const [message,setMassage]= useState('');
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
        temp.name = fieldValues.name ? "" : "This field is required."
        if ('startdate' in fieldValues)
        temp.startdate = fieldValues.startDate ? "" : "This field is required."
        if ('dueDate' in fieldValues)
        temp.dueDate = fieldValues.dueDate ? "" : "This field is required."
        if ('closureDate' in fieldValues)
        temp.closureDate = fieldValues.closureDate ? "" : "This field is required."
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
           const project = {
      name:values.name,
      startDate: values.startDate,
      dueDate: values.dueDate,
      closureDate: values.closureDate,
    };
    if(values.id==0){
    axios.post(`/api/project?client_id=${params.id}`, project)
      .then(res =>{ console.log(res.data)
        console.log(res.data.message)
        setMassage(res.data.message)
      });
    console.log(`Expense successfully created!`);
    console.log(`Name: ${values.name}`);
    console.log(`client_id: ${values.id}`);
    console.log(`Description: ${values.dueDate}`);
    console.log(`Date: ${values.closureDate}`);
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
                <Grid item xs={12}>
                    <Controls.Input
                        type="text"
                        name="name"
                        label="Project Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                        style={{width:"83%"}}

                    />
                </Grid>

                <br/> <br/> <br/>
                   <Grid item xs={6} datepicker="input" >
                     <TextField
                format="MMMM,dd,YYYY"
                 value={values.startDate}
                 label="SLA Start Date"
                  name="startDate"
                  type="date"
                  variant="outlined"
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                    />
                                        
                  
                     <TextField
                 value={values.dueDate}
                 InputLabelProps={{ shrink: true }}
                 label="SLA End Date"
                 style={{marginLeft:"400px", marginTop:"-65px"}}
                  name="dueDate"
                  type="date"
                  variant="outlined"
                  onChange={handleInputChange}
                  value={values.dueDate}
                  /> 
                  <TextField
                format="MMMM,dd,YYYY"
                 value={values.closureDate}
                 label="Closure Date"
                  name="closureDate"
                  type="date"
                  variant="outlined"
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                    /></Grid>

                  <br/>
                  <br/>
                
               
                   
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
