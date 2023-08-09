"use client";

import Button from "@mui/material/Button";

export default function ButtonComponent(props: any) {
  let style =
    props.style === "primary"
      ? {
          mx: 2,
          color: "white",
          display: "block",
          bgcolor: "black",
          borderRadius: "50px",
        }
      : props.style === "secondary"
      ? {
          mx: 1,
            color: "black",
            display: "block",
            bgcolor: "white",
            borderRadius: "50px",
        }
      : {};
  return (
    <Button
      variant={props.variant}
      onClick={props.onClick}
      href={props.link}
      sx={style}
    >
      {props.children}
    </Button>
  );
}
