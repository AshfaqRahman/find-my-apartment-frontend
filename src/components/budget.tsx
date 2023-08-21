import SliderComponent from "@/mui-components/slider";
import TextFieldComponent from "@/mui-components/text-field";
import { _budget } from "@/static/constants";
import { Box, Grid } from "@mui/material";

export default function Budget(props: any) {
  const handleBudgetChange = (event: Event, newValue: number | number[]) => {
    props.setBudget(newValue as number[]);
  };
  const handleMinBudgetChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setBudget([+event.target.value, props.budget[1]]);
  };
  const handleMaxBudgetChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setBudget([props.budget[0], +event.target.value]);
  };
  return (
    <>
      <Grid container>
        <Grid item lg={12} md={12}>
          <Box sx={{ px: 2 }}>
            <SliderComponent
              title={"Budget"}
              min={_budget.min}
              max={_budget.max}
              value={props.budget}
              handleChange={handleBudgetChange}
            />
          </Box>
        </Grid>
        <Grid item lg={6} md={6}>
          <Box sx={{ px: 1 }}>
            <TextFieldComponent
              label={"Min Budget"}
              value={props.budget[0]}
              handleChange={handleMinBudgetChange}
            />
          </Box>
        </Grid>
        <Grid item lg={6} md={6}>
          <Box sx={{ px: 1 }}>
            <TextFieldComponent
              label={"Max Budget"}
              value={props.budget[1]}
              handleChange={handleMaxBudgetChange}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
