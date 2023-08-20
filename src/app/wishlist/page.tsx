"use client";
import Apartment from "@/components/apartment";
import SelectComponent from "@/mui-components/select";
import { Box, Grid } from "@mui/material";
import * as React from "react";
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

export default function Wishlist() {
  let height = _pageHeight;
  
  let [apartments, setApartments] = React.useState([]);
  let [fetchingApartments, setFetchingApartments] = React.useState(false);

  let apartmentStatuses = ["Any", "Vacant", "Occupied"];
  let [apartmentStatus, setApartmentStatus] = React.useState("Any");
  let orderByes = [
    "Price Lowest",
    "Price Highest",
    "Latest",
    "Preference",
  ];
  let [orderBy, setOrderBy] = React.useState("");

  const getWishlist = async() => {
    setFetchingApartments(true);

  }

  return (
    <>
      <Grid position={"fixed"}overflow={"auto"} container item lg={8} md={8}  style={{display:"flex", justifyContent:"center"}} >
        <Grid item container key={12} lg={12} mt={2} mx={2}  md={12} sx={{..._centeringStyle, bgcolor: _color.background_upper, borderRadius: _divRadius}}>
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
                elements={orderByes}
                value={orderBy}
                handleChange={setOrderBy}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid key={3} container item lg={12} md={12} m={2} mt={1} height={"78vh"}>
          <Grid item lg={12} md={12} sx={{ bgcolor: _color.background_upper, borderRadius: _divRadius}} >
            {apartments.map((x: any, idx) => {
              return (
                <Apartment
                  data={x}
                  key={idx}
                />
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
