import MultiSelectComponent from "@/mui-components/multi-select";
import { _beds, _personInRooms } from "@/static/constants";
import { Box } from "@mui/material";
import React from "react";

export default function PersonsInRoomSelectionComponent(props: any) {
  const [personsInRoom, setPersonsInRoom] = React.useState(_personInRooms);

  React.useEffect(() => {
    props.onChange(personsInRoom.filter((x) => x.checked).map((x) => +x.name));
    // console.log(personsInRoom);
  }, [personsInRoom]);
  const handlePersonsInRoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPersonsInRoom(
      personsInRoom.map((x, idx) => {
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
        elements={personsInRoom}
        title={"No. of Roommates"}
        handleChange={handlePersonsInRoomChange}
      />
    </Box>
  );
}
