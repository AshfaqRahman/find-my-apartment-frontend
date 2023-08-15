import TextField from '@mui/material/TextField';
export default function TextFieldComponent(props: any) {
  return (
    <TextField
      fullWidth
      type={props.type}
      id={props.label}
      label={props.label}
      variant="outlined"
      value={props.value}
      onChange={props.handleChange}
      disabled={props.disabled}
      sx={{
        "& .MuiInputBase-input.Mui-disabled": {
          WebkitTextFillColor: "rgba(0, 0, 0)",
        }
      }}
    />
  );
}
