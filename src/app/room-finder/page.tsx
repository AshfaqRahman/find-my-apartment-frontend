"use client";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
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
  _pageHeight,
} from "@/static/constants";
import SliderComponent from "@/mui-components/slider";
import TextFieldComponent from "@/mui-components/text-field";
import Budget from "@/components/budget";
import Area from "@/components/area";
import HOST from "@/static/host";
import axios from "axios";
import Post from "@/components/post";
import SelectComponent from "@/mui-components/select";
import { findRooms } from "./apis";
import { apiUrls } from "@/lib/apiUrls";
import ApartmentTypesComponent from "@/components/apartment-types";
import BedsSelectionComponent from "@/components/beds-selection";
import BathsSelectionComponent from "@/components/baths-selection";
import FacilitiesComponent from "@/components/facilities";
import KeywordsComponent from "@/components/keywords";
import Map from "@/components/map";
import LoaderComponent from "@/components/loader";
import PersonsInRoomSelectionComponent from "@/components/persons-in-room-selection";
import NoOfResidentsSelectionComponent from "@/components/no-of-residents";
import NoOfLivingRoomsSelectionComponent from "@/components/no-of-living-rooms";
import GendersSelectionComponent from "@/components/genders";

import { Inter, Rochester, Satisfy, Lato } from "next/font/google";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LocationSearchMapComponent from "@/components/location-search-map";
import PostSubmit from "./post-submit";
import { useRouter } from "next/navigation";
import ToastComponent from "@/mui-components/toast";
import { randomInRange } from "@/static/utils";

const rochester = Rochester({ weight: "400", subsets: ["latin"] });
const lato = Lato({ weight: "700", subsets: ["latin"] });
const theme = createTheme({
  typography: {
    fontFamily: lato.style.fontFamily,
  },
});

const localPath = "room-finder";

