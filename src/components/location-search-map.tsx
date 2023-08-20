import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import MapDialogComponent from "./map-dialog";
import { _centeringStyle, _color, _divRadius } from "@/static/constants";
import TextFieldComponent from "@/mui-components/text-field";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";

export default function LocationSearchMapComponent(props: any) {
  const handleSearchAddressChange = (e: any) => {
    props.setAddress(e.target.value);
  };

  let handleRadiusChange = (e: any) => {
    props.setRadius(e.target.value);
  };

  let [openMap, setOpenMap] = useState(false);

  // const [mapAddress, setMapAddress] = useState<any>("");

  let setOnMap = (e: any): void => {
    // setMapAddress(searchAddress);
    setOpenMap(true);
  };

  return (
    <Grid container spacing={2}>
      <Grid item lg={10} md={10}>
        <Box sx={{ ..._centeringStyle }}>
          <TextFieldComponent
            label="Address"
            value={props.searchAddress}
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
            searchAddress={props.searchAddress}
            setSearchAddress={props.setSearchAddress}
            setLatLng={props.setLocation}
            setZone={props.setZone}
            setDistrict={props.setDistrict}
            setDivision={props.setDivision}
          />
        ) : (
          <></>
        )}
      </Grid>
      <Grid item md={12} lg={12}>
        <TextFieldComponent
          label="Radius(in k.m.)"
          type="number"
          value={props.radius}
          fullWidth
          handleChange={handleRadiusChange}
        />
      </Grid>
    </Grid>
  );
}
