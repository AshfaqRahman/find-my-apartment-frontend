import MultiSelectComponent from "@/mui-components/multi-select";
import { _beds, _noOfLivingRooms } from "@/static/constants";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import React from "react";

export default function NoOfLivingRoomsSelectionComponent(props: any) {
  const [noOfLivingRooms, setNoOfLivingRooms] = React.useState(_noOfLivingRooms);

  React.useEffect(() => {
    props.onChange(noOfLivingRooms.filter((x) => x.checked).map((x) => +x.name));
    // console.log(noOfLivingRooms);
  }, [noOfLivingRooms]);
  const handleNoOfLivingRoomsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoOfLivingRooms(
      noOfLivingRooms.map((x, idx) => {
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
        elements={noOfLivingRooms}
        title={"Bedrooms"}
        handleChange={handleNoOfLivingRoomsChange}
      />
    </Box>
  );
}
