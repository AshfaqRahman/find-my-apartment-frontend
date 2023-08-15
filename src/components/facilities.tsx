import AutoCompleteComponent from "@/mui-components/autoComplete";
import MultiSelectComponent from "@/mui-components/multi-select";
import { _facilities } from "@/static/constants";
import { Autocomplete, Box, Chip, TextField } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchFacilities } from "./api/fixed-values-api";

export default function FacilitiesComponent(props: any) {
  const { push } = useRouter();

  const [inputFacility, setInputFacilty] = React.useState("");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [facilities, setFacilities] = useState<any[]>([]);
  let [facilitiesWithId, setfacilitiesWithId] = useState<any[]>([]);

  // let getFacilities = async () {

  // }

  React.useEffect(() => {
    console.log("FacilitiesComponent::fetching facilities");
    fetchFacilities().then((response) => {
      if(!response.success) {
        push("/login")
        return;
      }
      
      setfacilitiesWithId(response.data);
      setFacilities(response.data.map((keyword: any) => keyword.title));
    })
  }, [])

  React.useEffect(() => {

    let facilitiesID = facilitiesWithId.filter(facilities => selectedFacilities.includes(facilities.title)).map(facilities => facilities.facilities_id);
    console.log(facilitiesID);
    props.onChange(facilitiesID);

  }, [selectedFacilities]);

  return (
    <Box>
      <AutoCompleteComponent 
        multiple={true}
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
