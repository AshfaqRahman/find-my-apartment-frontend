import MultiSelectComponent from "@/mui-components/multi-select";
import { _beds, _noOfResidents } from "@/static/constants";
import { Box } from "@mui/material";
import React from "react";

export default function NoOfResidentsSelectionComponent(props: any) {
  const [noOfResidents, setNoOfResidents] = React.useState(_noOfResidents);

  React.useEffect(() => {
    props.onChange(noOfResidents.filter((x) => x.checked).map((x) => +x.name));
    // console.log(noOfResidents);
  }, [noOfResidents]);
  const handleNoOfResidentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoOfResidents(
      noOfResidents.map((x, idx) => {
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
        elements={noOfResidents}
        title={"No. of Residents"}
        handleChange={handleNoOfResidentsChange}
      />
    </Box>
  );
}
