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

export default function Home() {
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
      </Grid>
    </>
  );
}
