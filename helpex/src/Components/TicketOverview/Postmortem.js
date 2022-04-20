import React, { useState, useEffect } from "react";
import { Grid, TextField, makeStyles } from "@material-ui/core";
import Controls from "../controls/Controls";
import { useForm, Form } from "../useForm";
import axios from "axios";
import * as employeeService from "../../services/employeeService";
import { useParams } from "react-router-dom";
const UseStyles = makeStyles({
  align: {
    display: "flex",
    left: "100px",
  },
});

const initialFValues = {
  id: 0,
  dateOfIncident: "",
  ticket_id: "",
  whatHappened: "",
  why_did_it_Happen: "",
  how_was_it_Resolved: "",
  recomendation: "",
};

export default function ClientForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const classes = UseStyles();
  const params = useParams();
  const [dateOfIncident, setdateOfIncident] = useState("");
  const [ticket_id, setticket_id] = useState("");
  const [whatHappened, setwhatHappened] = useState("");
  const [why_did_it_Happen, setwhy_did_it_Happen] = useState("");
  const [how_was_it_Resolved, sethow_was_it_Resolved] = useState("");
  const [recomendation, setrecomendation] = useState("");
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("ClientName" in fieldValues)
      temp.ClientName = /^[a-zA-Z]+$/.test(fieldValues.ClientName)
        ? ""
        : "This field is required.";
    if ("Representative_FirstName" in fieldValues)
      temp.Representative_FirstName = /^[a-zA-Z]+$/.test(
        fieldValues.Representative_FirstName
      )
        ? ""
        : "This field is required.";
    if ("Representative_LastName" in fieldValues)
      temp.Representative_LastName = /^[a-zA-Z]+$/.test(
        fieldValues.Representative_LastName
      )
        ? ""
        : "This field is required.";
    if ("Representative_email" in fieldValues)
      temp.Representative_email = /$^|.+@.+..+/.test(
        fieldValues.Representative_email
      )
        ? ""
        : "Email is not valid.";
    if ("ClientDescription" in fieldValues)
      temp.ClientDescription = fieldValues.ClientDescription
        ? ""
        : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    const formData = new FormData();
    const ticket_status = 4;
    if (validate()) {
      e.preventDefault();
      formData.append("dateOfIncident", dateOfIncident);
      formData.append("whatHappened", whatHappened);
      formData.append("why_did_it_Happen", why_did_it_Happen);
      formData.append("how_was_it_Resolved", how_was_it_Resolved);
      formData.append("recomendation", recomendation);
      formData.append("ticket_id", params.id);
    }
    if (values.id == 0) {
      axios
        .post("/api/postmortem", formData)
        .then((res) => console.log(res.data));
      axios
        .put(`/api/ticket/${params.id}?ticket_status=${ticket_status}`)
        .then((res) => console.log(res.data));

      console.log(`Client successfully created!`);
      console.log(`Name: ${values.dateOfIncident}`);
      console.log(`First Name: ${values.whatHappened}`);
      console.log(`Last Name: ${values.why_did_it_Happen}`);
      console.log(`Email: ${values.how_was_it_Resolved}`);
      console.log(`Description: ${values.recomendation}`);
      console.log(`Ticket_id: ${params.id}`);
    }
    addOrEdit(values, resetForm);
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} container elevation={7}>
          <TextField
            format="MMMM,dd,YYYY"
            label="When did it happen?"
            type="date"
            variant="outlined"
            onChange={(e) => setdateOfIncident(e.target.value)}
            error={errors.dateOfIncident}
            InputLabelProps={{ shrink: true }}
          />
          <Grid item xs={12} container direction="row">
            <Grid item xs={6}>
              <Controls.Input
                label="What exactly happened?"
                onChange={(e) => setwhatHappened(e.target.value)}
                error={errors.whatHappened}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.Input
                label="Why did it happen?"
                onChange={(e) => setwhy_did_it_Happen(e.target.value)}
                error={errors.why_did_it_Happen}
                style={{ marginLeft: "-90px" }}
              />
            </Grid>
          </Grid>
          <Controls.TextField
            label="What measures was taken?"
            onChange={(e) => sethow_was_it_Resolved(e.target.value)}
            error={errors.how_was_it_Resolved}
          />
          <Controls.TextField
            label="Recommendation"
            onChange={(e) => setrecomendation(e.target.value)}
            error={errors.recomendation}
          />{" "}
        </Grid>
      </Grid>
      <div className={classes.align}>
        <Controls.Button type="submit" text="Submit" />
        <Controls.Button text="Reset" color="default" onClick={resetForm} />
      </div>
    </Form>
  );
}
