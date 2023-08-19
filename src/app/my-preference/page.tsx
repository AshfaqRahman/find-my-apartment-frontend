"use client";
import * as React from "react";
import { Inter, Rochester, Satisfy } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import {
  Box,
  Grid,
  IconButton,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import ButtonComponent from "@/mui-components/buttons";
import MultiSelectComponent from "@/mui-components/multi-select";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  _apartmentTypes,
  _area,
  _baths,
  _beds,
  _budget,
  _centeringStyle,
  _color,
  _divRadius,
  _mapHeightInAddApartment,
  _pageHeight,
  apartmentTypeReverseMapping,
} from "@/static/constants";
import Dropzone from "@/components/ReactComponents/dropzone";
import ApartmentTypesComponent from "@/components/apartment-types";
import KeywordsComponent from "@/components/keywords";
import FacilitiesComponent from "@/components/facilities";
import TextFieldComponent from "@/mui-components/text-field";
import Map from "@/components/map";
import TextAreaComponent from "@/mui-components/text-area";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { storage } from "@/services/firebase-config";
import { randomInRange } from "@/static/utils";
import { addApartment } from "./apis";
import LoaderComponent from "@/components/loader";
import ToastComponent from "@/mui-components/toast";
import LocationSearchMapComponent from "@/components/location-search-map";
import BedsSelectionComponent from "@/components/beds-selection";
import BathsSelectionComponent from "@/components/baths-selection";
import Budget from "@/components/budget";
import Area from "@/components/area";

const rochester = Rochester({ weight: "400", subsets: ["latin"] });
const theme = createTheme({
  typography: {
    fontFamily: rochester.style.fontFamily,
  },
});

