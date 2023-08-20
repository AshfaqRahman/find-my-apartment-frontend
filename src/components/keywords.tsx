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
  const [inputKeyword, setInputKeyword] = React.useState("");
  let [keywordsWithId, setKeywordsWithId] = React.useState<any[]>([]);

  React.useEffect(() => {
    console.log("KeywordsComponent::fetchKeywords");
    fetchKeywords().then((response) => {
      if (!response.success) {
        push("/");
        return;
      }
      setKeywordsWithId(response.data);
      setKeywords(response.data.map((keyword: any) => keyword.title));
    });
  }, []);

  return (
    <Box>
      <AutoCompleteComponent
        multiple={true}
        value={props.value.map((id: any) => keywordsWithId.filter((keyword) => keyword.starpoint_id === id)[0]?.title)}
        setValue={(values: any) => {
          props.setValue(
            keywordsWithId
              .filter((keyword) => values.includes(keyword.title))
              .map((keyword) => keyword.starpoint_id)
          );
        }}
        inputValue={inputKeyword}
        setInputValue={setInputKeyword}
        options={keywords}
        title={"Star Points"}
      />
    </Box>
  );
}
