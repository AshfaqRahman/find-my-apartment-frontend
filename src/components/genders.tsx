import MultiSelectComponent from "@/mui-components/multi-select";
import { _beds, _genders } from "@/static/constants";
import { Box } from "@mui/material";
import React from "react";

export default function GendersSelectionComponent(props: any) {
  const [genders, setGenders] = React.useState(_genders);

  React.useEffect(() => {
    props.onChange(genders.filter((x) => x.checked).map((x) => x.name));
    console.log(genders);
  }, [genders]);
  const handleGendersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenders(
      genders.map((x, idx) => {
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
        elements={genders}
        title={"Gender"}
        handleChange={handleGendersChange}
      />
    </Box>
  );
}
