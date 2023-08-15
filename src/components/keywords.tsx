import AutoCompleteComponent from "@/mui-components/autoComplete";
import MultiSelectComponent from "@/mui-components/multi-select";
import { _keywords } from "@/static/constants";
import { Box } from "@mui/material";
import React from "react";
import { fetchKeywords } from "./api/fixed-values-api";
import { useRouter } from "next/navigation";

export default function KeywordsComponent(props: any) {
  const { push } = useRouter();
  const [keywords, setKeywords] = React.useState([]);
  const [selectedKeywords, setSelectedKeywords] = React.useState<string[]>([]);
  const [inputKeyword, setInputKeyword] = React.useState("");
  let [keywordsWithId, setKeywordsWithId] = React.useState<any[]>([]);

  React.useEffect(() => {
    console.log("KeywordsComponent::fetchKeywords");
    fetchKeywords().then((response) => {
      if(!response.success) {
        push("/")
        return;
      }
      setKeywordsWithId(response.data);
      setKeywords(response.data.map((keyword: any) => keyword.title));
    })
  }, [])

  React.useEffect(() => {
    let keywordsID = keywordsWithId.filter(keyword => selectedKeywords.includes(keyword.title)).map(keyword => keyword.starpoint_id);
    console.log(keywordsID);
    props.onChange(keywordsID);
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
