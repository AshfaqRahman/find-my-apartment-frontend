"use client";
import styles from "./page.module.css"

import * as React from "react";
import AppBarComponent from "@/components/app-bar";


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
