import { Autocomplete, Chip, TextField } from "@mui/material";

export default function AutoCompleteComponent(props: any) {

  return (
    <Autocomplete
        value={props.value}
        multiple={props.multiple}
        onChange={(event: any, newValue: string[]) => {
          props.setValue(newValue);
        }}
        filterSelectedOptions
        id="controllable-states-demo"
        inputValue={props.inputValue}
        onInputChange={(event, newInputValue) => {
          props.setInputValue(newInputValue);
        }}
        options={props.options}
        sx={{ width: "100%" }}
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => (
            <Chip {...getTagProps({ index })} key={option} label={option} />
          ))
        }}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option}>
              {option}
            </li>
          )
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.title}
            placeholder={props.title}
          />
        )}/>
  );
}
