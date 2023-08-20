import { _color, _divRadius, apartmentTypeMapping } from "@/static/constants";
import { Box, Grid, Typography } from "@mui/material";
import { faBed, faShower } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function Overview(props: any) {
  return (
    <>
      <Grid container>
        <Grid item md={12} lg={12}>
          <Box
            sx={{
              borderRadius: _divRadius,
              bgcolor: _color.background_right,
              border: "1px solid " + _color.divider,
              boxShadow: 1,
              padding: "1rem",
            }}
          >
            <Typography variant="h5" gutterBottom>
              <b>Overview</b>
            </Typography>
            <Grid container style={{ paddingBottom: "20px" }}>
              <Grid item md={6} style={{ paddingTop: "10px" }}>
                <Grid container>
                  <Grid item md={6}>
                    Area(sqft): <b>{props.apartment.area_sqft}</b>
                  </Grid>
                  <Grid item md={6}>
                    Floor: <b>{props.apartment.floor}</b>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={6}>
                    <FontAwesomeIcon icon={faBed} style={{ margin: 3 }} />{" "}
                    <b>{props.apartment.bedrooms}</b> &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp;
                  </Grid>
                  <Grid item md={6}>
                    <FontAwesomeIcon icon={faShower} style={{ margin: 3 }} />{" "}
                    <b>{props.apartment.washrooms}</b> &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp;
                  </Grid>
                </Grid>

                <Grid
                  container
                  style={{ paddingTop: "10px", paddingBottom: "10px" }}
                >
                  <Grid item md={6} style={{ fontSize: "24px" }}>
                    <b>BDT {props.apartment.price}</b>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    style={{
                      display: "flex",
                      fontSize: "15px",
                      alignItems: "center",
                    }}
                  >
                    <b>
                      {props.apartment.types
                        ?.map((type: any) => apartmentTypeMapping[type])
                        .join(", ")}
                    </b>
                  </Grid>
                </Grid>

                <Grid item md={12} style={{ paddingRight: "15px" }}>
                  {props.apartment.description}
                </Grid>
              </Grid>
              <Grid
                item
                md={6}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  src={props.apartment.blueprint_url}
                  alt="Blueprint"
                  height={300}
                  width={300}
                  loading="lazy"
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
