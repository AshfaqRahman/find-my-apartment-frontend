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
  };

  let [radius, setRadius] = useState<number | "">("");
  let handleRadiusChange = (e: any) => {
    setRadius(e.target.value);
  }

  useEffect(() => {
    props.handleRadiusChange(radius)
  }, [radius])

  let [openMap, setOpenMap] = useState(false);

  const [mapAddress, setMapAddress] = useState<any>("");

  let setOnMap = (e: any): void => {
    setMapAddress(searchAddress);
    setOpenMap(true);
  };

  useEffect(() => {
    props.handleAddressChange(searchAddress)
  }, [searchAddress])

  return (
    <>
      <Grid item lg={10} md={10}>
        <Box px={1} sx={{ ..._centeringStyle }}>
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
        <MapDialogComponent
          openMap={openMap}
          closeMap={() => setOpenMap(false)}
          searchAddress={mapAddress}
          setSearchAddress={setSearchAddress}
          setLatLng={() => {}}
        />
      </Grid>
      <Grid px={1} item md={12} lg={12}>
        <TextFieldComponent 
            label="Radius(in k.m.)"
            type="number"
            value={radius}
            handleChange={handleRadiusChange}
        />
      </Grid>
    </>
  );
}
