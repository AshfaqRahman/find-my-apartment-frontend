"use client";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
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
  _centeringStyle,
  _color,
  _divRadius,
  _mapWidth,
  _pageHeight,
} from "@/static/constants";
import SliderComponent from "@/mui-components/slider";
import TextFieldComponent from "@/mui-components/text-field";
import Budget from "@/components/budget";
import Area from "@/components/area";
import HOST from "@/static/host";
import axios from "axios";
import Apartment from "@/components/apartment";
import SelectComponent from "@/mui-components/select";
import { apiUrls } from "@/lib/apiUrls";
import ApartmentTypesComponent from "@/components/apartment-types";
import BedsSelectionComponent from "@/components/beds-selection";
import BathsSelectionComponent from "@/components/baths-selection";
import FacilitiesComponent from "@/components/facilities";
import KeywordsComponent from "@/components/keywords";
import Map from "@/components/map";
import { randomInRange } from "@/static/utils";
import LoaderComponent from "@/components/loader";
import ToastComponent from "@/mui-components/toast";
import { getRecommendation } from "./apis";

const localPath = "advance-search";

export default function Home() {
  let [apartments, setApartments] = React.useState([]);

  let [openToast, setOpenToast] = React.useState(false);
  let [message, setMessage] = React.useState("");
  let [severity, setSeverity] = React.useState("success");

  let [fetchingApartments, setFetchingApartments] = React.useState(false);

  let recommendationOn: any = {
    preference: {
      key: "price",
      order: 1,
    },
    wishlist: {
      key: "price",
      order: -1,
    },
    "search history": {
      key: "created_at",
      order: -1,
    },
    // "nearest",
    // "price highest",
    // "preference",
  };
  let [selectedRecommendationType, setSelectedRecommendationType] = useState<string>("preference");

  useEffect(() => {
    setFetchingApartments(true);
    (async () => {
      let response: any = await getRecommendation();
      // console.log(response);
      if (!response.success) {
        setSeverity("error");
        setMessage(response.message);
        setOpenToast(true);
        setFetchingApartments(false);
        return;
      }
      setApartments(response.data);
      setFetchingApartments(false);
    })();
  }, []);


  return (
    <>
      <LoaderComponent loading={fetchingApartments} />

      <ToastComponent
        message={message}
        open={openToast}
        onClose={setOpenToast}
        onCross={setOpenToast}
        severity={severity}
      />
      <Grid position={"fixed"} container>
        <Grid
          item
          key={12}
          lg={12}
          md={12}
          sx={{
            ..._centeringStyle,
            borderRadius: _divRadius,
            width: "100vw",
          }}
          overflow={"auto"}
        >
          <Box width={"60vw"}>
            <Grid
              container
              width={"60vw"}
              bgcolor={_color.background_upper}
              borderRadius={_divRadius}
              my={2}
            >

              <Grid item lg={6} md={6} p={3}>
                <Box sx={{ width: "100%" }}>
                  <SelectComponent
                    title={"Order By"}
                    elements={Object.keys(recommendationOn)}
                    value={selectedRecommendationType}
                    handleChange={setSelectedRecommendationType}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid
              container
              borderRadius={_divRadius}
              my={2}
              height={"78vh"}
            >
              <Grid
                item
                lg={12}
                md={12}
                sx={{
                  bgcolor: _color.background_upper,
                  borderRadius: _divRadius,
                }}
              >
                {apartments.map((x: any, idx) => {
                  return (
                    <Apartment
                      data={x}
                      key={idx}
                      showMap={false}
                    />
                  );
                })}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
