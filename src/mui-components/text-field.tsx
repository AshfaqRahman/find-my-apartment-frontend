import TextField from '@mui/material/TextField';
export default function TextFieldComponent(props: any) {
  return (
    <TextField
      id={props.label}
      label={props.label}
      variant="outlined"
      value={props.value}
      onChange={props.handleChange}
    />
  );
}
