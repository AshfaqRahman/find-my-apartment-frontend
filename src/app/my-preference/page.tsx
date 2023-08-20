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
  apartmentTypeMapping,
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
import { getPreference, setPreference } from "./apis";
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


  const [address, setAddress] = React.useState<any>("");

  const [zone, setZone] = React.useState<any>("");
  const [district, setDistrict] = React.useState<any>("");
  const [division, setDivision] = React.useState<any>("");
  const [location, setLocation] = React.useState<any>("");

  const [streetNo, setStreetNo] = React.useState<number | "">("");
  const handleStreetNoChange = (e: any) => {
    setStreetNo(e.target.value);
  };
  const [houseNo, setHouseNo] = React.useState<number | "">("");
  const handleHouseNoChange = (e: any) => {
    setHouseNo(e.target.value);
  };
  const [radius, setRadius] = React.useState<number | "">("");


  const [keywords, setKeywords] = React.useState([]);

  const savePreference = async () => {
    setSavingPreferences(true);
    let params = {
      keywords: {
        starpoint_ids: keywords,
      },
      facilities: {
        facility_ids: facilities,
      },

      location: {
        detailed_address: address,
        street_no: streetNo,
        house_no: houseNo,
        zone: zone,
        district: district,
        division: division,
        latitude: location.lat,
        longitude: location.lng,
      },
      user_preference: {
        radius,
        max_bedrooms: maxBeds,
        min_bedrooms: minBeds,
        max_washrooms: maxBaths,
        min_washrooms: minBaths,
        min_budget: +budget[0],
        max_budget: +budget[1],
        max_area: +area[1],
        min_area: +area[0],
        types: apartmentTypes.map((type) => apartmentTypeReverseMapping[type]),
        max_floor: maxFloor,
        min_floor: minFloor,
      }
    }
    let data: any = await setPreference(params);
    console.log(data);
    setSavingPreferences(false);
    if (data.success) {
      setOpenToast(true);
      setMessage(data.data);
      setSeverity("success");
    } else {
      setOpenToast(true);
      setMessage(data.message);
      setSeverity("error");
    }
  }

  let setSavedPreference = (data: any) => {
    setMinBaths(data.min_washrooms);
    setMaxBaths(data.max_washrooms);
    setMinBeds(data.min_bedrooms);
    setMaxBeds(data.max_bedrooms);
    setMinFloor(data.min_floor);
    setMaxFloor(data.max_floor);
    setBudget([data.min_budget, data.max_budget]);
    setArea([data.min_area, data.max_area]);
    setApartmentTypes(data.types.map((type: any) => apartmentTypeMapping[type]));
    setKeywords(data.keywords.map((keyword: any) => keyword.starpoint.starpoint_id));
    setFacilities(data.facilities.map((facility: any) => facility.facility.facilities_id));
    setAddress(data.location.detailed_address);
    setRadius(data.radius);
    setStreetNo(data.location.street_no);
    setHouseNo(data.location.house_no);
    setZone(data.location.zone);
    setDistrict(data.location.district);
    setDivision(data.location.division);
    setLocation({ lat: data.location.latitude, lng: data.location.longitude });
  }

  useEffect(() => {
    setSavingPreferences(true);
    (async () => {
      let data: any = await getPreference();
      setSavingPreferences(false);
      if (data.success) {
        setSavedPreference(data.data)
      } else {
        setOpenToast(true);
        setMessage(data.message);
        setSeverity("error");
      }
    })();
  }, []);

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
            p={3}
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
                  onClick={savePreference}
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
                <Box px={2}>
                  <Budget
                    key={6}
                    budget={budget}
                    setBudget={setBudget}
                  />
                </Box>
              </Grid>
              <Grid item lg={6} md={6}>
                <Box mx={2}>
                  <Area
                    key={7}
                    area={area}
                    setArea={setArea}
                  />
                </Box>
              </Grid>
              <Grid key={"apartment type"} item lg={6} md={6}>
                <Box mx={2}>
                  <ApartmentTypesComponent
                    value={apartmentTypes}
                    setValue={setApartmentTypes}
                  />
                </Box>
              </Grid>
              <Grid key={"KeywordsComponent"} item lg={6} md={6}>
                <Box mx={2}>
                  <KeywordsComponent value={keywords} setValue={setKeywords} />
                </Box>
              </Grid>

              <Grid item container lg={6} md={6} px={1}>

                <Box px={2} >
                  <LocationSearchMapComponent
                    setRadius={setRadius}
                    radius={radius}
                    setLocation={setLocation}
                    searchAddress={address}
                    setSearchAddress={setAddress}
                    setAddress={setAddress}
                    setDistrict={setDistrict}
                    setDivision={setDivision}
                    setZone={setZone}
                  />
                </Box>
              </Grid>
              <Grid key={"FacilitiesComponent"} item lg={6} md={6}>
                <Box mx={2}>
                  <FacilitiesComponent value={facilities} setValue={setFacilities} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
