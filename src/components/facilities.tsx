import MultiSelectComponent from "@/mui-components/multi-select";
import { _facilities } from "@/static/constants";
import { Box } from "@mui/material";
import React from "react";


export default function FacilitiesComponent(props: any) {
    const [facilities, setFacilities] = React.useState(_facilities);
    React.useEffect(() => {
        props.onChange(facilities.filter((x) => x.checked).map((x) => x.name));

    }, [facilities])
    const handleFacilitiesChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        setFacilities(
            facilities.map((x, idx) => {
            if (idx.toString() === event.target.id) {
              return {
                ...x,
                checked: event.target.checked,
              };
            }
            return x;
          })
        );
      };
    return (
        <Box sx={{ mx: "10px" }}>
              <MultiSelectComponent
                elements={facilities}
                title={"Facilities"}
                handleChange={handleFacilitiesChange}
              />
            </Box>
    );
}