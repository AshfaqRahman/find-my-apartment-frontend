"use client";
import styles from "./page.module.css";

import * as React from "react";
import AppBarComponent from "@/components/app-bar";
import { Box, Grid } from "@mui/material";
import { _appBarHeight, _pageHeight, _pageMargin } from "@/static/constants";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Grid container>
        <AppBarComponent />
        <Grid item>{children}</Grid>
      </Grid>

      {/* <Box sx={{
          mt: 72px
        }}>
          {children}
        </Box> */}
    </>
  );
}
