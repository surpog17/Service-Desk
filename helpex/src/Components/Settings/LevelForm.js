import React, { useState, useEffect } from 'react'
import { Grid, TextField, Typography,makeStyles, Paper, FormGroup, FormLabel} from '@material-ui/core';
import Controls from "../../Components/controls/Controls";
import { useForm, Form} from '../../Components/useForm';
import * as levelService from "../../services/levelService";
import axios from "axios";
const UseStyles = makeStyles({

    align: {
        display: "flex",
        justifyContent: "flex-end",
  },
     
})
const initialFValues = {
    id: 0,
    levelName: '',
    
}



export default function LevelForm(props) {
    const { addOrEdit, recordForEdit } = props
    const classes = UseStyles();

    

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('level' in fieldValues)
            temp.level = fieldValues.level != 0 ? "" : "This field is required."
        if ('priority' in fieldValues)
            temp.priority = fieldValues.priority != 0 ? "" : "This field is required."
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
                levelName:values.levelName,
            };
    if(values.id==0){
    axios.post('/api/level', client)
      .then(res => console.log(res.data));
     
    console.log(`Level successfully created!`);
    console.log(`Description: ${values.levelName}`);
            
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
                <Grid item xs={12}container
  direction="row"
  justifyContent="center"
  alignItems="center">
                <Controls.Input
                        name="levelName"
                        label="Level"
                        value={values.level}
                        onChange={handleInputChange}
                        error={errors.level}/>
                    </Grid>
                <br/> <br/> <br/>
                
                   
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



