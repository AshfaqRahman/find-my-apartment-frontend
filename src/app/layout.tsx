"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import AppBarHomeComponent from "@/components/app-bar-home";
import { Grid } from "@mui/material";
import { _pageMargin } from "@/static/constants";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { checkAuth } from "./apis";
import ToastComponent from "@/mui-components/toast";
import { useRouter } from "next/navigation";
config.autoAddCss = false;

export const metadata = {
  title: "Next.js App Router + Material UI v5",
  description: "Next.js App Router + Material UI v5",
};

let mt = _pageMargin;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { push } = useRouter();
  
  let [openToast, setOpenToast] = React.useState(false);
  let [message, setMessage] = React.useState("");
  let [severity, setSeverity] = React.useState("success");
  useEffect(() => {
    console.log("RootLayout::useEffect");
    // console.log(getCookie("token"));
    checkAuth().then((response) => {
      // console.log(response);
      setSeverity("success");
      setMessage(response.message);
      setOpenToast(true);
      setTimeout(() => {
        push("/advance-search");
      }, 1000);
    });
  }, []);

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Grid item>
            {children}
            <ToastComponent
              message={message}
              open={openToast}
              onClose={setOpenToast}
              onCross={setOpenToast}
              severity={severity}
            />
          </Grid>
        </ThemeRegistry>
      </body>
    </html>
  );
}
