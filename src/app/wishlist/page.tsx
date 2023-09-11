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
import { useEffect, useState } from "react";
import ToastComponent from "@/mui-components/toast";
import LoaderComponent from "@/components/loader";
import { getWishlistApartments } from "./apis";

export default function Wishlist() {
  let height = _pageHeight;

  let [apartments, setApartments] = React.useState([]);
  let [showingApartments, setShowingApartments] = useState([]);
  // let [fetchingApartments, setFetchingApartments] = React.useState(false);

  let apartmentStatuses = ["Any", "Vacant", "Occupied"];
  let [apartmentStatus, setApartmentStatus] = React.useState("Any");

  let orderByes: any = {
    "price lowest": {
      key: "price",
      order: 1,
    },
    "price highest": {
      key: "price",
      order: -1,
    },
    latest: {
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
    apts = apts.filter(
      (apt: any) =>
        apartmentStatus === "Any" ||
        apt.occupied === (apartmentStatus === "Occupied")
    );
    if (orderBy && orderBy !== "")
      apts.sort(
        (a: any, b: any) =>
          orderByes[orderBy].order *
          (orderBy === "latest"
            ? a[orderByes[orderBy].key] > b[orderByes[orderBy].key]
              ? 1
              : -1
            : +a[orderByes[orderBy].key] > +b[orderByes[orderBy].key]
            ? 1
            : -1)
      );
    setShowingApartments(apts);
  }, [orderBy, apartmentStatus]);

  let [openToast, setOpenToast] = React.useState(false);
  let [message, setMessage] = React.useState("");
  let [severity, setSeverity] = React.useState("success");

  let [fetchingApartments, setFetchingApartments] = React.useState(false);

  useEffect(() => {
    setFetchingApartments(true);
    (async () => {
      let data: any = await getWishlistApartments();
      // console.log(data);
      if (!data.success) {
        setFetchingApartments(false);
        setSeverity("error");
        setMessage(data.message);
        setOpenToast(true);
      } else {
        setFetchingApartments(false);
        setApartments(data.data);
        setShowingApartments(data.data);
      }
    })();
  }, []);

  return (
    <>
      <LoaderComponent loading={fetchingApartments} />

      <ToastComponent
        message={message}
        open={openToast}
        onClose={setOpenToast}
        onCross={setOpenToast}
        severity={severity}
      />
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
                    elements={Object.keys(orderByes)}
                    value={orderBy}
                    handleChange={setOrderBy}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container borderRadius={_divRadius} my={2} height={"78vh"}>
              <Grid
                item
                lg={12}
                md={12}
                sx={{
                  bgcolor: _color.background_upper,
                  borderRadius: _divRadius,
                }}
              >
                {showingApartments.map((x: any, idx) => {
                  return <Apartment showMap={false} data={x} key={idx} />;
                })}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
