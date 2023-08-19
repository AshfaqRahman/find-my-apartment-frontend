import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import MapDialogComponent from "./map-dialog";
import { _centeringStyle, _color, _divRadius } from "@/static/constants";
import TextFieldComponent from "@/mui-components/text-field";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";

export default function LocationSearchMapComponent(props: any) {
  const [searchAddress, setSearchAddress] = useState<any>("");
  const handleSearchAddressChange = (e: any) => {
    setSearchAddress(e.target.value);
    if(props.setAddress)
      props.setAddress(e.target.value);
  };

  const [location, setLocation] = useState<any>();
  useEffect(() => {
    props.handleLocationChange(location);
  }, [location]);

  let [radius, setRadius] = useState<number | "">("");
  let handleRadiusChange = (e: any) => {
    setRadius(e.target.value);
  };

  useEffect(() => {
    props.handleRadiusChange(radius);
  }, [radius]);

  let [openMap, setOpenMap] = useState(false);

  // const [mapAddress, setMapAddress] = useState<any>("");

  let setOnMap = (e: any): void => {
    // setMapAddress(searchAddress);
    setOpenMap(true);
  };

  // useEffect(() => {
  //   console.log("map address", mapAddress);
  // }, [openMap])

  return (
    <Grid container  spacing={2}>
      <Grid item lg={10} md={10}>
        <Box  sx={{ ..._centeringStyle }}>
          <TextFieldComponent
            label="Address"
            value={searchAddress}
            handleChange={handleSearchAddressChange}
          />
        </Box>
      </Grid>
      <Grid item lg={2} md={2}>
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
        {openMap ? (
          <MapDialogComponent
            openMap={openMap}
            closeMap={() => setOpenMap(false)}
            searchAddress={searchAddress}
            setSearchAddress={setSearchAddress}
            setLatLng={setLocation}
            setZone={props.setZone}
            setDistrict={props.setDistrict}
            setDivision={props.setDivision}
          />
        ) : (
          <></>
        )}
      </Grid>
      <Grid  item md={12} lg={12}>
        <TextFieldComponent
          label="Radius(in k.m.)"
          type="number"
          value={radius}
          fullWidth
          handleChange={handleRadiusChange}
        />
      </Grid>
    </Grid>
  );
}
