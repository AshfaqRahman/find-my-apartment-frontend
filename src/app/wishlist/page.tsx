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
  let orderByes = ["Price Lowest", "Price Highest", "Latest", "Preference"];
  let [orderBy, setOrderBy] = React.useState("");

  const getWishlist = async() => {
    setFetchingApartments(true);
  
  }

  return (
    <>
      <Grid position={"fixed"} container>
        <Grid
          item
          key={12}
          lg={12}
          md={12}
          sx={{
            ..._centeringStyle,
            borderRadius: _divRadius,
            width: "100vw",
          }}
          overflow={"auto"}
        >
          <Box width={"60vw"}>
            <Grid
              container
              width={"60vw"}
              bgcolor={_color.background_upper}
              borderRadius={_divRadius}
              my={2}
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
                    elements={orderByes}
                    value={orderBy}
                    handleChange={setOrderBy}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid
              container
              bgcolor={_color.background_upper}
              borderRadius={_divRadius}
              my={2}
              height={"78vh"}
            >
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
                      // addToWishlist={() => addingInWishlist(x.id)}
                      // removeFromWishlist={() => removingFromWishlist(x.id)}
                      // inWishlist={wishlist.includes(x.id)}
                      // setMapLocation={() => {
                      //   let lat = randomInRange(22, 24);
                      //   let lng = randomInRange(89, 91);
                      //   // console.log(lat, lng);
                      //   setMapLat(x.location.latitude);
                      //   setMapLng(x.location.longitude);
                      // }}
                      data={x}
                      key={idx}
                    />
                  );
                })}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
