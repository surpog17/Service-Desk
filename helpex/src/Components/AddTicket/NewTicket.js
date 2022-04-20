import React, { useState, useEffect } from 'react'
import * as yup from 'yup';
import { Grid, TextField, Paper, makeStyles, Button} from '@material-ui/core';
import Controls from "../controls/Controls";
import { useForm, Form } from '../useForm';
import axios from "axios"
import { useParams,useHistory } from "react-router-dom";
import * as clientService from "../../services/clientService";


const UseStyles = makeStyles({

    root: {
        padding:"50px",
        // width:"97%",
  },
    align: {
        display: "flex",
        justifyContent: "flex-end",
  },
    input: {
      display: '',
  },
  style:{
      width:"40vh", 
      marginLeft:'65px'
    },
     
})
const initialFValues = {
    id: 0,
    Client_id:'',
    Project_id: '',
    Issue: '',
    Tag_id: '',
    Priorty:'',
    date:'',
    Description:'',
    document:'',
    ticket_status:1,

}


export default function AdminTicket(props) {
        const params = useParams();
        const history=useHistory();
        const[Project_id,setProject]=useState("");
        const[Issue,setIssue]=useState("");
        const[Tag_id,setTag]=useState("");
        const[Priorty,setPriorty]=useState("");
        const[date,setDate]=useState("");
        const[Description,setDescription]=useState("");
        const[Document,setDocument]=useState("");
        const { addOrEdit, recordForEdit } = props
        const classes = UseStyles();
    
    
        const validate = (fieldValues = values) => {
            let temp = { ...errors }
            if ('issue' in fieldValues)
            temp.issue = fieldValues.issue ? "" : "This field is required."
            if ('project' in fieldValues)
                temp.project = fieldValues.project ? "" : "This field is required."
            if ('priority' in fieldValues)
                temp.priority = fieldValues.priority != 0 ? "" : "This field is required."
            if ('when' in fieldValues)
                temp.when = fieldValues.when ? "" : "This field is required."
            if ('description' in fieldValues)
                temp.description = fieldValues.description ? "" : "This field is required."
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
       const formData = new FormData();
        e.preventDefault()
            formData.append('Client_id', params.clientid);
            formData.append('Clientuser_id', params.userId);
            formData.append('Project_id', Project_id);
            formData.append('Issue',Issue);
            formData.append('Tag_id', Tag_id);
            formData.append('Priorty', Priorty);
            formData.append('date', date);
            formData.append('Description',Description)
            formData.append('document', Document);
            formData.append('ticket_status', 1);

        //    const ticket = {
        //         Project_id: values.Project_id,
        //         Issue: values.Issue,
        //         Tag_id: values.Tag_id,
        //         Priorty: values.Priorty,
        //         date: values.date,
        //         Description: values.Description,
        //         document: values.document,
        //         ticket_status:values.ticket_status,
                
                
        //         };
    axios.post(`/api/ticket/?Client_id=${params.userId}&Clientuser_id=${params.clientid}`, formData,
    {
        headers: {
            "Content-Type": "application/json"
          }
    }).then(res => console.log(res.data));
    console.log(`Expense successfully created!`);
    console.log(`Issue: ${Issue}`);
    console.log(`Project: ${Project_id}`);
    console.log(`Tag: ${Tag_id}`);
    console.log(`Priority: ${Priorty}`);
    console.log(`Client_id: ${params.id}`);
    console.log(`date: ${date}`);
    console.log(`Document: ${document}`);
    history.push(`/ClientHome/${params.clientid}/${params.userId}/`)
    }



    return (
        <Form onSubmit={handleSubmit}>
          <Paper elevation={2} className={classes.root} >

            <Grid container columnSpacing={5} rowSpacing={1}>
                <Grid item xs={12} container direction="row" >
                <Grid item xs={6}>
                    <Controls.Input
                    name="Issue"
                    label="Issue"
                    onChange={(e)=>setIssue(e.target.value)}
                    error={errors.Issue}    
                    />
                    </Grid>
                    <Grid item sm={6} > 
                    <Controls.Selectproject
                    style={{width:"70vh", marginLeft:'50px'}}
                    label="Project"
                    name="Project_id"
                    onChange={(e)=>setProject(e.target.value)}
                    options={clientService.getProjectCollection()}
                    error={errors.Project_id}    
                    />
                    </Grid>
                    </Grid>
                    <Grid item xs={12} container direction="row">
                    <Grid item sm={5}> 
                    <Controls.SelectTags
                        name="Tag_id"
                        label="Tag"
                        value={values.tag_id}
                        onChange={(e)=>setTag(e.target.value)}
                        options={clientService.getTagsCollection()}
                        error={errors.Tag_id}/>
                        {/* <Controls.Input
                    name="Tag_id"
                    label="Tags"
                    
                    onChange={(e)=>setTag(e.target.value)}
                      
                    /> */}
                    </Grid>   
                    <Grid item sm={3}> 
                    <Controls.SelectPriority
                        name="Priorty"
                        label="Priority"
                        value={values.priorty}
                        onChange={(e)=>setPriorty(e.target.value)}
                        options={clientService.getPriorityCollection()}
                        error={errors.priorty}/>
                    {/* <Controls.Input
                    name="Priorty"
                    label="Priorty"
                    
                    onChange={(e)=>setPriorty(e.target.value)}
                     
                    /> */}
                    </Grid>
                     <Grid item xs={4} datepicker="input" >
                  <TextField
                  className={classes.style}               
                  name="date"
                  label="When did you face this issue?"
                  
                  type="date"
                  fullWidth
                  variant="outlined"
                  
                  onChange={(e)=>setDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                    /> </Grid>  
                    </Grid>              
                    <Grid item xs={12}>  
                    <Controls.Input
                        style={{width: '100%'}}
                        multiline
                        rows={9}
                        label="Issue description"
                        name="Description"
                        
                        onChange={(e)=>setDescription(e.target.value)}
                        error={errors.Description}
                    /></Grid>
                          <Grid item xs={4}>
                <div className={classes.align}>
                        <Controls.Input
                        style={{width:'90vh'}}
                        name="document"
                        placeholder="Add Attachments"
                        
                        // label={values.attachment == "" ? "Add Attachments": ""}                     
                        onChange={(e)=>setDocument(e.target.files[0])}
                        id="document"
                        type="file"
                        multiple/>
                         {/* <img src={Document} style={{width:"100px",height:"100px"}}/> */}
                        </div>
                        </Grid> 
                     

                    <br/>
                    <br/>
                                        
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
                
         </Paper>
        </Form>
    )
}

