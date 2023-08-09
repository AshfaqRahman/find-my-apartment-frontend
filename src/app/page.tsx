"use client";
import * as React from "react";
import { useCallback, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { Box, Grid, Typography } from "@mui/material";
import ButtonComponent from "@/mui-components/buttons";
import MultiSelectComponent from "@/mui-components/multi-select";
import {
  _apartmentTypes,
  _area,
  _baths,
  _beds,
  _budget,
} from "@/static/constants";
import SliderComponent from "@/mui-components/slider";
import TextFieldComponent from "@/mui-components/text-field";
import Budget from "@/components/budget";
import Area from "@/components/area";
import HOST from "@/static/host";
import axios from "axios";
import Apartment from "@/components/apartment";
import SelectComponent from "@/mui-components/select";
// import { findRoommates } from "./apis";
import { apiUrls } from "@/lib/apiUrls";
import ApartmentTypesComponent from "@/components/apartment-types";
import BedsSelectionComponent from "@/components/beds-selection";
import BathsSelectionComponent from "@/components/baths-selection";
import FacilitiesComponent from "@/components/facilities";
import KeywordsComponent from "@/components/keywords";
import Map from "@/components/map";
import AppBarHomeComponent from "@/components/app-bar-home";

const localPath = "roommate-finder";

export default function Home() {
  return (
    <>
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
