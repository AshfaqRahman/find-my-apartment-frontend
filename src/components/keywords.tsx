import AutoCompleteComponent from "@/mui-components/autoComplete";
import MultiSelectComponent from "@/mui-components/multi-select";
import { _keywords } from "@/static/constants";
import { Box } from "@mui/material";
import React from "react";

export default function KeywordsComponent(props: any) {
  const [keywords, setKeywords] = React.useState(_keywords.map(x => x.name));
  const [selectedKeywords, setSelectedKeywords] = React.useState<string[]>([]);
  const [inputKeyword, setInputKeyword] = React.useState("");

  React.useEffect(() => {
    props.onChange(selectedKeywords);
  }, [keywords]);

  return (
    <Box>
      <AutoCompleteComponent
        value={selectedKeywords}
        setValue={setSelectedKeywords}
        inputValue={inputKeyword}
        setInputValue={setInputKeyword}
        options={keywords}
        title={"Star Points"}
      />
    </Box>
  );
}
