import AutoCompleteComponent from "@/mui-components/autoComplete";
import MultiSelectComponent from "@/mui-components/multi-select";
import { _facilities } from "@/static/constants";
import { Autocomplete, Box, Chip, TextField } from "@mui/material";
import React, { useState } from "react";

export default function FacilitiesComponent(props: any) {
  const [inputFacility, setInputFacilty] = React.useState("");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [facilities, setFacilities] = useState<any[]>(_facilities.map(x => x.name));

  React.useEffect(() => {
    props.onChange(selectedFacilities);
  }, [selectedFacilities]);

  return (
    <Box>
      <AutoCompleteComponent 
        value={selectedFacilities}
        setValue={setSelectedFacilities}
        inputValue={inputFacility}
        setInputValue={setInputFacilty}
        options={facilities}
        title={"Facilities"}
      />
    </Box>
  );
}
