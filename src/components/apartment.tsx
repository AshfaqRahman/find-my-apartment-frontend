import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  _cardRadius,
  _centeringStyle,
  _color,
  _divRadius,
  _facilities,
  apartmentTypeMapping,
} from "@/static/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faShower } from "@fortawesome/free-solid-svg-icons";
import FacilitiesIconsComponent from "./facilities-icons";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Apartment(props: any) {
  let facilities = props.data.facilities.map(
    (facility: any) => facility.facility.title
  );

  let showOnMap = async () => {
    props.setMapLocation();
  };

  let inWishlist = props.inWishlist;

  let margin = 3;
  let color = "#2ea300";

  const { push } = useRouter();



  return (
    <>
      <Card
        sx={{
          display: "flex",
          margin: 3,
          borderRadius: _cardRadius,
        }}
      >
        <CardMedia
          sx={{ width: "50%", cursor: "pointer" }}
          image={props.data.images[0].image_url}
          title="green iguana"
          key={1}
          onClick={() => {push("/apartment-details/" + props.data.id)}}
        />
        <Grid container>
          <Box width={"100%"}>
            <CardContent>
              <Typography key={2} gutterBottom variant="h5" component="div">
                BDT. {props.data.price}
              </Typography>
              <Typography key={3} gutterBottom variant="h6" component="div">
                {props.data.types
                  .map((type: any) => apartmentTypeMapping[type])
                  .join(", ")}
              </Typography>
              <Typography key={4} gutterBottom component="div">
                Road no. {props.data.location.street_no},{" "}
                {props.data.location.zone}, {props.data.location.district},{" "}
                {props.data.location.division}
              </Typography>
              <Typography
                margin={0}
                key={5}
                variant="h6"
                color="text.secondary"
              >
                <FontAwesomeIcon icon={faBed} size="xl" style={{ margin: 3 }} />{" "}
                {props.data.bedrooms}
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <FontAwesomeIcon icon={faShower} size="xl" />{" "}
                {props.data.washrooms}, &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                {props.data.area_sqft} sqft
              </Typography>
              <Grid key={"9"} container item lg={12} md={12}>
                <FacilitiesIconsComponent facilities={facilities} />
              </Grid>
              <Grid key={"grid"} container item lg={12} md={12}>
                <Grid item md={10} lg={10}>
                  {props.data.starpoints.map((x: any, idx: number) => {
                    return (
                      <Button
                        key={idx}
                        variant="contained"
                        color="info"
                        sx={{
                          cursor: "default",
                          borderRadius: "50px",
                          height: "20px",
                          mr: 1,
                          fontSize: "15px",
                          padding: 1.5,
                        }}
                      >
                        {x.starpoint.title}
                      </Button>
                    );
                  })}
                </Grid>
                <Grid
                  item
                  md={2}
                  lg={2}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
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
                      onClick={showOnMap}
                    >
                      <LocationOnIcon />
                    </IconButton>
                  </Tooltip>

                  {!props.inWishlist ? (
                    <IconButton
                      size="large"
                      color="error"
                      sx={{
                        bgcolor: _color.background_upper,
                        borderRadius: _divRadius,
                        height: "40px",
                        width: "40px",
                      }}
                      onClick={props.addToWishlist}
                    >
                      <Tooltip title={"add to wishlist"}>
                        <img
                          style={{ margin: margin }}
                          src="/wishlist.png"
                          height={30}
                          color={color}
                          alt="playground"
                        />
                      </Tooltip>
                    </IconButton>
                  ) : (
                    <IconButton
                      size="large"
                      color="error"
                      sx={{
                        bgcolor: _color.background_upper,
                        borderRadius: _divRadius,
                        height: "40px",
                        width: "40px",
                      }}
                      onClick={props.removeFromWishlist}
                    >
                      <Tooltip title={"remove from wishlist"}>
                        <img
                          style={{ margin: margin }}
                          src="/heart.png"
                          height={30}
                          color={color}
                          alt="playground"
                        />
                      </Tooltip>
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Box>
        </Grid>
      </Card>
    </>
  );
}
