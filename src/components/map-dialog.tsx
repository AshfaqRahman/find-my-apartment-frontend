import {
    Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import Map from "./map";
import ButtonComponent from "@/mui-components/buttons";
import { useEffect, useState } from "react";

export default function MapDialogComponent(props: any) {

  // const [address, setAddress] = useState(props.searchAddress)
  let [address, setAddress] = useState(props.searchAddress)

  // useEffect(() => {
  //   props.setSearchAddress(address)
  //   console.log("MapDialogComponent::useEffect::address", address);
  // }, [address])

  return (
    <Dialog
      open={props.openMap}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
    >
      <DialogContent>
        <Grid item md={6} lg={6}>
          <Box mx={2} height={"55vh"} width={"55vw"}>
            <Map
              key={3}
              fromAddress={true}
              address={address}
              setAddress={props.setSearchAddress}
              draggable
              setLatLng={props.setLatLng}
              setZone={props.setZone}
              setDistrict={props.setDistrict}
              setDivision={props.setDivision}
              height="100%"
              width="100%"
            />
          </Box>
        </Grid>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={() => {}}>Disagree</Button> */}
        <ButtonComponent onClick={props.closeMap}  variant="contained" style="primary">
          Close
        </ButtonComponent>
      </DialogActions>
    </Dialog>
  );
}
