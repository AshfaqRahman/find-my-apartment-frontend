import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

export default function MultiSelectComponent(props: any) {
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setState({
  //       ...state,
  //       [event.target.name]: event.target.checked,
  //     });
  //   };
  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel component="legend">{props.title}</FormLabel>
      <FormGroup>
        {props.elements.map((element: any, idx: number) => {
          return (
            <FormControlLabel key={idx}
              control={
                <Checkbox
                  id={idx.toString()}
                  checked={element.checked}
                  onChange={(e) => props.handleChange(e)}
                  name={element.name}
                />
              }
              label={element.label}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
}
