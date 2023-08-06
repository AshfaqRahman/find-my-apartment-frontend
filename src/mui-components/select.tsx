import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

export default function SelectComponent(props: any) {
  return (
    <Box sx={{ maxWidth: 240 }}>
      <FormControl fullWidth>
        <InputLabel >{props.title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          label={props.title}
          key={props.value}
          onChange={(event: any) => props.handleChange(event.target.value)}
        >
          {props.elements.map((element: any, idx: any) => {
            return <MenuItem key={idx} value={element}>{element}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
