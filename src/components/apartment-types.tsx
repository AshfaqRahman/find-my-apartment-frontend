import MultiSelectComponent from "@/mui-components/multi-select";
import { _apartmentTypes } from "@/static/constants";
import { Box } from "@mui/material";
import React from "react";


export default function ApartmentTypesComponent(props: any) {
    const [apartmentTypes, setApartmentTypes] = React.useState(_apartmentTypes);
    React.useEffect(() => {
        props.onChange(apartmentTypes.filter((x) => x.checked).map((x) => x.name));

    }, [apartmentTypes])
    const handleApartmentTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        console.log(event)
        setApartmentTypes(
          apartmentTypes.map((x, idx) => {
            if (idx.toString() === event.target.id) {
                console.log(x);
              return {
                ...x,
                checked: event.target.checked,
              };
            }
            return x;
          })
        );
        // console.log(apartmentTypes)
        // props.onChange(apartmentTypes.filter((x) => x.checked).map((x) => x.name));
      };
    return (
        <Box sx={{ mx: "10px" }}>
              <MultiSelectComponent
                elements={apartmentTypes}
                title={""}
                handleChange={handleApartmentTypeChange}
              />
            </Box>
    );
}