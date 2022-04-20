import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Controls from "../../Components/controls/Controls";
import { useForm, Form } from "../../Components/useForm";
import * as clientService from "../../services/clientService";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useParams } from "react-router";

const UseStyles = makeStyles({
  align: {
    display: "flex",
    justifyContent: "flex-end",
  },
  select: {
    border: 0,
    margin: 0,
    display: "inline-flex",
    padding: 0,
    position: "relative",
    minWidth: 0,
    flexDirection: "column",
    verticalAlign: "top",
  },
});

const initialFValues = {
  id: 0,
};
export default function Assignedto(props) {
  const { addOrEdit, recordForEdit } = props;
  const classes = UseStyles();
  const [Priorty, setPriorty] = useState("");
  const [internaluser, setInternaluser] = useState("");
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*,])(?=.{8,})"
  );

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    // const password = temp.password
    if ("firstName" in fieldValues)
      temp.firstName = /^[a-zA-Z]+$/.test(fieldValues.firstName)
        ? ""
        : "This field is required.";
    if ("lastName" in fieldValues)
      temp.lastName = /^[a-zA-Z]+$/.test(fieldValues.lastName)
        ? ""
        : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("password" in fieldValues)
      temp.password = strongRegex.test(fieldValues.password)
        ? ""
        : "The password must be at least 8 characters.";
    // const pwd = temp.password;
    // if ('passwordConfirmation'in fieldValues)
    // temp.password = (strongRegex).test(fieldValues.password)
    // temp.passwordConfirmation =(pwd).test(fieldValues.passwordConfirmation) ? "" : "The password need to match."
    if (values.password !== values.passwordConfirmation) {
      temp.passwordConfirmation =
        values.password !== values.passwordConfirmation
          ? ""
          : "Password not match";
    } else {
    }
    if ("project" in fieldValues)
      temp.project =
        fieldValues.project.length !== 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );
  const [data, setData] = useState([]);
  const params = useParams();
  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  const handleLevel = (e) => {
    const level = e.target.value;
    axios.get(`/api/internaluserlevel/${level}`).then((response) => {
      setData(response.data);
      console.log(`interanl User level${level}`);
      console.log(response.data);
    });
  };
  const handleSubmit = (e, id) => {
    const formData = new FormData();
    e.preventDefault();
    formData.append("internaluser_id", internaluser);
    console.log(`test:" ${internaluser}`);
    axios
      .put(`/api/ticket/${params.id}?internaluser_id=${internaluser}`, formData)
      .then((res) => console.log(res.data));
    addOrEdit(values, resetForm);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item sm={12}>
          <Controls.Selectlevel
            name="level"
            label="Level"
            onChange={handleLevel}
            options={clientService.getLevelCollection()}
            error={errors.priorty}
          />
          <Select
            name="internaluser_id"
            onChange={(e) => setInternaluser(e.target.value)}
            label="Support Engineer"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {data.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.firstName + " " + option.lastName}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <div className={classes.align}>
        <Controls.Button text="Reset" color="default" onClick={resetForm} />
        <Controls.Button type="submit" text="Submit" />
      </div>
    </Form>
  );
}
