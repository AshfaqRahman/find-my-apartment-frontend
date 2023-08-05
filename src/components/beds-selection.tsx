import MultiSelectComponent from "@/mui-components/multi-select";
import { _beds } from "@/static/constants";
import { Box } from "@mui/material";
import React from "react";

export default function BedsSelectionComponent(props: any) {
  const [beds, setBeds] = React.useState(_beds);

  React.useEffect(() => {
    props.onChange(beds.filter((x) => x.checked).map((x) => x.name));
    console.log(beds);
  }, [beds]);
  const handleBedsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBeds(
      beds.map((x, idx) => {
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
        elements={beds}
        title={"Bedrooms"}
        handleChange={handleBedsChange}
      />
    </Box>
  );
}
