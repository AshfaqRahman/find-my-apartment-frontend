"use client";
import * as React from "react";
import { Inter, Rochester, Satisfy } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import {
  Box,
  Grid,
  IconButton,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import ButtonComponent from "@/mui-components/buttons";
import MultiSelectComponent from "@/mui-components/multi-select";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  _apartmentTypes,
  _area,
  _baths,
  _beds,
  _budget,
  _centeringStyle,
  _color,
  _divRadius,
  _mapHeightInAddApartment,
  _pageHeight,
  apartmentTypeMapping,
  apartmentTypeReverseMapping,
} from "@/static/constants";
import Dropzone from "@/components/ReactComponents/dropzone";
import ApartmentTypesComponent from "@/components/apartment-types";
import KeywordsComponent from "@/components/keywords";
import FacilitiesComponent from "@/components/facilities";
import TextFieldComponent from "@/mui-components/text-field";
import Map from "@/components/map";
import TextAreaComponent from "@/mui-components/text-area";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { storage } from "@/services/firebase-config";
import { randomInRange } from "@/static/utils";
import { getUserData, getApartment, saveApartment } from "../apis";
import LoaderComponent from "@/components/loader";
import ToastComponent from "@/mui-components/toast";
import {
  fetchFacilities,
  fetchKeywords,
} from "@/components/api/fixed-values-api";
import { useRouter } from "next/navigation";

