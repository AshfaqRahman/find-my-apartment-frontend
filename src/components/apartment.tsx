import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import {
  _cardRadius,
  _centeringStyle,
  _color,
  _divRadius,
  apartmentTypeMapping,
} from "@/static/constants";

export default function Apartment(props: any) {
  let handleClick = async () => {
    props.onClick();
  };

  return (
    <>
      <Card sx={{ display: "flex", margin: 3, borderRadius: _cardRadius }}>
        <CardMedia
          sx={{ width: "50%" }}
          image="/apartment.jpg"
          title="green iguana"
          key={1}
          onClick={handleClick}
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
              <Grid container item lg={12} md={12}>
                <Grid
                  item
                  container
                  lg={5}
                  md={5}
                  sx={{
                    bgcolor: _color.background_upper,
                    borderRadius: _cardRadius,
                    mr: 2,
                  }}
                >
                  <Box sx={{ ..._centeringStyle }}>
                    <Typography
                      sx={{
                        margin: 0,
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                      }}
                    >
                      Facilities
                    </Typography>
                  </Box>
                  <Grid item md={12} lg={12} overflow={"auto"} height={"100px"}>
                    {props.data.facilities.map((facility: any, idx: any) => {
                      return (
                        <Box
                          sx={{
                            bgcolor:
                              idx & 1
                                ? _color.background_lower
                                : _color.background_upper,
                          }}
                        >
                          <Typography
                            key={idx}
                            my={0}
                            ml={1}
                            gutterBottom
                            component="div"
                          >
                            <b>{facility.facility.title}</b>
                          </Typography>
                        </Box>
                      );
                    })}
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  lg={5}
                  md={5}
                  sx={{
                    bgcolor: _color.background_upper,
                    borderRadius: _cardRadius,
                    ml: 2,
                  }}
                >
                  <Box sx={{ ..._centeringStyle }}>
                    <Typography
                      sx={{
                        margin: 0,
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                      }}
                    >
                      Star Points
                    </Typography>
                  </Box>
                  <Grid item md={12} lg={12} overflow={"auto"} height={"100px"}>
                    {props.data.startpoints.map((startpoint: any, idx: any) => {
                      return (
                        <Box
                          sx={{
                            bgcolor:
                              idx & 1
                                ? _color.background_lower
                                : _color.background_upper,
                          }}
                        >
                          <Typography
                            key={idx}
                            my={0}
                            ml={1}
                            gutterBottom
                            component="div"
                          >
                            <b>{startpoint.starpoint.title}</b>
                          </Typography>
                        </Box>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>

              {/* </Grid>
              <Card sx={{ display: "flex", bgcolor: "red" }}>
                <Box>
                  <CardContent>Typog</CardContent>
                </Box>
              </Card> */}
              <Typography
                margin={0}
                key={5}
                variant="h6"
                color="text.secondary"
              >
                <HotelRoundedIcon /> {props.data.bedrooms}{" "}
                <BathtubOutlinedIcon /> {props.data.washrooms},{" "}
                {props.data.area_sqft} sqft
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      </Card>
    </>
  );
}
