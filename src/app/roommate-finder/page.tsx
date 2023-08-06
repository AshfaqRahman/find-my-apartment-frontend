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
import Post from "@/components/post";
import SelectComponent from "@/mui-components/select";
import { findRoommates } from "./apis";
import { apiUrls } from "@/lib/apiUrls";
import ApartmentTypesComponent from "@/components/apartment-types";
import BedsSelectionComponent from "@/components/beds-selection";
import BathsSelectionComponent from "@/components/baths-selection";
import FacilitiesComponent from "@/components/facilities";
import KeywordsComponent from "@/components/keywords";
import Map from "@/components/map";

const localPath = "roommate-finder";

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

  let [posts, setPosts] = React.useState([
    {
      id: 1,
      price: 15000,
      bedrooms: 3,
      baths: 2,
      area_sqft: 1400,
      address: "Dhaka",
      type: "Family",
      title: "Bari Bhara Deowa Hoibe",
      textBody: "The quick brown fox jumps over the lazy dog. And so I need a billion dollars.",
      owner: "makumhakan",
      star_points: "Fire Station, Bank, School, University",
      facilities: "security, wifi, parking, rooftop, laundry"
    },
    {
      id: 2,
      price: 24000,
      bedrooms: 3,
      baths: 2,
      area_sqft: 1860,
      address: "Dhaka",
      type: "Family",
      title: "Apartment for Rent",
      textBody: "I tried so hard and got so far. But in the end, it doesn't even matter. I had to fall to lose it all. But in the end, it doesn't even matter.",
      owner: "tuluashfak",
      star_points: "Hospital, Shopping Mall, School, Museum, Bus Stop, Airport",
      facilities: "security, wifi, parking, wheelchair accessibility, playground, air conditioning/heating, elevator"
    },
    {
      id: 3,
      price: 14000,
      bedrooms: 3,
      baths: 2,
      area_sqft: 1300,
      address: "Dhaka",
      type: "Bachelor",
      title: "Bachelor Bhaiyera, Eidike Ashun",
      textBody: "The child is grown, the dream is gone. I have become comfortably numb. Hello? Is there anybody in there? Just node if you can hear me. Is there anyone home?",
      owner: "maruiffa",
      star_points: "Hospital, Gym, Theater, Railway Station, Bus Stop, Park",
      facilities: "security, wifi, maintenance, laundry, parking, elevator"
    },
  ]);

  let apartmentStatuses = ["Any", "Vacant", "Occupied"];
  let [apartmentStatus, setApartmentStatus] = React.useState("Any");

  let orderByes = [
    "Nearest",
    "Latest",
    "Lowest Price",
    "Highest Price",
    "Preference",
  ];
  let [orderBy, setOrderBy] = React.useState("Any");

  // const handleOrderByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setOrderBy(event.target.value);
  // };

  const saveSearch = () => {
    console.log("Saving search ...");
  };

  const search = async () => {
    // console.log("searching ...");
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
    let data = await findRoommates(params);
    console.log(data);
  };

  return (
    <>
      <Grid container spacing={0} key={1}>
        <Grid key={1} minWidth={"30vw"} minHeight={"93vh"} maxHeight={"93vh"} position={"fixed"}  overflow={'auto'} container item lg={2} md={4} className="left-part" >
          <Grid key={1} item lg={6} md={6}>
            <Box sx={{ margin: "10px" }}>
              <ButtonComponent variant="contained" onClick={saveSearch}>
                Save Search
              </ButtonComponent>
            </Box>
          </Grid>
          <Grid key={2} item lg={6} md={6}>
            <Box sx={{ margin: "10px" }}>
              <ButtonComponent variant="contained" onClick={search}>
                Search
              </ButtonComponent>
            </Box>
          </Grid>
          <Grid key={3} item lg={12} md={12} sx={{px: 1}}>
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
        <Grid key={2} minWidth={"70vw"} minHeight={"93vh"} maxHeight={"93vh"} position={"fixed"} left={{ lg: "30%" }} overflow={"auto"} container item lg={6} md={4} className={'right-part'}>
          <Grid key={1} item lg={6}  md={6}>
            <Box sx={{ margin: "10px" }}>
              <SelectComponent
                title={"Status"}
                elements={apartmentStatuses}
                value={apartmentStatus}
                handleChange={setApartmentStatus}
              />
            </Box>
          </Grid>
          <Grid key={2} item lg={6}  md={6}>
            <Box sx={{ margin: "10px" }}>
              <SelectComponent
                title={"Order By"}
                elements={orderByes}
                value={orderBy}
                handleChange={setOrderBy}
              />
            </Box>
          </Grid>
          <Grid key={3} item lg={12} md={12}>
            {posts.map((x, idx) => {
              return <Post data={x} key={idx} />;
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