export default function RoomFinder() {
  const { push } = useRouter();

  const [gender, setGender] = React.useState([]);
  const handleGenderChange = (selectedOptions: any) => {
    setGender(selectedOptions);
  };

  const [residents, setResidents] = React.useState([]);
  const handleResidentsChange = (selectedOptions: any) => {
    setResidents(selectedOptions);
  };

  const [roommates, setRoommates] = React.useState([]);
  const handleRoommatesChange = (selectedOptions: any) => {
    setRoommates(selectedOptions);
  };

  const [beds, setBeds] = React.useState([]);
  const handleBedsChange = (selectedOptions: any) => {
    setBeds(selectedOptions);
  };

  const [baths, setBaths] = React.useState([]);
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

  let [mapLat, setMapLat] = React.useState();
  let [mapLng, setMapLng] = React.useState();
  const [zone, setZone] = React.useState<any>("");
  const [district, setDistrict] = React.useState<any>("");
  const [division, setDivision] = React.useState<any>("");
  const [location, setLocation] = React.useState<any>("");
  const [radius, setRadius] = React.useState<number | "">("");
  const [searchAddress, setSearchAddress] = React.useState<any>("");

  let [posts_, setPosts_] = React.useState([
    {
      id: 1,
      price: 15000,
      bedrooms: 3,
      baths: 2,
      area_sqft: 1400,
      zone: "Motijheel",
      district: "Dhaka",
      type: "Bachelor",
      title: "Bari Bhara Deowa Hoibe",
      textBody:
        "The quick brown fox jumps over the lazy dog. And so I need a billion dollars.",
      owner: "makumhakan",
      star_points: ["Fire Station", "Bank", "School", "University"],
      facilities: ["security", "wifi", "parking", "rooftop", "laundry"],
    },
    {
      id: 2,
      price: 24000,
      bedrooms: 3,
      baths: 2,
      area_sqft: 1860,
      zone: "Dhanmondi",
      district: "Dhaka",
      type: "Sublet",
      title: "Apartment for Rent",
      textBody:
        "I tried so hard and got so far. But in the end, it doesn't even matter. I had to fall to lose it all. But in the end, it doesn't even matter.",
      owner: "tuluashfak",
      star_points: ["Fire Station", "Bank, School", "University"],
      facilities: ["security", "wifi", "parking", "rooftop", "laundry"],
    },
    {
      id: 3,
      price: 14000,
      bedrooms: 3,
      baths: 2,
      area_sqft: 1300,
      zone: "Azimpur",
      district: "Dhaka",
      type: "Bachelor",
      title: "Bachelor Bhaiyera, Eidike Ashun",
      textBody:
        "The child is grown, the dream is gone. I have become comfortably numb. Hello? Is there anybody in there? Just node if you can hear me. Is there anyone home?",
      owner: "maruiffa",
      star_points: ["Fire Station", "Bank, School", "University"],
      facilities: ["security", "wifi", "parking", "rooftop", "laundry"],
    },
  ]);

  let [posts, setPosts] = React.useState([]);

  let orderByes: any = {
    "price lowest": {
      key: "price",
      order: 1,
    },
    "price highest": {
      key: "price",
      order: -1,
    },
    // latest: {
    //   key: "created_at",
    //   order: -1,
    // },
  };
  let [orderBy, setOrderBy] = React.useState("");

  useEffect(() => {
    let psts = [...posts];
    psts.sort(
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
    setPosts(psts);
  }, [orderBy]);

  const saveSearch = () => {
    console.log("Saving search ...");
  };

  let [openToast, setOpenToast] = React.useState(false);
  let [message, setMessage] = React.useState("");
  let [severity, setSeverity] = React.useState("success");
  let [fetchingPosts, setFetchingPosts] = React.useState(false);

  const searchRooms = async () => {
    setFetchingPosts(true);
    // console.log("TEST " + gender);

    const params = {
      location: location,
      radius: radius,
      gender: gender,
      beds: beds,
      baths: baths,
      roommates: roommates,
      residents: residents,
      price_min: +budget[0],
      price_max: +budget[1],
      area_min: +area[0],
      area_max: +area[1],
      facilities: facilities,
      keywords: keywords,
    };
    let data: any = await findRooms(params);
    // console.log("data.data: " + JSON.stringify(data.data));

    if (data.success) {
      setPosts(data.data);
      setSeverity("success");
      setMessage(`${data.data.length} posts are found`);
    } else {
      setSeverity("error");
      setMessage(data.message);
    }
    setOpenToast(true);
    setFetchingPosts(false);
  };

  const items = [
    {
      id: 1,
      name: "Item 1",
      description: "This is item 1.",
    },
    {
      id: 2,
      name: "Item 2",
      description: "This is item 2.",
    },
    {
      id: 3,
      name: "Item 3",
      description: "This is item 3.",
    },
  ];

  const [openModal, setOpenModal] = useState(false);

  let height = _pageHeight;

  return (
    <>
      <LoaderComponent loading={fetchingPosts} />
      <Grid container spacing={0} key={1} pt={1}>
        <Grid
          key={1}
          minHeight={{ height }}
          maxHeight={{ height }}
          position={"fixed"}
          overflow={"auto"}
          container
          item
          lg={4}
          md={4}
          ml={1}
          sx={{
            backgroundColor: _color.background_lighter,
          }}
        >
          {/* <Grid
            key={1}
            item
            lg={6}
            md={6}
            style={{ display: "flex", justifyContent: "left" }}
          >
            <Box sx={{ ..._centeringStyle, m: "10px", mt: "25px" }}>
              <ButtonComponent
                variant="contained"
                style="primary"
                onClick={saveSearch}
              >
                Save Search
              </ButtonComponent>
            </Box>
          </Grid> */}

          <Grid
            item
            lg={12}
            md={12}
            style={{ display: "flex", justifyContent: "right" }}
          >
            <Box sx={{ ..._centeringStyle, m: "10px", mt: "25px" }}>
              <ButtonComponent
                variant="contained"
                style="primary"
                onClick={searchRooms}
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

          <Grid item lg={12} md={12} mt={2}>
            <GendersSelectionComponent onChange={handleGenderChange} />
          </Grid>

          <Grid item lg={12} md={12} mt={2} style={{ display: "flex" }}>
            <NoOfLivingRoomsSelectionComponent onChange={handleBedsChange} />
          </Grid>

          <Grid item lg={12} md={12} mt={2}>
            <BathsSelectionComponent onChange={handleBathsChange} />
          </Grid>

          <Grid item lg={12} md={12} mt={2}>
            <PersonsInRoomSelectionComponent onChange={handleRoommatesChange} />
          </Grid>

          <Grid item lg={12} md={12} mt={2}>
            <NoOfResidentsSelectionComponent onChange={handleResidentsChange} />
          </Grid>

          <Grid item lg={12} md={12} mt={2}>
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
          </Grid>

          <Grid key={8} item lg={12} md={12} mt={2}>
            <Box mx={1}>
              <FacilitiesComponent
                value={facilities}
                setValue={setFacilities}
              />
            </Box>
          </Grid>

          <Grid key={9} item lg={12} md={12} mt={2}>
            <Box mx={1}>
              <KeywordsComponent value={keywords} setValue={setKeywords} />
            </Box>
          </Grid>
        </Grid>
        <Grid
          key={2}
          minHeight={{ height }}
          maxHeight={{ height }}
          position={"fixed"}
          overflow={"auto"}
          right={"0%"}
          container
          item
          lg={8}
          md={8}
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
              bgcolor: _color.background_lighter,
              borderRadius: "10px",
            }}
            md={12}
          >
            <Grid key={1} item lg={4.5} md={4.5} p={3}>
              <Box sx={{ ..._centeringStyle }}>
                <ThemeProvider theme={theme}>
                  <Typography
                    noWrap
                    component="a"
                    sx={{
                      ml: 1,
                      fontSize: "2rem",
                      fontWeight: 900,
                      letterSpacing: "0rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    <b>Posts For You</b>
                  </Typography>
                </ThemeProvider>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} p={3}>
              <Box sx={{ ..._centeringStyle, margin: 0 }}>
                <SelectComponent
                  title={"Order By"}
                  elements={Object.keys(orderByes)}
                  value={orderBy}
                  handleChange={setOrderBy}
                />
              </Box>
            </Grid>
            {/* <Grid item lg={3} md={3} p={3}>
              <Box sx={{ ..._centeringStyle, margin: 0 }}>
                <Checkbox />
                <Typography sx={{ fontWeight: "bold" }}>My Posts</Typography>
              </Box>
            </Grid> */}
            <Grid item lg={1.5} md={1.5} p={3}>
              <Box sx={{ ..._centeringStyle, margin: 0 }}>
                <ButtonComponent
                  style="primary"
                  variant="contained"
                  onClick={() => setOpenModal(true)}
                >
                  Post
                </ButtonComponent>
                <Modal
                  open={openModal}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    width={"60vw"}
                    height={"70vh"}
                    style={{ backgroundColor: "red" }}
                  >
                    <PostSubmit setOpenModal={setOpenModal} />
                  </Box>
                </Modal>
              </Box>
            </Grid>
          </Grid>

          <Grid
            key={3}
            container
            item
            lg={12}
            md={12}
            m={2}
            mt={1}
            height={"78vh"}
          >
            <Grid
              item
              lg={12}
              md={12}
              sx={{
                bgcolor: _color.background_upper,
                borderRadius: "10px",
              }}
            >
              {posts.map((x: any, idx) => {
                return <Post data={x} key={idx} />;
              })}
            </Grid>
          </Grid>
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
