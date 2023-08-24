"use client";
import styles from "./page.module.css";

import * as React from "react";
import AppBarComponent from "@/components/app-bar";
import { Box, Grid } from "@mui/material";
import { _appBarHeight, _pageHeight, _pageMargin } from "@/static/constants";
import { useEffect } from "react";
import { checkAuth } from "@/services/check-auth";
import { useRouter } from "next/navigation";
import ToastComponent from "@/mui-components/toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  let { push } = useRouter();
  let [openToast, setOpenToast] = React.useState(false);
  let [message, setMessage] = React.useState("");
  let [severity, setSeverity] = React.useState("success");

  useEffect(() => {
    console.log("Home::useEffect");
    // console.log(getCookie("token"));
    checkAuth().then((data) => {
      // console.log(response);
      if(!data.success) {
        setSeverity("error");
        setMessage(data.message);
        setOpenToast(true);
  
        setTimeout(() => {
          push("/");
        }, 1000);
  
        return;
      }
    });
  }, []);

  return (
    <>
      <Grid container>
        <AppBarComponent />
        <Grid item mt={_pageMargin}>{children}</Grid>
      </Grid>

      

      <ToastComponent
          message={message}
          open={openToast}
          onClose={setOpenToast}
          onCross={setOpenToast}
          severity={severity}
        />

    </>
  );
}
