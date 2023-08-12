"use client";
import styles from "./page.module.css";

import * as React from "react";
import AppBarComponent from "@/components/app-bar";
import { Grid } from "@mui/material";
import { _pageMargin } from "@/static/constants";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Grid container>
        <AppBarComponent />
        <Grid item  mt={_pageMargin}>{children}</Grid>
      </Grid>
    </>
  );
}
