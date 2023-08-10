import AutoCompleteComponent from "@/mui-components/autoComplete";
import MultiSelectComponent from "@/mui-components/multi-select";
import { _apartmentTypes } from "@/static/constants";
import { Box } from "@mui/material";
import React from "react";

export default function ApartmentTypesComponent(props: any) {
  const [apartmentTypes, setApartmentTypes] = React.useState(_apartmentTypes);
  const [selectedApartmentTypes, setSelectedApartmentTypes] = React.useState([]);
  const [inputTypes, setInputTypes] = React.useState("");
  React.useEffect(() => {
    props.onChange(selectedApartmentTypes);
  }, [apartmentTypes]);
  return (
    <Box>
      <AutoCompleteComponent 
        multiple={true}
        value={selectedApartmentTypes}
        setValue={setSelectedApartmentTypes}
        inputValue={inputTypes}
        setInputValue={setInputTypes}
        options={apartmentTypes}
        title={"Apartment Types"}
      />
    </Box>
  );
}