export default function Home() {
  const [apartmentTypes, setApartmentTypes] = React.useState([]);
  const handleApartmentTypeChange = (types: any) => {
    setApartmentTypes(types);
  };

  const [minBeds, setMinBeds] = React.useState<number | "">("");
  const handleMinBedsChange = (e: any) => {
    setMinBeds(e.target.value);
  };

  const [maxBeds, setMaxBeds] = React.useState<number | "">("");
  const handleMaxBedsChange = (e: any) => {
    setMaxBeds(e.target.value);
  };

  const [maxBaths, setMaxBaths] = React.useState<number | "">("");
  const handleMaxBathsChange = (e: any) => {
    setMaxBaths(e.target.value);
  };

  const [minBaths, setMinBaths] = React.useState<number | "">("");
  const handleMinBathsChange = (e: any) => {
    setMinBaths(e.target.value);
  };

  const [maxFloor, setMaxFloor] = React.useState<number | "">("");
  const handleMaxFloorChange = (e: any) => {
    setMaxFloor(e.target.value);
  };

  const [minFloor, setMinFloor] = React.useState<number | "">("");
  const handleMinFloorChange = (e: any) => {
    setMinFloor(e.target.value);
  };

  const [budget, setBudget] = React.useState([10000, 99999]);
  const [area, setArea] = React.useState([500, 10000]);

  const [facilities, setFacilities] = React.useState([]);
  const handleFacilitiesChange = (types: any) => {
    setFacilities(types);
  };

  const [keywords, setKeywords] = React.useState([]);
  const handleKeywordsChange = (types: any) => {
    setKeywords(types);
  };

  const height = _pageHeight;

  let [openToast, setOpenToast] = React.useState(false);
  let [message, setMessage] = React.useState("");
  let [severity, setSeverity] = React.useState("success");

  let [savingPreferences, setSavingPreferences] = React.useState(false);

  return (
    <>
      <LoaderComponent loading={savingPreferences} />
      <ToastComponent
        message={message}
        open={openToast}
        onClose={setOpenToast}
        onCross={setOpenToast}
        severity={severity}
      />
      <Grid container spacing={0} key={1} mt={0}>
        <Grid
          item
          container
          height={height}
          position={"fixed"}
          overflow={"auto"}
          md={12}
          lg={12}
          sx={{
            ..._centeringStyle,
            bgcolor: _color.background_left,
          }}
        >
          <Grid
            key={2}
            container
            item
            pt={3}
            mt={2}
            spacing={0}
            sx={{
              width: "66vw",
              bgcolor: _color.background_upper,
              borderRadius: _divRadius,
            }}
          >
            <Grid key={1} item lg={6} md={6}>
              <Box sx={{ ..._centeringStyle }}>
                <ThemeProvider theme={theme}>
                  <Typography
                    sx={{
                      ml: 1,
                      fontSize: "1.75rem",
                      fontWeight: 600,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    My preferences
                  </Typography>
                </ThemeProvider>
              </Box>
            </Grid>
            <Grid key={2} item lg={6} md={6}>
              <Box sx={{ ..._centeringStyle }}>
                <ButtonComponent
                  variant="contained"
                  style="primary"
                  onClick={() => {}}
                >
                  Save
                </ButtonComponent>
              </Box>
            </Grid>

            <Grid spacing={2} mt={2} key={5} container>
              <Grid item lg={6} md={6}>
                <Box mx={2}>
                  <TextFieldComponent
                    label="Min No. of Beds"
                    type="number"
                    value={minBeds}
                    handleChange={handleMinBedsChange}
                  />
                </Box>
              </Grid>
              <Grid item lg={6} md={6}>
                <Box mx={2}>
                  <TextFieldComponent
                    label="Max No. of Beds"
                    type="number"
                    value={maxBeds}
                    handleChange={handleMaxBedsChange}
                  />
                </Box>
              </Grid>
              <Grid item lg={6} md={6}>
                <Box mx={2}>
                  <TextFieldComponent
                    label="Min No. of Baths"
                    type="number"
                    value={minBaths}
                    handleChange={handleMinBathsChange}
                  />
                </Box>
              </Grid>
              <Grid item lg={6} md={6}>
                <Box mx={2}>
                  <TextFieldComponent
                    label="Max No. of Baths"
                    type="number"
                    value={maxBaths}
                    handleChange={handleMaxBathsChange}
                  />
                </Box>
              </Grid>
              <Grid item lg={6} md={6}>
                <Box mx={2}>
                  <TextFieldComponent
                    label="Minimum Floor"
                    type="number"
                    value={minFloor}
                    handleChange={handleMinFloorChange}
                  />
                </Box>
              </Grid>
              <Grid item lg={6} md={6}>
                <Box mx={2}>
                  <TextFieldComponent
                    label="Maximum Floor"
                    type="number"
                    value={maxFloor}
                    handleChange={handleMaxFloorChange}
                  />
                </Box>
              </Grid>
              <Grid item lg={6} md={6}>
                <Box mx={2}>
                  <Budget
                    key={6}
                    budget={budget}
                    grid_slider_lg={12}
                    grid_slider_md={12}
                    box_slider_mx={1}
                    box_slider_px={2}
                    grid_text_lg={6}
                    grid_text_md={6}
                    box_text_mx={1}
                    box_text_px={"0px"}
                    setBudget={setBudget}
                  />
                </Box>
              </Grid>
              <Grid item lg={6} md={6}>
                <Box mx={2}>
                  <Area
                    key={7}
                    area={area}
                    grid_slider_lg={12}
                    grid_slider_md={12}
                    box_slider_mx={1}
                    box_slider_px={2}
                    grid_text_lg={6}
                    grid_text_md={6}
                    box_text_mx={1}
                    box_text_px={"0px"}
                    setArea={setArea}
                  />
                </Box>
              </Grid>
              <Grid key={"apartment type"} item lg={6} md={6}>
                <Box mx={2}>
                  <ApartmentTypesComponent
                    onChange={handleApartmentTypeChange}
                  />
                </Box>
              </Grid>
              <Grid key={"KeywordsComponent"} item lg={6} md={6}>
                <Box mx={2}>
                  <KeywordsComponent onChange={handleKeywordsChange} />
                </Box>
              </Grid>

              <Grid item container lg={6} md={6} px={1}>
                <LocationSearchMapComponent
                  handleLocationChange={(location: any) =>
                    {}
                  }
                  handleRadiusChange={(r: any) => {}}
                />
              </Grid>
              <Grid key={"FacilitiesComponent"} item lg={6} md={6}>
                <Box mx={2}>
                  <FacilitiesComponent onChange={handleFacilitiesChange} />
                </Box>
              </Grid>

              {/* <Grid item lg={4} md={4}>
                <Box mx={2}>
                  <TextFieldComponent
                    label="Baths"
                    type="number"
                    value={baths}
                    handleChange={handleBathsChange}
                  />
                </Box>
              </Grid> */}
              <Grid item lg={4} md={4}>
                <Box mx={2}>
                  {/* <TextFieldComponent
                    label="Floor"
                    type="number"
                    value={floor}
                    handleChange={handleFloorChange}
                  /> */}
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item lg={4} md={4}>
                <Box mx={2}>
                  {/* <TextFieldComponent
                    label="Area(sq. ft.)"
                    type="number"
                    value={area}
                    handleChange={handleAreaChange}
                  /> */}
                </Box>
              </Grid>
              <Grid item lg={4} md={4}>
                <Box mx={2}>
                  {/* <TextFieldComponent
                    label="Price"
                    type="number"
                    value={price}
                    handleChange={handlePriceChange}
                  /> */}
                </Box>
              </Grid>
              <Grid item lg={3} md={3}>
                <Box ml={2}>
                  {/* <TextFieldComponent
                    label="Address"
                    value={address}
                    handleChange={handleAddressChange}
                  /> */}
                </Box>
              </Grid>
              <Grid
                item
                lg={1}
                md={1}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <Box mr={2}>
                  {/* <Tooltip title="see on map">
                    <IconButton
                      size="large"
                      color="error"
                      sx={{
                        bgcolor: _color.background_upper,
                        borderRadius: _divRadius,
                        height: "40px",
                        width: "40px",
                      }}
                      onClick={setOnMap}
                    >
                      <LocationOnIcon />
                    </IconButton>
                  </Tooltip> */}
                </Box>
              </Grid>
            </Grid>
            <Grid container my={1}>
              <Grid container item md={6} lg={6}>
                <Grid item md={6} lg={6}>
                  <Box mx={2}>
                    {/* <TextFieldComponent
                      label="Street no."
                      type="number"
                      value={streetNo}
                      handleChange={handleStreetNoChange}
                    /> */}
                  </Box>
                </Grid>
                <Grid item md={6} lg={6}>
                  <Box mx={2}>
                    {/* <TextFieldComponent
                      label="house no."
                      type="number"
                      value={houseNo}
                      handleChange={handleHouseNoChange}
                    /> */}
                  </Box>
                </Grid>
                <Grid item md={12} lg={12}>
                  <Box mx={2}>
                    {/* <TextAreaComponent
                      value={description}
                      handleChange={handleDescriptionChange}
                      title={"Description"}
                    /> */}
                  </Box>
                </Grid>
                <Grid item md={6} lg={6}>
                  <Box mx={2}>
                    <b>Contact</b>
                    <table></table>
                  </Box>
                </Grid>
              </Grid>
              <Grid item md={6} lg={6}>
                <Box mx={2} height={_mapHeightInAddApartment}></Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
