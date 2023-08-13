import AutoCompleteComponent from "@/mui-components/autoComplete";
import MultiSelectComponent from "@/mui-components/multi-select";
import { _keywords } from "@/static/constants";
import { Box } from "@mui/material";
import React from "react";
import { fetchKeywords } from "./api/fixed-values";
import { useRouter } from "next/navigation";

export default function KeywordsComponent(props: any) {
  const { push } = useRouter();
  const [keywords, setKeywords] = React.useState([]);
  const [selectedKeywords, setSelectedKeywords] = React.useState<string[]>([]);
  const [inputKeyword, setInputKeyword] = React.useState("");

  React.useEffect(() => {
    console.log("KeywordsComponent::fetchKeywords");
    fetchKeywords().then((response) => {
      if(!response.success) {
        push("/login")
        return;
      }
      setKeywords(response.data);
    })
  }, [])

  React.useEffect(() => {
    props.onChange(selectedKeywords);
  }, [selectedKeywords]);

  return (
    <Box>
      <AutoCompleteComponent
        multiple={true}
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
