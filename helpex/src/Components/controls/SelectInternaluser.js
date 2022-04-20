import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import React from "react";

export default function SelectInternaluser(props) {
  const { title, label, value, error = null, onChange, options } = props;
  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={title} value={value} onChange={onChange}>
        <MenuItem value="">None</MenuItem>
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
