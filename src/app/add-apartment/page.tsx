"use client";
import * as React from "react";
import { Inter, Rochester, Satisfy } from "next/font/google";
import { useCallback, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { Box, Grid, Typography } from "@mui/material";
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
  _pageHeight,
} from "@/static/constants";
import Dropzone from "@/components/ReactComponents/dropzone";
import ApartmentTypesComponent from "@/components/apartment-types";
import KeywordsComponent from "@/components/keywords";
import FacilitiesComponent from "@/components/facilities";
import TextFieldComponent from "@/mui-components/text-field";

const rochester = Rochester({ weight: "400", subsets: ["latin"] });
const theme = createTheme({
  typography: {
    fontFamily: rochester.style.fontFamily,
  },
});

export default function Home() {
  // const onSearch = =async (data: any) => {
  // 	setSelected(data);
  // };

  const [apartmentTypes, setApartmentTypes] = React.useState([]);
  const handleApartmentTypeChange = (types: any) => {
    setApartmentTypes(types);
  };

  const [keywords, setKeywords] = React.useState([]);
  const handleKeywordsChange = (types: any) => {
    setKeywords(types);
  };

  const [facilities, setFacilities] = React.useState([]);
  const handleFacilitiesChange = (types: any) => {
    setFacilities(types);
  };

  const [beds, setBeds] = React.useState<number>(0);
  const handleBedsChange = (e: any) => {
    setBeds(e.target.value);
  };

  const [baths, setBaths] = React.useState<number>(0);
  const handleBathsChange = (e: any) => {
    setBaths(e.target.value);
  };

  const [floor, setFloor] = React.useState<number>(0);
  const handleFloorChange = (e: any) => {
    setFloor(e.target.value);
  };

  const [area, setArea] = React.useState<number>(0);
  const handleAreaChange = (e: any) => {
    setFloor(e.target.value);
  };

  const [price, setPrice] = React.useState<number>(0);
  const handlePriceChange = (e: any) => {
    setFloor(e.target.value);
  };

  const pageHeight = _pageHeight;

  return (
    <>
      <Grid container spacing={0} key={1} mt={1}>
        <Grid
          item
          container
          minHeight={{ pageHeight }}
          maxHeight={{ pageHeight }}
          position={"fixed"}
          md={12}
          lg={12}
          overflow={"auto"}
          sx={{
            ..._centeringStyle,
          }}
        >
          <Grid
            key={2}
            container
            item
            pt={3}
            spacing={0}
            sx={{
              width: "66vw",
              bgcolor: _color.background_left,
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
                    Add Apartment
                  </Typography>
                </ThemeProvider>
              </Box>
            </Grid>
            <Grid key={2} item lg={6} md={6}>
              <Box sx={{ ..._centeringStyle }}>
                <ButtonComponent variant="contained">Publish</ButtonComponent>
              </Box>
            </Grid>
            <Grid item key={"apartment image"} lg={6} md={6}>
              <Box
                sx={{
                  ..._centeringStyle,
                }}
              >
                <Dropzone
                  title="Apartment's Image"
                  maxFiles={10}
                  onUpload={() => {
                    console.log("upload");
                  }}
                >
                  {(dropzoneProps: any) => {
                    return <></>;
                  }}
                </Dropzone>
              </Box>
            </Grid>
            <Grid item key={"blueprint"} lg={6} md={6}>
              <Box
                sx={{
                  ..._centeringStyle,
                }}
              >
                <Dropzone
                  title="Blueprint"
                  maxFiles={1}
                  onUpload={() => {
                    console.log("upload");
                  }}
                >
                  {(dropzoneProps: any) => {
                    return <></>;
                  }}
                </Dropzone>
              </Box>
            </Grid>
            <Grid key={"apartment type"} item lg={4} md={4}>
              <Box mx={2}>
                <ApartmentTypesComponent onChange={handleApartmentTypeChange} />
              </Box>
            </Grid>
            <Grid key={"KeywordsComponent"} item lg={4} md={4}>
              <Box mx={2}>
                <KeywordsComponent onChange={handleKeywordsChange} />
              </Box>
            </Grid>
            <Grid key={"FacilitiesComponent"} item lg={4} md={4}>
              <Box mx={2}>
                <FacilitiesComponent onChange={handleFacilitiesChange} />
              </Box>
            </Grid>
            <Grid key={5} container my={1}>
              <Grid item lg={4} md={4}>
                <Box mx={2}>
                  <TextFieldComponent
                    label="Beds"
                    type="number"
                    value={beds}
                    handleChange={handleBedsChange}
                  />
                </Box>
              </Grid>
              <Grid item lg={4} md={4}>
                <Box mx={2}>
                  <TextFieldComponent
                    label="Baths"
                    type="number"
                    value={baths}
                    handleChange={handleBathsChange}
                  />
                </Box>
              </Grid>
              <Grid item lg={4} md={4}>
                <Box mx={2}>
                  <TextFieldComponent
                    label="Floor"
                    type="number"
                    value={floor}
                    handleChange={handleFloorChange}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container my={1}>
              <Grid item lg={4} md={4}>
                <Box mx={2}>
                  <TextFieldComponent
                    label="Area(sq. ft.)"
                    type="number"
                    value={area}
                    handleChange={handleAreaChange}
                  />
                </Box>
              </Grid>
              <Grid item lg={4} md={4}>
                <Box mx={2}>
                  <TextFieldComponent
                    label="Price"
                    type="number"
                    value={price}
                    handleChange={handlePriceChange}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
