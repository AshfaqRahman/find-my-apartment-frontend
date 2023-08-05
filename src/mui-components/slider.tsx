import Slider from "@mui/material/Slider";

export default function SliderComponent(props: any) {
  return (
    <>
      <div className="flex justify-between">
        <span>{props.title}</span>
      </div>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={props.value}
        min={props.min}
        max={props.max}
        onChange={props.handleChange}
        valueLabelDisplay="auto"
      />
    </>
  );
}
