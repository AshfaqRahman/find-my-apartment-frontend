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
import { searchApartments } from "./apis";
import { apiUrls } from "@/lib/apiUrls";
import ApartmentTypesComponent from "@/components/apartment-types";
import BedsSelectionComponent from "@/components/beds-selection";
import BathsSelectionComponent from "@/components/baths-selection";
import FacilitiesComponent from "@/components/facilities";
import KeywordsComponent from "@/components/keywords";
import Map from "@/components/map";

const localPath = "advance-search";

export default function Home() {
  const [apartmentTypes, setApartmentTypes] = React.useState([]);
  const handleApartmentTypeChange = (types: any) => {
    setApartmentTypes(types);
  };

  const [beds, setBeds] = React.useState([]);
  const handleBedsChange = (selectedOptions: any) => {
    setBeds(selectedOptions);
  };

  const [baths, setBaths] = React.useState(_baths);
  const handleBathsChange = (selectedOptions: any) => {
    setBaths(selectedOptions);
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

  let [apartments, setApartments] = React.useState([
    {
      id: 1,
      price: 10000,
      bedrooms: 3,
      baths: 2,
      area_sqft: 1000,
      apartment_type: "Flat",
      address: "Dhaka",
      type: "Family",
    },
    {
      id: 2,
      price: 10000,
      bedrooms: 3,
      baths: 2,
      area_sqft: 1000,
      apartment_type: "Flat",
      address: "Dhaka",
      type: "Family",
    },
  ]);

  let apartmentStatuses = ["Any", "Vacant", "Occupied"];
  let [apartmentStatus, setApartmentStatus] = React.useState("Any");

  const handleApartmentStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setApartmentStatus(event.target.value);
  };

  let orderByes = [
    "price lowest",
    "nearest",
    "latest",
    "price highest",
    "preference",
  ];
  let [orderBy, setOrderBy] = React.useState("");

  const handleOrderByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderBy(event.target.value);
  };

  const saveSearch = () => {
    console.log("saving search ...");
  };

  // const onSearch = =async (data: any) => {
  // 	setSelected(data);
  // };

  const search = async () => {
    // console.log("searching ...");
    // const url = `${HOST}/apartments`;
    const params = {
      apartmentTypes: apartmentTypes,
      beds: beds,
      baths: baths,
      price_min: +budget[0],
      price_max: +budget[1],
      area_min: +area[0],
      area_max: +area[1],
      facilities: facilities,
      keywords: keywords,
    };
    console.log("params: ", params);
    let data = await searchApartments(params);
    console.log(data);
  };

  return (
    <>
      <Grid container spacing={0} key={1}>
        <Grid key={"1_ex"} className="left-part" minHeight={"92vh"} container item lg={3} md={3}>
        </Grid>
        <Grid key={2} minHeight={"92vh"} maxHeight={"92vh"} position={"fixed"} left={{ md: "25%",lg: "25%" }} overflow={"auto"} container item lg={6} md={6} className={'middle-part'}>
          <Grid key={1} item lg={6}  md={6} className="center-content">
            <Box sx={{ margin: "10px" }}>
              <Typography variant="h4"  >Add Apartment</Typography>
            </Box>
          </Grid>
          <Grid key={2} item lg={6}  md={6} className={"center-content"}>
            <Box sx={{ margin: "10px" }}>
              <ButtonComponent variant="contained">Publish</ButtonComponent>
            </Box>
          </Grid>
          <Grid key={3} item lg={12} md={12}>
            {/* {apartments.map((x, idx) => {
              return <Apartment data={x} key={idx} />;
            })} */}
          </Grid>
        </Grid>
        <Grid key={3} position={"fixed"}  left={"66.67%"} container item lg={3} md={3} className={"right-part"}>
          {/* <Map address="ece building, buet, dhaka" /> */}
        </Grid>
      </Grid>
    </>
  );
}
