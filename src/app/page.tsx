"use client";
import * as React from "react";
import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";
import {
  _apartmentTypes,
  _area,
  _baths,
  _beds,
  _budget,
} from "@/static/constants";
import AppBarHomeComponent from "@/components/app-bar-home";
import ToastComponent from "@/mui-components/toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { checkAuth } from "./apis";

export default function Home() {
  const { push } = useRouter();

  let [openToast, setOpenToast] = React.useState(false);
  let [message, setMessage] = React.useState("");
  let [severity, setSeverity] = React.useState("success");
  useEffect(() => {
    console.log("Home::useEffect");
    // console.log(getCookie("token"));
    checkAuth().then((response) => {
      // console.log(response);
      setSeverity("success");
      setMessage(response.data.message);
      setOpenToast(true);
      if (response.success) {
        setTimeout(() => {
          push("/advance-search");
        }, 1000);
      }
    });
  }, []);
  return (
    <>
      <AppBarHomeComponent />
      <Grid container>
        <Grid item md={12} lg={12}>
          <Image
            src="/dhaka-view-1.jpg"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }} // optional
            alt="Apartment"
          />
        </Grid>
      </Grid>

      <Grid>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>Trending Neighbourhood</h1>
          <style jsx>
            {`
              h1 {
                margin-top: 20px;
                margin-bottom: 20px;
                font-size: 50px;
              }
            `}
          </style>
        </div>
      </Grid>

      <Grid container>
        <Grid item xs>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>Dhanmondi</h1>
            <style jsx>
              {`
                h1 {
                  margin-top: 50px;
                  margin-bottom: 50px;
                  font-size: 30px;
                }
              `}
            </style>
          </div>
        </Grid>

        <Grid item xs>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h1>Motijheel</h1>
            <style jsx>
              {`
                h1 {
                  margin-top: 50px;
                  margin-bottom: 50px;
                  font-size: 30px;
                }
              `}
            </style>
          </div>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h1>Azimpur</h1>
            <style jsx>
              {`
                h1 {
                  margin-top: 50px;
                  margin-bottom: 50px;
                  font-size: 30px;
                }
              `}
            </style>
          </div>
        </Grid>

        <Grid item xs>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h1>Gulshan</h1>
            <style jsx>
              {`
                h1 {
                  margin-top: 50px;
                  margin-bottom: 50px;
                  font-size: 30px;
                }
              `}
            </style>
          </div>
        </Grid>

        <ToastComponent
          message={message}
          open={openToast}
          onClose={setOpenToast}
          onCross={setOpenToast}
          severity={severity}
        />
      </Grid>
    </>
  );
}
