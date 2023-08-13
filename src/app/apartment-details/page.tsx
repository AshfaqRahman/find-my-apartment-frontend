"use client";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import ButtonComponent from "@/mui-components/buttons";
import MultiSelectComponent from "@/mui-components/multi-select";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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
import LoaderComponent from "@/components/loader";
import ToastComponent from "@/mui-components/toast";

import Carousel from "react-material-ui-carousel";
import Overview from "./components/overview";
import Facilities from "./components/facilities";
import StarPoints from "./components/star-points";
import Pricing from "./components/pricing";

const localPath = "advance-search";

export default function Home() {
  const [apartmentTypes, setApartmentTypes] = React.useState([]);
  const handleApartmentTypeChange = (types: any) => {
    console.log(types);
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
  let height = _pageHeight;
  let mapWidth = _mapWidth;

  let [mapLat, setMapLat] = React.useState();
  let [mapLng, setMapLng] = React.useState();

  let [openSuccess, setOpenSuccess] = React.useState(false);
  let [message, setMessage] = React.useState("");

  let [fetchingApartments, setFetchingApartments] = React.useState(false);

  const search = async () => {
    // console.log("searching ...");
    // const url = `${HOST}/apartments`;
    setFetchingApartments(true);
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
    let data: any[] = await searchApartments(params);
    console.log(data);
    setMessage(`${data.length} apartments are found`);
    setOpenSuccess(true);
    setFetchingApartments(false);
  };

  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      img: "/dhaka-view.jpg",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      img: "/apartment.jpg",
    },
  ];

  // const overview = useRef(null);
  // const scrollToOverview = () => window.scrollTo(0, overview.current.offsetTop)

  let tabs = [
    {
      title: "Overview",
      onClick: () => window.scrollTo(0, tabs[0].ref.current.offsetTop),
      ref: useRef(null),
      jsx: <Overview />,
    },
    {
      title: "Facilities",
      onClick: () => window.scrollTo(0, tabs[1].ref.current.offsetTop),
      ref: useRef(null),
      jsx: <Facilities />,
    },
    {
      title: "Star Points",
      onClick: () => window.scrollTo(0, tabs[2].ref.current.offsetTop),
      ref: useRef(null),
      jsx: <StarPoints />,
    },
    {
      title: "Pricing",
      onClick: () => window.scrollTo(0, tabs[3].ref.current.offsetTop),
      ref: useRef(null),
      jsx: <Pricing />,
    },
  ];

  let imageWidth = 70;

  return (
    <>
      <LoaderComponent loading={fetchingApartments} />
      <Grid
        container
        spacing={0}
        key={1}
        pt={3}
        bgcolor={_color.background_left}
      >
        <Grid
          item
          container
          sx={{
            ..._centeringStyle,
            width: "100%",
          }}
        >
          <Grid item>
            <Box width={imageWidth + "vw"}>
              <Carousel height={"35vw"} animation="slide">
                {items.map((item, i) => (
                  <Box key={i}>
                    <Item item={item} />
                  </Box>
                ))}
              </Carousel>
            </Box>
            <ButtonComponent variant={"contained"} style={"primary"}>
              <LocationOnIcon />
              Map
            </ButtonComponent>
          </Grid>
        </Grid>

        <Grid item md={12} lg={12} my={2}>
          <Box
            sx={{
              ..._centeringStyle,
              justifyContent: "space-between",
              px: (100 - imageWidth) / 2 + "vw",
            }}
          >
            {tabs.map((tab: any, i: number) => (
              <ButtonComponent
                key={i}
                variant={"text"}
                style={"tab"}
                fullWidth={true}
                onClick={tab.onClick}
              >
                {tab.title}
              </ButtonComponent>
            ))}
          </Box>
        </Grid>

        <Grid item md={12} lg={12} sx={{ ..._centeringStyle }}>
          <Box width={imageWidth + "vw"}>
            <Grid container>
              {
                tabs.map((tab: any, i: number) => (
                  <Grid key={i} my={2} item lg={12} md={12}>
                    <div ref={tab.ref}>{tab.jsx}</div>
                  </Grid>
                ))
              }
            </Grid>
          </Box>
        </Grid>
        <Grid item mt={2} md={12} lg={12}>
          <Divider>
            <Chip label="Similar Apartments" />
          </Divider>
        </Grid>
      </Grid>
    </>
  );
}

function Item(props: any) {
  return (
    <Image
      src={props.item.img}
      fill={true}
      loading="lazy" // optional
      alt="Apartment"
      style={{ borderRadius: _divRadius }}
      onClick={() => {
        console.log("props.item.description: ", props.item.description);
      }}
    />
  );
}
