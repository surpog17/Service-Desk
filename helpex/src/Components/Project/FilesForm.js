import React, { useState, useEffect } from 'react'
import { Grid,makeStyles } from '@material-ui/core';
import Controls from "../controls/Controls";
import { useForm, Form } from '../useForm';
import * as clientService from "../../services/clientService";
import { useParams,useHistory } from "react-router-dom";
import axios from "axios"
import * as employeeService from "../../services/employeeService";

const UseStyles = makeStyles({

    align: {
        display: "flex",
        left:"100px"
  },
  tags:{
      marginTop:"-70px",
      marginLeft:"350px"
  },
  uploadButton: {
    position: 'absolute',
    right: '95px'
},
input: {
    display: 'none',
  },
})


const initialFValues = {
    id: 0,
    Project_id: '',
    Filename: '',
    Tag_id: '',
    Description:'',
    document:'',

}

export default function FilesForm(props) {
    const[Document,setDocument]=useState("");
    const[Tag_id,setTag]=useState("");
    const[Description,setDescription]=useState("");
    const[filename,setFilename]=useState("");
    const[Project_id,setProject]=useState("");
    const classes = UseStyles();
    const params=useParams();
    const { addOrEdit, recordForEdit } = props
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('filename' in fieldValues)
            temp.filename = (/^[a-zA-Z]+$/).test(fieldValues.filename) ? "" : "This field is required."
        if ('Representative_FirstName' in fieldValues)
            temp.description = (/^[a-zA-Z]+$/).test(fieldValues.description) ? "" : "This field is required."
        if ('tags' in fieldValues)
            temp.tags = (/^[a-zA-Z]+$/).test(fieldValues.tags) ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        errors,
        setValues,
        setErrors,
        resetForm
    } = useForm(initialFValues, true, validate);
    
    const handleSubmit = e => {
        const formData = new FormData();
          if(values.id==0){
         e.preventDefault()
             formData.append('Project_id', params.id);
             formData.append('Tag_id', Tag_id);
             formData.append('filename', filename)
             formData.append('Description',Description)
             formData.append('document', Document);
     axios.post(`/api/projectfile/?Project_id=${params.id}`, formData,
     {
         headers: {
             "Content-Type": "application/json"
           }
     }).then(res => console.log(res.data));
     console.log(`Expense successfully created!`);
     console.log(`Filename: ${filename}`);
     console.log(`Project: ${params.id}`);
     console.log(`Tag: ${Tag_id}`); 
     console.log(`Document: ${Document}`);
     }
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
                <Grid item xs={6} container elevation={7}>
                    <Controls.Input
                        name="filename"
                        label="Filename"
                        onChange={(e)=>setFilename(e.target.value)}
                        error={errors.filename}
                    />
                        <Controls.TextField
                        label=" Description"
                        name="description"
                        onChange={(e)=>setDescription(e.target.value)}
                        error={errors.description}
                    /></Grid>
                    <Grid item xs={6} classname={classes.tags}>
                    <Grid item xs={12} >
                    <Controls.SelectTags
                        name="tags"
                        label="Tags"
                        value={values.Tags}
                        onChange={(e)=>setTag(e.target.value)}
                        options={clientService.getTagsCollection()}
                        //error={errors.tags}
                    />
                        </Grid>
                        <Controls.Input
                        name="document"
                        placeholder="Add Attachments"                     
                        onChange={(e)=>setDocument(e.target.files[0])}
                        id="document"
                        type="file"
                        multiple/>
                    </Grid>
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
