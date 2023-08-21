import MultiSelectComponent from "@/mui-components/multi-select";
import { _baths } from "@/static/constants";
import { Box } from "@mui/material";
import React from "react";

export default function BathsSelectionComponent(props: any) {
    
  const [baths, setBaths] = React.useState(_baths);

  React.useEffect(() => {
    props.onChange(baths.filter((x) => x.checked).map((x) => +x.name));
  }, [baths]);
  const handleBathsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBaths(
      baths.map((x, idx) => {
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
    <Box sx={{ mx: "10px"}}>
      <MultiSelectComponent
        elements={baths}
        title={"Bathrooms"}
        handleChange={handleBathsChange}
      />
    </Box>
  );
}
