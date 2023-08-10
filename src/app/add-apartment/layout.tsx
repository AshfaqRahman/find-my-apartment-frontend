"use client";
import styles from "./page.module.css";

import * as React from "react";
import AppBarComponent from "@/components/app-bar";
import { Grid } from "@mui/material";

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
    </>
  );
}
