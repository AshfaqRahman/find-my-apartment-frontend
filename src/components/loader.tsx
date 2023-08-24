import { _loaderStyle } from "@/static/constants";
import { Box, CircularProgress, LinearProgress } from "@mui/material";
import React from "react";

export default function LoaderComponent(props: any) {
  // let [loading, setLoading] = React.useState(props.loading);
  let loading = props.loading;

  return (
    <Box
      sx={{
        position: _loaderStyle.position,
        mt: _loaderStyle.mt,
        // left: _loaderStyle.left,
        // top: _loaderStyle.top,
        width: _loaderStyle.width,
        display: loading ? "block" : "none",
        zIndex: _loaderStyle.zIndex,
      }}
    >
      <LinearProgress
        color={_loaderStyle.color}
        sx={{
          height: _loaderStyle.height,
        }}
      />

      {/* <CircularProgress color="inherit" /> */}
    </Box>
  );
}
