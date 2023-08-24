import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { _color } from "@/static/constants";
import { Grid } from "@mui/material";

export default function MultiSelectComponent(props: any) {
  return (
    <FormControl sx={{ m: 0, p:0 }} component="fieldset" variant="standard">
      <Grid style={{display:"flex", justifyContent:"left"}}>
        <FormLabel component="legend"><span style={{"fontWeight": "bold", color: _color.secondary, display:"flex", justifyContent:"right"}}>{props.title}</span></FormLabel>  
      </Grid>    
        <FormGroup>
          <Grid style={{display:"flex"}}>
            {props.elements.map((element: any, idx: number) => {
              return (
                <FormControlLabel key={idx} sx={{ m: 0, p:0}}
                  control={
                      <Checkbox
                      sx={{ ml: 1, p: 0.5, pb: 0 }}
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
          </Grid>
        </FormGroup>
    </FormControl>
  );
}
