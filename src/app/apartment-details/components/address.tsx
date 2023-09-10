import { _color, _divRadius } from "@/static/constants";
import { Box, Button, Grid, Typography } from "@mui/material";



export default function Address(props: any) {
    return (
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
          <b>Address</b>
        </Typography>

        <Grid container style={{margin:"5px"}}>
            <Grid item md={6}>House No.: <b>{props.location.house_no ? props.location.house_no : <></>}</b></Grid>
            <Grid item md={4}>Zone: <b>{props.location.zone ? props.location.zone : <></>}</b></Grid>
        </Grid>

        <Grid container style={{margin:"5px"}}>
            <Grid item md={6}>Street No.: <b>{props.location.street_no ? props.location.street_no : <></>}</b></Grid>
            <Grid item md={4}>District: <b>{props.location.district ? props.location.district : <></>}</b></Grid>
        </Grid>
      </Box>
    );
  }