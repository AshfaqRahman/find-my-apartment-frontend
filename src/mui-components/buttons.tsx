"use client";

import { _color } from "@/static/constants";
import Button from "@mui/material/Button";

export default function ButtonComponent(props: any) {
  let style =
    props.style === "primary"
      ? {
          mx: 0,
          color: _color.primary,
          display: "block",
          bgcolor: _color.secondary,
          borderRadius: "50px",
        }
      : props.style === "secondary"
      ? {
          mx: 1,
          color: _color.secondary,
          display: "block",
          bgcolor: _color.primary,
          borderRadius: "50px",
        }
      : props.style === "tab"
      ? {
          color: _color.secondary,
          display: "block",
          bgcolor: _color.background_upper,
          borderRadius: "0px",
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
