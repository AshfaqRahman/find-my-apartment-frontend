"use client";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import {
  Box,
  Chip,
  Divider,
  Grid
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
import LoaderComponent from "@/components/loader";

import Carousel from "react-material-ui-carousel";
import Overview from "./components/overview";
import Facilities from "./components/facilities";
import StarPoints from "./components/star-points";
import Pricing from "./components/pricing";
import { faBed, faShower } from "@fortawesome/free-solid-svg-icons";

export default function ApartmentDetails() {

  let [fetchingApartments, setFetchingApartments] = React.useState(false);

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



  let tabs: any = [
    {
      title: "Overview",
      onClick: () => window.scrollTo(0, tabs[0].ref.current.offsetTop),
      ref: useRef(null),
      jsx: <Overview type="Family" bedrooms="4" bathrooms="3" zone="Lalbag" floor="5" area="1200" description="Welcome to this charming two-bedroom apartment nestled in the heart of the bustling city. With its prime location, you'll have easy access to all the amenities and attractions that make urban living exciting."/>,
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
          <Box sx={{
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
