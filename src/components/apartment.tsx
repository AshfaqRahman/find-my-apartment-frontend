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

export default function Apartment(props: any) {
  let facilities = props.data.facilities.map(
    (facility: any) => facility.facility.title
  );

  let handleClick = async () => {
    props.onClick();
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          margin: 3,
          borderRadius: _cardRadius,
          cursor: "pointer",
        }}
      >
        <CardMedia
          sx={{ width: "50%" }}
          image="/apartment.jpg"
          title="green iguana"
          key={1}
        />
        <Grid container>
          <Box width={"100%"}>
            <CardContent>
              <Typography key={2} gutterBottom variant="h5" component="div">
                BDT. {props.data.price}
              </Typography>
              <Typography key={3} gutterBottom variant="h6" component="div">
                {apartmentTypeMapping[props.data.type]}
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
                          borderRadius: "50px",
                          height: "20px",
                          mr: 1,
                          fontSize: "15px",
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
                  <IconButton
                    size="large"
                    color="error"
                    sx={{
                      bgcolor: _color.background_upper,
                      borderRadius: _divRadius,
                      height: "40px",
                      width: "40px",
                    }}
                    onClick={handleClick}
                  >
                    <LocationOnIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
        </Grid>
      </Card>
    </>
  );
}
