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

import { Inter, Rochester, Satisfy } from "next/font/google";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRouter } from "next/router";

const rochester = Rochester({ weight: "400", subsets: ["latin"] });
const theme = createTheme({
  typography: {
    fontFamily: rochester.style.fontFamily,
  },
});

const localPath = "advance-search";

export default function User() {

  var [firstName, setFirstName] = React.useState("")
  var [lastName, setLastName] = React.useState("")
  var [phoneNo, setPhoneNo] = React.useState("")

  let [fetchingApartments, setFetchingApartments] = React.useState(false);

  let [isEditable, setIsEditable] = React.useState(false);

  return (
    <>
      <LoaderComponent loading={fetchingApartments} />
      <Grid container spacing={0} key={1} pt={3}>
        <Grid item lg={12} md={12} sx={{ ..._centeringStyle, width: "100vw" }}>
          <Box
            width={"75vw"}
            bgcolor={_color.background_left}
            borderRadius={_divRadius}
          >
            <Grid container>
              <Grid item sx={{ ..._centeringStyle }} lg={12} md={12} my={2}>
                <ThemeProvider theme={theme}>
                  <Typography
                    noWrap
                    component="a"
                    sx={{
                      ml: 1,
                      fontSize: "1.75rem",
                      fontWeight: 600,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    Profile Information
                  </Typography>
                </ThemeProvider>
              </Grid>
              <Grid
                key={1}
                item
                lg={6}
                md={6}
                my={2}
                sx={{ ..._centeringStyle, alignItems: "flex-start" }}
              >
                <Image
                  src={"/apartment.jpg"}
                  width={200}
                  height={200}
                  style={{
                    borderRadius: "50%",
                  }}
                  alt="profile picture"
                  loading="lazy" // optional
                ></Image>
              </Grid>
              <Grid
                key={2}
                item
                lg={6}
                md={6}
                my={2}
                sx={{ ..._centeringStyle, flexDirection: "column" }}
              >
                <Box mx={2} width={"100%"}>
                  <Grid spacing={3} container>
                    <Grid px={2} item lg={6} md={6}>
                      <Box >
                        <TextFieldComponent label={"firstName"} value={"First Name"} disabled={!isEditable} />
                      </Box>
                    </Grid>
                    <Grid px={2} item lg={6} md={6}>
                      <Box >
                        <TextFieldComponent label={"lastName"} value={"Last Name"} disabled={!isEditable} />
                      </Box>
                    </Grid>
                    <Grid px={2} item lg={12} md={12}>
                      <Box >
                        <TextFieldComponent label={"Email"} value={"abc@example.com"} disabled={!isEditable}/>
                      </Box>
                    </Grid>
                    <Grid px={2} item lg={12} md={12}>
                      <Box >
                        <TextFieldComponent label={"Phone no."} value={"01XXXXXXXXX"} disabled={!isEditable} />
                      </Box>
                    </Grid>
                    <Grid px={2} item lg={12} md={12}>
                      <Box >
                        <TextFieldComponent label={"Gender"} value={"Male"} disabled={!isEditable}/>
                      </Box>
                    </Grid>
                    <Grid px={2} item lg={6} md={6}>
                      <Box >
                        <ButtonComponent fullWidth style="primary" variant="contained" onClick={() => setIsEditable(true)}>
                          Edit
                        </ButtonComponent>
                      </Box>
                    </Grid>
                    <Grid px={2} item lg={6} md={6}>
                      <Box >
                        <ButtonComponent fullWidth style="primary" variant="contained" onClick={() => setIsEditable(false)}>
                          Save
                        </ButtonComponent>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Grid item></Grid>
        </Grid>
      </Grid>
    </>
  );
}

