"use client";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
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
import { addToWishlist, getWishlist, removeFromWishlist, searchApartments } from "./apis";
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
import { useRouter } from "next/navigation";
import LocationSearchMapComponent from "@/components/location-search-map";

export default function Home() {
  const { push } = useRouter();

  const [apartmentTypes, setApartmentTypes] = React.useState([]);
  const handleApartmentTypeChange = (types: any) => {
    setApartmentTypes(types);
  };

  const [wishlist, setWishlist] = React.useState<any>([]);

  useEffect(() => {
    (async () => {
      let data = await getWishlist();
      setWishlist(data.data.map((x: any) => x.apartment_id));
      // console.log(data);
    })();
  }, []);

  let addingInWishlist = async (apartment_id: any) => {
    let data = await addToWishlist({ apartment_id })
    console.log(data);
    
    setWishlist(data.data.map((x: any) => x.apartment_id));
    if (!data.success) {
      setSeverity("error");
      setMessage(data.data.message);
      setOpenToast(true);
      return;
    }
  }

  let removingFromWishlist = async (apartment_id: any) => {
    let data = await removeFromWishlist({ id: apartment_id })
    console.log(data);
    
    setWishlist(data.data.map((x: any) => x.apartment_id));
    if (!data.success) {
      setSeverity("error");
      setMessage(data.data.message);
      setOpenToast(true);
      return;
    }
  }

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

  let [apartments, setApartments] = React.useState([]);

  let apartmentStatuses = ["Any", "Vacant", "Occupied"];
  let [apartmentStatus, setApartmentStatus] = useState("Any");

  let orderByes : any = {
    "price lowest": {
      key: "price",
      order: 1,
    },
    "price highest": {
      key: "price",
      order: -1,
    },
    "latest": {
      key: "created_at",
      order: -1,
    },
    // "nearest",
    // "price highest",
    // "preference",
  };
  let [orderBy, setOrderBy] = useState<string>("");

  useEffect(() => {
    let apts = [...apartments];
    apts.sort((a: any, b: any) => orderByes[orderBy].order * (a[orderByes[orderBy].key] > b[orderByes[orderBy].key] ? 1 : -1));
    setApartments(apts);
  }, [orderBy]);

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

  let [openToast, setOpenToast] = React.useState(false);
  let [message, setMessage] = React.useState("");
  let [severity, setSeverity] = React.useState("success");

  let [fetchingApartments, setFetchingApartments] = React.useState(false);

  const [location, setLocation] = React.useState<any>("");
  const [radius, setRadius] = React.useState<number | "">("");

  const [searchAddress, setSearchAddress] = React.useState<any>("");

  const [zone, setZone] = React.useState<any>("");
  const [district, setDistrict] = React.useState<any>("");
  const [division, setDivision] = React.useState<any>("");

  const search = async () => {
    setFetchingApartments(true);
    const params = {
      apartmentTypes: apartmentTypes,
      location: location,
      radius: radius,
      beds: beds,
      baths: baths,
      price_min: +budget[0],
      price_max: +budget[1],
      area_min: +area[0],
      area_max: +area[1],
      facilities: facilities,
      keywords: keywords,
    };
    let data: any = await searchApartments(params);
    // console.log(data);
    if (!data.success) {
      setSeverity("error");
      setMessage(data.message);
      setOpenToast(true);
      setFetchingApartments(false);

      setTimeout(() => {
        push("/");
      }, 1000);

      return;
    }
    setApartments(data.data);
    setSeverity("success");
    setMessage(`${data.data.length} apartments are found`);
    setOpenToast(true);
    setFetchingApartments(false);
  };

  return (
    <>
      <LoaderComponent loading={fetchingApartments} />
      <Grid container spacing={0} key={1} pt={1}>
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
            <Box sx={{ ..._centeringStyle, mt: "10px" }}>
              <ButtonComponent
                variant="contained"
                style="primary"
                onClick={saveSearch}
              >
                Save Search
              </ButtonComponent>
            </Box>
          </Grid>
          <Grid item lg={6} md={6}>
            <Box sx={{ ..._centeringStyle, mt: "10px" }}>
              <ButtonComponent
                variant="contained"
                style="primary"
                onClick={search}
              >
                Search
              </ButtonComponent>
            </Box>
          </Grid>
          <Grid item container lg={12} md={12}>
            <Box px={1}>
              <LocationSearchMapComponent
                setRadius={setRadius}
                radius={radius}
                setLocation={setLocation}
                searchAddress={searchAddress}
                setSearchAddress={setSearchAddress}
                setAddress={setSearchAddress}
                setDistrict={setDistrict}
                setDivision={setDivision}
                setZone={setZone}
              />
            </Box>
          </Grid>

          <Grid key={3} item lg={12} md={12}>
            <Box mx={1}>
              <ApartmentTypesComponent
                value={apartmentTypes}
                setValue={setApartmentTypes}
              />
            </Box>
          </Grid>
          <Grid
            key={4}
            item
            lg={6}
            md={6}
            sx={{ ..._centeringStyle, alignItems: "start" }}
          >
            <BedsSelectionComponent onChange={handleBedsChange} />
          </Grid>
          <Grid
            key={5}
            item
            lg={6}
            md={6}
            sx={{ ..._centeringStyle, alignItems: "start" }}
          >
            <BathsSelectionComponent
              onChange={handleBathsChange}
            ></BathsSelectionComponent>
          </Grid>
          <Budget
            key={6}
            budget={budget}
            setBudget={setBudget}
          />

          <Area
            key={7}
            area={area}
            setArea={setArea}
          />
          <Grid key={8} item lg={12} md={12}>
            <Box mx={1}>
              <FacilitiesComponent
                value={facilities}
                setValue={setFacilities}
              />
            </Box>
          </Grid>
          <Grid key={9} item lg={12} md={12}>
            <Box mx={1}>
              <KeywordsComponent value={keywords} setValue={setKeywords} />
            </Box>
          </Grid>
        </Grid>
        <Grid
          minHeight={{ height }}
          maxHeight={{ height }}
          position={"fixed"}
          left={{ md: "33.33%", lg: "16.66%" }}
          overflow={"auto"}
          container
          item
          lg={6}
          md={4}
        >
          <Grid
            item
            container
            key={12}
            lg={12}
            mt={2}
            mx={2}
            sx={{
              ..._centeringStyle,
              bgcolor: _color.background_upper,
              borderRadius: _divRadius,
            }}
            md={12}
          >
            <Grid key={1} item lg={6} md={6} p={3}>
              <Box sx={{ width: "100%" }}>
                <SelectComponent
                  title={"Status"}
                  elements={apartmentStatuses}
                  value={apartmentStatus}
                  handleChange={setApartmentStatus}
                />
              </Box>
            </Grid>
            <Grid item lg={6} md={6} p={3}>
              <Box sx={{ width: "100%" }}>
                <SelectComponent
                  title={"Order By"}
                  elements={Object.keys(orderByes)}
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
                    addToWishlist={() => addingInWishlist(x.id)}
                    removeFromWishlist={() => removingFromWishlist(x.id)}
                    inWishlist={wishlist.includes(x.id)}
                    setMapLocation={() => {
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
          <Map
            key={1}
            height={_pageHeight}
            fromLatLng
            width={mapWidth}
            lat={mapLat}
            lng={mapLng}
          />
        </Grid>
      </Grid>
      <ToastComponent
        message={message}
        open={openToast}
        onClose={setOpenToast}
        onCross={setOpenToast}
        severity={severity}
      />
    </>
  );
}
