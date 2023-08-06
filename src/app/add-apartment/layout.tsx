"use client";
import styles from "./page.module.css"
// import gstyles from ""


import { Inter } from "next/font/google";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ApartmentIcon from "@mui/icons-material/Apartment";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import Grid from "@mui/material/Grid";
import AppBarComponent from "@/components/app-bar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <>
        <AppBarComponent>
        </AppBarComponent>
        
        <div className={`below-app-bar`}>
          {children}
        </div>
    </>
  );
}
