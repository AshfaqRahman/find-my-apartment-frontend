import { _color, _divRadius } from "@/static/constants";
import { Box, Grid, Typography } from "@mui/material";
import { faBed, faShower } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default function Overview(props: any) {
    return (
      <>
      <Grid md={12}>
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
            Overview
          </Typography>
          <Grid container md={12}>
            <Grid item md={6}>
              <Grid container>
                <Grid item md={6}>
                  Zone: {props.zone}
                </Grid>
                <Grid item md={6}>
                  Type: {props.type}
                </Grid>
              </Grid>

              <Grid container>
                <Grid item md={6}>
                  Area(sqft): {props.area}
                </Grid>
                <Grid item md={6}>
                  Floor: {props.floor}
                </Grid>
              </Grid>

              <Grid container>
                <Grid item md={6}>
                  <FontAwesomeIcon icon={faBed} style={{ margin: 3 }} />{" "} {props.bedrooms} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </Grid>
                <Grid item md={6}>
                  <FontAwesomeIcon icon={faShower} style={{ margin: 3 }} />{" "} {props.bedrooms} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </Grid>
              </Grid>
              
              <Grid item md={12}>
                {props.description}
              </Grid>
                  
            </Grid>
            <Grid item md={6}>
              {props.photo}
            </Grid>
          </Grid>
        </Box>
      </Grid>
      </>
    );
  }