"use client";

import { _secondaryColor } from "@/static/constants";
import Button from "@mui/material/Button";

export default function ButtonComponent(props: any) {
  let style =
    props.style === "primary"
      ? {
          mx: 0,
          color: "white",
          display: "block",
          bgcolor: _secondaryColor,
          borderRadius: "50px",
        }
      : props.style === "secondary"
      ? {
          mx: 1,
          color: _secondaryColor,
          display: "block",
          bgcolor: "white",
          borderRadius: "50px",
        }
      : {};
  return (
    <Button
      variant={props.variant}
      onClick={props.onClick}
      fullWidth={props.fullWidth}
      href={props.link}
      sx={style}
    >
      {props.children}
    </Button>
  );
}
