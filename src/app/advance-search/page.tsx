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
import { searchApartments } from "./apis";
import { apiUrls } from "@/lib/apiUrls";
import ApartmentTypesComponent from "@/components/apartment-types";
import BedsSelectionComponent from "@/components/beds-selection";
import BathsSelectionComponent from "@/components/baths-selection";
import FacilitiesComponent from "@/components/facilities";
import KeywordsComponent from "@/components/keywords";
import Map from "@/components/map";
import { randomInRange } from "@/static/utils";

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
      apartment_id: 10,
      location_id: 28,
      type: 1,
      bedrooms: 2,
      washrooms: 2,
      area_sqft: 1150,
      price: 23000,
      image_url: null,
      created_at: null,
      owner_id: null,
      location: {
        location_id: 28,
        division: "Dhaka",
        district: "Dhaka",
        zone: "Motijheel",
        street_no: "2",
        house_no: "155",
        latitude: 23.8041,
        longitude: 90.4152,
        created_at: null,
      },
      facilities: [
        {
          facility: {
            title: "security",
          },
        },
        {
          facility: {
            title: "elevator",
          },
        },
        {
          facility: {
            title: "outdoor space",
          },
        },
        {
          facility: {
            title: "laundry",
          },
        },
        {
          facility: {
            title: "wifi",
          },
        },
        {
          facility: {
            title: "air conditioning",
          },
        },
      ],
      startpoints: [
        {
          starpoint: {
            title: "Hospital",
          },
        },
        {
          starpoint: {
            title: "Fire Station",
          },
        },
        {
          starpoint: {
            title: "Bank",
          },
        },
        {
          starpoint: {
            title: "Restaurant",
          },
        },
        {
          starpoint: {
            title: "Bank",
          },
        },
        {
          starpoint: {
            title: "Park",
          },
        },
      ],
    },
  ]);

  let apartmentStatuses = ["Any", "Vacant", "Occupied"];
  let [apartmentStatus, setApartmentStatus] = React.useState("Any");

  let orderByes = [
    "price lowest",
    "nearest",
    "latest",
    "price highest",
    "preference",
  ];
  let [orderBy, setOrderBy] = React.useState("");

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
    setApartments(data);
  };

  let height = _pageHeight;
  let mapWidth = _mapWidth;

  let [mapLat, setMapLat] = React.useState();
  let [mapLng, setMapLng] = React.useState();

  return (
    <>
      <Grid container spacing={0} key={1} mt={1}>
        <Grid
          key={1}
          minHeight={{ height }}
          maxHeight={{ height }}
          position={"fixed"}
          overflow={"auto"}
          container
          item
          lg={2}
          md={4}
          sx={{
            backgroundColor: _color.background_left,
          }}
        >
          <Grid key={1} item lg={6} md={6}>
            <Box sx={{ margin: "10px" }}>
              <ButtonComponent
                variant="contained"
                style="primary"
                onClick={saveSearch}
              >
                Save Search
              </ButtonComponent>
            </Box>
          </Grid>
          <Grid key={2} item lg={6} md={6}>
            <Box sx={{ margin: "10px" }}>
              <ButtonComponent
                variant="contained"
                style="primary"
                onClick={search}
              >
                Search
              </ButtonComponent>
            </Box>
          </Grid>
          <Grid key={3} item lg={12} md={12} sx={{ px: 1 }}>
            <ApartmentTypesComponent onChange={handleApartmentTypeChange} />
          </Grid>
          <Grid key={4} item lg={6} md={6}>
            <BedsSelectionComponent onChange={handleBedsChange} />
          </Grid>
          <Grid key={5} item lg={6} md={6}>
            <BathsSelectionComponent
              onChange={handleBathsChange}
            ></BathsSelectionComponent>
          </Grid>
          <Budget
            key={6}
            budget={budget}
            grid_slider_lg={12}
            grid_slider_md={12}
            box_slider_mx={"5px"}
            box_slider_px={"15px"}
            grid_text_lg={6}
            grid_text_md={6}
            box_text_mx={"5px"}
            box_text_px={"0px"}
            setBudget={setBudget}
          />

          <Area
            key={7}
            area={area}
            grid_slider_lg={12}
            grid_slider_md={12}
            box_slider_mx={"5px"}
            box_slider_px={"15px"}
            grid_text_lg={6}
            grid_text_md={6}
            box_text_mx={"5px"}
            box_text_px={"0px"}
            setArea={setArea}
          />
          <Grid key={8} item lg={6} md={6}>
            <FacilitiesComponent onChange={handleFacilitiesChange} />
          </Grid>
          <Grid key={9} item lg={6} md={6}>
            <KeywordsComponent onChange={handleKeywordsChange} />
          </Grid>
        </Grid>
        <Grid key={"1_ex"} container item lg={2} md={4}></Grid>
        <Grid
          key={2}
          minHeight={{ height }}
          maxHeight={{ height }}
          position={"fixed"}
          left={{ md: "33.33%", lg: "16.66%" }}
          overflow={"auto"}
          container
          item
          lg={6}
          md={4}
          sx={{
            backgroundColor: _color.background_middle,
          }}
        >
          <Grid item container key={12} lg={12} mt={2} mx={2} sx={{
            ..._centeringStyle,
            height: "10vh",
            bgcolor: _color.background_upper,
            borderRadius: _divRadius,
          }} md={12}>
            <Grid key={1} item lg={6} md={6} p={3}>
              <Box sx={{ width: "100%",}}>
                <SelectComponent
                  title={"Status"}
                  elements={apartmentStatuses}
                  value={apartmentStatus}
                  handleChange={setApartmentStatus}
                />
              </Box>
            </Grid>
            <Grid key={2} item lg={6} md={6} p={3}>
              <Box sx={{ width: "100%", }}>
                <SelectComponent
                  title={"Order By"}
                  elements={orderByes}
                  value={orderBy}
                  handleChange={setOrderBy}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid key={3} container item lg={12} md={12} m={2} height={"78vh"}>
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
                    onClick={() => {
                      let lat = randomInRange(22, 24);
                      let lng = randomInRange(89, 91);
                      // console.log(lat, lng);
                      setMapLat(x.location.latitude);
                      setMapLng(x.location.longitude);
                    }}
                    data={x}
                    key={idx}
                  />
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          key={3}
          position={"fixed"}
          left={"66.67%"}
          container
          item
          lg={4}
          md={4}
          width={{ mapWidth }}
          maxHeight={{ height }}
          minHeight={{ height }}
        >
          <Map lat={mapLat} lng={mapLng} />
        </Grid>
      </Grid>
    </>
  );
}
