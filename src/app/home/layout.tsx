"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import AppBarHomeComponent from "@/components/app-bar-home";
import { Grid } from "@mui/material";
import { _pageMargin } from "@/static/constants";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import AppBarComponent from "@/components/app-bar";
import ToastComponent from "@/mui-components/toast";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/services/check-auth";
config.autoAddCss = false;

// export const metadata = {
//   title: "Next.js App Router + Material UI v5",
//   description: "Next.js App Router + Material UI v5",
// };

let mt = _pageMargin;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  
  let { push } = useRouter();
  let [openToast, setOpenToast] = React.useState(false);
  let [message, setMessage] = React.useState("");
  let [severity, setSeverity] = React.useState("success");

  React.useEffect(() => {
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
