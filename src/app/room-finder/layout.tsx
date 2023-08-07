"use client";
import styles from "./page.module.css"

import { Inter } from "next/font/google";
import * as React from "react";
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
