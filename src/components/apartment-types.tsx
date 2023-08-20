import AutoCompleteComponent from "@/mui-components/autoComplete";
import MultiSelectComponent from "@/mui-components/multi-select";
import { _apartmentTypes } from "@/static/constants";
import { Box } from "@mui/material";
import React from "react";

export default function ApartmentTypesComponent(props: any) {
  const [inputTypes, setInputTypes] = React.useState("");
  const [apartmentTypes, setApartmentTypes] = React.useState(_apartmentTypes);
  return (
    <Box>
      <AutoCompleteComponent 
        multiple={true}
        value={props.value}
        setValue={props.setValue}
        inputValue={inputTypes}
        setInputValue={setInputTypes}
        options={apartmentTypes}
        title={"Apartment Types"}
      />
    </Box>
  );
}