export default function Home(params: any) {
  
  const { push } = useRouter();

  let [apartment, setApartment] = useState<any>({});
  let apartment_id = params.params.apartment_id;

  const [apartmentTypes, setApartmentTypes] = React.useState([]);
  const [keywords, setKeywords] = React.useState([]);
  let keywordsWithTitle = [];

  const [facilities, setFacilities] = React.useState([]);
  let facilitiesWithTitle = [];

  const [beds, setBeds] = React.useState<number | "">("");
  const handleBedsChange = (e: any) => {
    setBeds(e.target.value);
  };

  const [baths, setBaths] = React.useState<number | "">("");
  const handleBathsChange = (e: any) => {
    setBaths(e.target.value);
  };

  const [floor, setFloor] = React.useState<number | "">("");
  const handleFloorChange = (e: any) => {
    setFloor(e.target.value);
  };

  const [area, setArea] = React.useState<number | "">("");
  const handleAreaChange = (e: any) => {
    setArea(e.target.value);
  };

  const [price, setPrice] = React.useState<number | "">("");
  const handlePriceChange = (e: any) => {
    setPrice(e.target.value);
  };

  const [address, setAddress] = React.useState<any>("");
  const handleAddressChange = (e: any) => {
    setAddress(e.target.value);
  };

  const [zone, setZone] = React.useState<any>("");
  const [district, setDistrict] = React.useState<any>("");
  const [division, setDivision] = React.useState<any>("");
  const [location, setLocation] = React.useState<any>({});

  const [streetNo, setStreetNo] = React.useState<number | "">("");
  const handleStreetNoChange = (e: any) => {
    setStreetNo(e.target.value);
  };
  const [houseNo, setHouseNo] = React.useState<number | "">("");
  const handleHouseNoChange = (e: any) => {
    setHouseNo(e.target.value);
  };

  const [description, setDescription] = React.useState<any>("");
  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const [mapAddress, setMapAddress] = React.useState<any>("");

  const pageHeight = _pageHeight;

  let setOnMap = (e: any): void => {
    setMapAddress(address);
  };

  let [apartmentFilesURL, setApartmentFilesURL] = useState<any[]>([]);
  let [blueprintFilesURL, setBlueprintFilesURL] = useState<any[]>([]);

  let [addingApartmentLoading, setAddingApartmentLoading] = useState(false);

  let [openToast, setOpenToast] = useState(false);
  let [message, setMessage] = useState("");
  let [severity, setSeverity] = useState("success");

  let [contactInfo, setContactInfo] = useState({
    email: "",
    phone_no: "",
  });

  useEffect(() => {
    (async () => {
      let data: any = await getUserData();
      // console.log(data);
      if (data.success) {
        setContactInfo(data.data);
      } else {
        setOpenToast(true);
        setMessage(data.message);
        setSeverity("error");
      }
    })();
  }, []);

  let setApartmentData = async (apartment) => {
    // console.log(apartment, keywordsWithTitle, facilitiesWithTitle);
    setApartment(apartment);

    setApartmentTypes(
      apartment.types.map((type) => apartmentTypeMapping[type])
    );
    setKeywords(
      keywordsWithTitle
        .filter((keyword) => apartment.starpoints?.includes(keyword.title))
        .map((keyword) => keyword.starpoint_id)
    );
    setFacilities(
      facilitiesWithTitle
        .filter((facility) => apartment.facilities?.includes(facility.title))
        .map((facility) => facility.facilities_id)
    );
    setBeds(apartment.bedrooms);
    setBaths(apartment.washrooms);
    setFloor(apartment.floor);
    setArea(apartment.area_sqft);
    setPrice(apartment.price);
    setAddress(apartment.location.detailed_address);
    setStreetNo(apartment.location.street_no);
    setHouseNo(apartment.location.house_no);
    setDescription(apartment.description);
    setZone(apartment.location.zone);
    setDistrict(apartment.location.district);
    setDivision(apartment.location.division);
    setLocation({
      lat: apartment.location.latitude,
      lng: apartment.location.longitude,
    });
    setMapAddress(apartment.location.detailed_address);
    setApartmentFilesURL(apartment.images);
    setBlueprintFilesURL([apartment.blueprint_url]);
  };

  let getFacitlities = async () => {
    // console.log("getFacitlities");
    let facilities = await fetchFacilities();
    facilitiesWithTitle = facilities.data;
  };

  let getKeywords = async () => {
    // console.log("getKeywords");
    let keywords = await fetchKeywords();
    keywordsWithTitle = keywords.data;
  };

  useEffect(() => {
    setAddingApartmentLoading(true);
    (async () => {
      await getFacitlities();
      await getKeywords();

      let data: any = await getApartment({ apartment_id });
      console.log(data);
      if (!data.success) {
        setMessage(data.message);
        setSeverity("error");
        setOpenToast(true);
      } else {
        setApartmentData(data.data);
        setAddingApartmentLoading(false);
      }
    })();
  }, []);

  let addingApartment = async () => {
    let params = {
      apartment: {
        id: apartment_id,
        types: apartmentTypes.map((type) => apartmentTypeReverseMapping[type]),
        occupied: apartment.occupied,
        description,
        floor,
        bedrooms: beds,
        washrooms: baths,
        area_sqft: area,
        price,
        blueprint_url: blueprintFilesURL[0],
      },

      keywords: {
        starpoint_ids: keywords,
      },
      facilities: {
        facility_ids: facilities,
      },
      location: {
        detailed_address: address,
        street_no: streetNo,
        house_no: houseNo,
        zone: zone,
        district: district,
        division: division,
        latitude: location.lat,
        longitude: location.lng,
      },
      images: {
        image_urls: apartmentFilesURL,
      },
    };
    let data: any = await saveApartment(params);
    // console.log(data);
    setAddingApartmentLoading(false);
    if (data.success) {
      setOpenToast(true);
      setMessage(data.data);
      setSeverity("success");
      push("/apartment-details/" + apartment_id);
    } else {
      setOpenToast(true);
      setMessage(data.message);
      setSeverity("error");
    }
  };

  let onSave = async () => {
    setAddingApartmentLoading(true);
    await addingApartment();
    // console.log("Uploaded");
  };

  return (
    <>
      <LoaderComponent loading={addingApartmentLoading} />
      <ToastComponent
        message={message}
        open={openToast}
        onClose={setOpenToast}
        onCross={setOpenToast}
        severity={severity}
      />
      <Grid container spacing={0} key={1} mt={0}>
        <Grid
          item
          container
          height={pageHeight}
          position={"fixed"}
          overflow={"auto"}
          md={12}
          lg={12}
          sx={{
            ..._centeringStyle,
            bgcolor: _color.background_left,
          }}
        >
          <Grid
            key={2}
            container
            item
            pt={3}
            spacing={0}
            sx={{
              width: "66vw",
              bgcolor: _color.background_upper,
              borderRadius: _divRadius,
            }}
          >
            <Grid key={1} item lg={6} md={6}>
              <Box sx={{ ..._centeringStyle }}>
                <Typography
                  sx={{
                    ml: 1,
                    fontSize: "1.75rem",
                    fontWeight: 600,
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Edit Apartment
                </Typography>
              </Box>
            </Grid>
            <Grid key={2} item lg={6} md={6}>
              <Box sx={{ ..._centeringStyle }}>
                <ButtonComponent
                  variant="contained"
                  style="primary"
                  onClick={onSave}
                >
                  Save
                </ButtonComponent>
              </Box>
            </Grid>
            <Grid item key={"apartment image"} lg={6} md={6}>
              <Box
                sx={{
                  ..._centeringStyle,
                }}
              >
                <Dropzone
                  title="Apartment's Image(max 10 files)"
                  location="apartments"
                  maxFiles={10}
                  onUpload={(urls: any) => {
                    setApartmentFilesURL(urls);
                  }}
                  fileUrls={apartmentFilesURL}
                >
                  {(dropzoneProps: any) => {
                    return <></>;
                  }}
                </Dropzone>
              </Box>
            </Grid>
            <Grid item key={"blueprint"} lg={6} md={6}>
              <Box
                sx={{
                  ..._centeringStyle,
                }}
              >
                <Dropzone
                  title="Blueprint(1 image)"
                  location="blueprints"
                  maxFiles={1}
                  onUpload={(urls: any) => {
                    setBlueprintFilesURL(urls);
                  }}
                  fileUrls={blueprintFilesURL}
                >
                  {(dropzoneProps: any) => {
                    return <></>;
                  }}
                </Dropzone>
              </Box>
            </Grid>
            <Grid key={"apartment type"} item lg={4} md={4}>
              <Box mx={2}>
                <ApartmentTypesComponent
                  value={apartmentTypes}
                  setValue={setApartmentTypes}
                />
              </Box>
            </Grid>
            <Grid key={"KeywordsComponent"} item lg={4} md={4}>
              <Box mx={2}>
                <KeywordsComponent value={keywords} setValue={setKeywords} />
              </Box>
            </Grid>
            <Grid key={"FacilitiesComponent"} item lg={4} md={4}>
              <Box mx={2}>
                <FacilitiesComponent
                  value={facilities}
                  setValue={setFacilities}
                />
              </Box>
            </Grid>
            <Grid key={5} container my={1}>
              <Grid item lg={4} md={4}>
                <Box mx={2}>
                  <TextFieldComponent
                    label="Beds"
                    type="number"
                    value={beds}
                    handleChange={handleBedsChange}
                  />
                </Box>
              </Grid>
              <Grid item lg={4} md={4}>
                <Box mx={2}>
                  <TextFieldComponent
                    label="Baths"
                    type="number"
                    value={baths}
                    handleChange={handleBathsChange}
                  />
                </Box>
              </Grid>
              <Grid item lg={4} md={4}>
                <Box mx={2}>
                  <TextFieldComponent
                    label="Floor"
                    type="number"
                    value={floor}
                    handleChange={handleFloorChange}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container my={1}>
              <Grid item lg={4} md={4}>
                <Box mx={2}>
                  <TextFieldComponent
                    label="Area(sq. ft.)"
                    type="number"
                    value={area}
                    handleChange={handleAreaChange}
                  />
                </Box>
              </Grid>
              <Grid item lg={4} md={4}>
                <Box mx={2}>
                  <TextFieldComponent
                    label="Price"
                    type="number"
                    value={price}
                    handleChange={handlePriceChange}
                  />
                </Box>
              </Grid>
              <Grid item lg={3} md={3}>
                <Box ml={2}>
                  <TextFieldComponent
                    label="Address"
                    value={address}
                    handleChange={handleAddressChange}
                  />
                </Box>
              </Grid>
              <Grid
                item
                lg={1}
                md={1}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <Box mr={2}>
                  <Tooltip title="see on map">
                    <IconButton
                      size="large"
                      color="error"
                      sx={{
                        bgcolor: _color.background_upper,
                        borderRadius: _divRadius,
                        height: "40px",
                        width: "40px",
                      }}
                      onClick={setOnMap}
                    >
                      <LocationOnIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>
            <Grid container my={1}>
              <Grid container item md={6} lg={6}>
                <Grid item md={6} lg={6}>
                  <Box mx={2}>
                    <TextFieldComponent
                      label="Street no."
                      type="number"
                      value={streetNo}
                      handleChange={handleStreetNoChange}
                    />
                  </Box>
                </Grid>
                <Grid item md={6} lg={6}>
                  <Box mx={2}>
                    <TextFieldComponent
                      label="house no."
                      type="number"
                      value={houseNo}
                      handleChange={handleHouseNoChange}
                    />
                  </Box>
                </Grid>
                <Grid item md={12} lg={12}>
                  <Box mx={2}>
                    <TextAreaComponent
                      value={description}
                      handleChange={handleDescriptionChange}
                      title={"Description"}
                    />
                  </Box>
                </Grid>
                <Grid item md={6} lg={6}>
                  <Box mx={2}>
                    <b>Contact</b>
                    <Grid container>
                      <Grid item md={5} lg={5}>
                        Email
                      </Grid>
                      <Grid item md={7} lg={7}>
                        : {contactInfo.email}
                      </Grid>
                      <Grid item md={5} lg={5}>
                        Phone
                      </Grid>
                      <Grid item md={7} lg={7}>
                        : {contactInfo.phone_no}
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
              <Grid item md={6} lg={6}>
                <Box mx={2} height={_mapHeightInAddApartment}>
                  <Map
                    setAddress={setAddress}
                    draggable
                    fromAddress
                    openMap={true}
                    setLatLng={setLocation}
                    address={mapAddress}
                    height={"100%"}
                    setZone={setZone}
                    setDistrict={setDistrict}
                    setDivision={setDivision}
                  ></Map>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
