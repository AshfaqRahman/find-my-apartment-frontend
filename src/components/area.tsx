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
  };
  const handleMaxAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setArea([props.area[0], +event.target.value]);
  };
  return (
    <>
      <Grid container>
        <Grid item lg={12} md={12}>
          <Box sx={{ px: 2 }}>
            <SliderComponent
              title={"Area"}
              min={_area.min}
              max={_area.max}
              value={props.area}
              handleChange={handleAreaChange}
            />
          </Box>
        </Grid>
        <Grid item lg={6} md={6}>
          <Box sx={{ px: 1 }}>
            <TextFieldComponent
              label={"Min"}
              type={"number"}
              value={props.area[0]}
              handleChange={handleMinAreaChange}
            />
          </Box>
        </Grid>
        <Grid item lg={6} md={6}>
          <Box sx={{ px: 1 }}>
            <TextFieldComponent
              label={"Max"}
              value={props.area[1]}
              handleChange={handleMaxAreaChange}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
