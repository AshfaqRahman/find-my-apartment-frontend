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
import LoaderComponent from "@/components/loader";
import ToastComponent from "@/mui-components/toast";

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
            title: "playground",
          },
        },
      ],
      starpoints: [
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
    let data: any[] = await searchApartments(params);
    setApartments(data);
    setMessage(`${data.length} apartments are found`);
    setOpenSuccess(true);
    setFetchingApartments(false);
  };

  return (
    <>
      <LoaderComponent loading={fetchingApartments} />
      Recommendation
      
    </>
  );
}
