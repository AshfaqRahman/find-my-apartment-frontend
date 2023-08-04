import SliderComponent from "@/mui-components/slider";
import TextFieldComponent from "@/mui-components/text-field";
import { _area } from "@/static/constants";
import { Box, Grid } from "@mui/material";


export default function Area(props: any) {
    
  const handleAreaChange = (event: Event, newValue: number | number[]) => {
    props.setArea(newValue as number[]);
  };
  const handleMinAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setArea([+event.target.value, props.area[1]]);
  }
  const handleMaxAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setArea([props.area[0], +event.target.value]);
  }
    return (
        <>
        <Grid item md={props.grid_slider_md}>
            <Box sx={{ mx: props.box_slider_mx, px: props.box_slider_px }}>
              <SliderComponent title={"Area"} min={_area.min} max={_area.max} value={props.area} handleChange={handleAreaChange} />
            </Box>
          </Grid>
          <Grid item md={props.grid_text_md}>
            <Box sx={{ mx: props.box_text_mx, px: props.box_text_px }}>
              <TextFieldComponent label={"Min"} value={props.area[0]} handleChange={handleMinAreaChange} />
            </Box>
          </Grid>
          <Grid item md={props.grid_text_md}>
            <Box sx={{ mx: props.box_text_mx, px: props.box_text_px }}>
              <TextFieldComponent label={"Max"} value={props.area[1]} handleChange={handleMaxAreaChange} />
            </Box>
          </Grid>
        </>
    )
}