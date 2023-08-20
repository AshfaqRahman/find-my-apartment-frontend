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
  const [facilities, setFacilities] = useState<any[]>([]);
  let [facilitiesWithId, setfacilitiesWithId] = useState<any[]>([]);

  React.useEffect(() => {
    console.log("FacilitiesComponent::fetching facilities");
    fetchFacilities().then((response) => {
      if(!response.success) {
        push("/")
        return;
      }
      
      setfacilitiesWithId(response.data);
      setFacilities(response.data.map((keyword: any) => keyword.title));
    })
  }, [])

  return (
    <Box>
      <AutoCompleteComponent 
        multiple={true}
        value={props.value.map((id: any) => facilitiesWithId.filter((facilities) => facilities.facilities_id === id)[0]?.title)}
        setValue={(values: any) => {
          props.setValue(
            facilitiesWithId
              .filter((facilities) => values.includes(facilities.title))
              .map((facilities) => facilities.facilities_id)
          );
        }}
        inputValue={inputFacility}
        setInputValue={setInputFacilty}
        options={facilities}
        title={"Facilities"}
      />
    </Box>
  );
}
