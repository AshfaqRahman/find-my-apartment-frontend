"use client";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { Box, Chip, Divider, Grid } from "@mui/material";
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
import Overview from "../components/overview";
import FacStar from "../components/facStar";
import Address from "../components/address";
import { getApartment } from "../apis";
import ToastComponent from "@/mui-components/toast";
import OwnerInfo from "../components/owner_info";
import MapDialogComponent from "@/components/map-dialog";
import MapDialogNotDraggableComponent from "@/components/map-dialog-not-draggable";

export default function ApartmentDetails(params: any) {
  let [apartment, setApartment] = useState<any>();

  let [openToast, setOpenToast] = React.useState(false);
  let [message, setMessage] = React.useState("");
  let [severity, setSeverity] = React.useState("success");

  let [loadingApartment, setLoadingApartment] = useState(true);
  let [openMap, setOpenMap] = useState(false);

  useEffect(() => {
    let apartment_id = params.params.apartment_id;
    setLoadingApartment(true);
    (async () => {
      let data: any = await getApartment({ apartment_id });
      if (!data.success) {
        setMessage(data.message);
        setSeverity("error");
        setOpenToast(true);
      } else {
        setApartment(data.data);
        setLoadingApartment(false);
      }
    })();
  }, []);

  let facilities = ["wifi", "parking", "elevator"];

  let star_points = ["hospital", "school", "university", "shopping mall"];

  let imageWidth = 70;

  let tabs: any = [
    {
      title: "Overview",
      onClick: () => window.scrollTo(0, tabs[0].ref.current.offsetTop),
      ref: useRef(null),
      jsx: (
        <Overview
          apartment={apartment}
          photo="/blueprint1.jpg"
          type="Family"
          bedrooms="4"
          bathrooms="3"
          zone="Lalbag"
          floor="5"
          area="1200"
          price="20000"
          description="Welcome to this charming two-bedroom apartment nestled in the heart of the bustling city. With its prime location, you'll have easy access to all the amenities and attractions that make urban living exciting."
        />
      ),
    },
    {
      title: "Address",
      onClick: () => window.scrollTo(0, tabs[1].ref.current.offsetTop),
      ref: useRef(null),
      jsx: <Address location={apartment?.location} house_no="78A" street_no="6" zone="Lalbag" district="Dhaka"/>,
    },
    {
      title: "Facilities",
      onClick: () => window.scrollTo(0, tabs[2].ref.current.offsetTop),
      ref: useRef(null),
      jsx: <FacStar type="Facilities" list={apartment?.facilities}/>,
    },
    {
      title: "Star Points",
    onClick: () => window.scrollTo(0, tabs[3].ref.current.offsetTop),
    ref: useRef(null),
    jsx: <FacStar type="Starpoints" list={apartment?.starpoints} />,
    },
    {
      title: "Owner Info",
      onClick: () => window.scrollTo(0, tabs[4].ref.current.offsetTop),
      ref: useRef(null),
      jsx: <OwnerInfo owner={apartment?.owner_id} />,
    }
  ];

  return (
    <>
      <LoaderComponent loading={loadingApartment} />

      <ToastComponent
        message={message}
        open={openToast}
        onClose={setOpenToast}
        onCross={setOpenToast}
        severity={severity}
      />
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
              {loadingApartment ? (
                <></>
              ) : (
                <Carousel animation="slide">
                  {apartment?.images?.map((image, i) => (
                    <Box key={i} height={"60vh"}>
                      <Item img={image} />
                    </Box>
                  ))}
                </Carousel>
              )}
            </Box>
            <ButtonComponent variant={"contained"} style={"primary"} onClick={() => setOpenMap(true)}>
              <LocationOnIcon />
              Map
            </ButtonComponent>
            <MapDialogNotDraggableComponent
            openMap={openMap}
            closeMap={() => setOpenMap(false)}
            address={apartment?.location.detailed_address}
            notDraggable
            lat={apartment?.location.latitude}
            lng={apartment?.location.longitude}
          />
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
              {tabs.map((tab: any, i: number) => {
                return loadingApartment ? (
                  <div key={i}></div>
                ) : (
                  <Grid key={i} my={2} item lg={12} md={12}>
                    <div ref={tab.ref}>{tab.jsx}</div>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Grid>
        {/* <Grid item mt={2} md={12} lg={12}>
          <Divider>
            <Chip label="Similar Apartments" />
          </Divider>
        </Grid> */}
      </Grid>
    </>
  );
}

function Item(props: any) {
  return (
    <img
      src={props.img}
      width={"100%"}
      height={"100%"}
      alt="Apartment"
      style={{ borderRadius: _divRadius }}
    />
  );
}
