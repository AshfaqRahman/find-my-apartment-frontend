"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import AppBarHomeComponent from "@/components/app-bar-home";
import { Grid } from "@mui/material";
import { _pageMargin } from "@/static/constants";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
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
  

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeRegistry>
          <Grid item>
            {children}
            
          </Grid>
        </ThemeRegistry>
      </body>
    </html>
  );
}
