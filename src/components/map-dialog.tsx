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

export default function MapDialogComponent(props: any) {
  return (
    <Dialog
      open={props.openMap}
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
    >
      <DialogContent>
        <Grid item md={6} lg={6}>
          <Box mx={2} height={"55vh"} width={"55vw"}>
            <Map
              address={props.searchAddress}
              setAddress={props.setSearchAddress}
              draggable
              setLatLng={props.setLatLng}
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
