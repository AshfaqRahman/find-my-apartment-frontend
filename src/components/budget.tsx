import SliderComponent from "@/mui-components/slider";
import TextFieldComponent from "@/mui-components/text-field";
import { _budget } from "@/static/constants";
import { Box, Grid } from "@mui/material";


export default function Budget(props: any) {
    
  const handleBudgetChange = (event: Event, newValue: number | number[]) => {
    props.setBudget(newValue as number[]);
  };
  const handleMinBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setBudget([+event.target.value, props.budget[1]]);
  }
  const handleMaxBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setBudget([props.budget[0], +event.target.value]);
  }
    return (
        <>
        <Grid item lg={props.grid_slider_lg} md={props.grid_slider_md}>
            <Box sx={{ mx: props.box_slider_mx, px: props.box_slider_px }}>
              <SliderComponent title={"Budget"} min={_budget.min} max={_budget.max} value={props.budget} handleChange={handleBudgetChange} />
            </Box>
          </Grid>
          <Grid item lg={props.grid_text_lg} md={props.grid_text_md}>
            <Box sx={{ mx: props.box_text_mx, px: props.box_text_px }}>
              <TextFieldComponent label={"Min"} value={props.budget[0]} handleChange={handleMinBudgetChange} />
            </Box>
          </Grid>
          <Grid item lg={props.grid_text_lg} md={props.grid_text_md}>
            <Box sx={{ mx: props.box_text_mx, px: props.box_text_px }}>
              <TextFieldComponent label={"Max"} value={props.budget[1]} handleChange={handleMaxBudgetChange} />
            </Box>
          </Grid>
        </>
    )
}