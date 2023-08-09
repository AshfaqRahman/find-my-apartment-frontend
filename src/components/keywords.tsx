import MultiSelectComponent from "@/mui-components/multi-select";
import { _keywords } from "@/static/constants";
import { Box } from "@mui/material";
import React from "react";


export default function KeywordsComponent(props: any) {
    const [keywords, setKeywords] = React.useState(_keywords);
    React.useEffect(() => {
        props.onChange(keywords.filter((x) => x.checked).map((x) => x.name));

    }, [keywords])
    const handleKeywordsChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        setKeywords(
            keywords.map((x, idx) => {
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
        <Box sx={{ mx: "1px" }}>
              <MultiSelectComponent
                elements={keywords}
                title={"Keywords"}
                handleChange={handleKeywordsChange}
              />
            </Box>
    );
}