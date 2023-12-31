import * as React from "react";
import { Box, TextareaAutosize } from "@mui/material";
import { styled } from "@mui/system";
import { _centeringStyle, _color } from "@/static/constants";

export default function TextAreaComponent(props: any) {
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#f6f8fa",
    100: "#eaeef2",
    200: "#d0d7de",
    300: "#afb8c1",
    400: "#8c959f",
    500: "#6e7781",
    600: "#57606a",
    700: "#424a53",
    800: "#32383f",
    900: "#24292f",
  };

  // const StyledTextarea = styled(TextareaAutosize)(
  //   ({ theme }) => `
  //   font-weight: 400;
  //   font-size: 1.05rem;
  //   line-height: 1;
  //   padding: 12px;
  //   border-radius: 12px 12px 0 12px;
  //   color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  //   background: ${theme.palette.mode === "dark" ? grey[900] : _color.background_left};
  //   border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  //   box-shadow: 0px 2px 2px ${
  //     theme.palette.mode === "dark" ? grey[900] : grey[500]
  //   };
  
  //   &:hover {
  //     border-color: ${blue[400]};
  //   }
  
  //   &:focus {
  //     border-color: ${blue[400]};
  //     box-shadow: 0 0 0 3px ${
  //       theme.palette.mode === "dark" ? blue[500] : blue[200]
  //     };
  //   }
  
  //   // firefox
  //   &:focus-visible {
  //     outline: 0;
  //   }
  // `
  // );

  return (
    
    <div>
      <b>{props.title}</b>
      <Box width={"100"} sx={{
        ..._centeringStyle
      }} >
        <TextareaAutosize
          onChange={(e) => props.handleChange(e)}
          maxRows={3}
          minRows={3}
          style={{
            width: "100%",
            fontWeight: 400,
            fontSize: "1.05rem",
            lineHeight: 1,
            padding: 12,
            borderRadius: "12px 12px 0 12px",
            backgroundColor: _color.background_left,
          }}
          maxLength={1000}
          // aria-label="empty textarea"
          value={props.value}
          // placeholder=""
        />
      </Box>
    </div>
  );
}
