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
import EditIcon from "@mui/icons-material/Edit";
import FacilitiesIconsComponent from "./facilities-icons";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addToWishlist, removeFromWishlist } from "./api/wishlist-api";
import ToastComponent from "@/mui-components/toast";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import { deleteMyApartment, toggleApartmentStatus } from "./api/apartment-api";
import { deleteFile } from "@/services/firebase-config";

export default function Apartment(props: any) {
  let facilities = props.data.facilities;

  let showOnMap = async () => {
    props.setMapLocation();
  };

  let [inWishlist, setInWishlist] = useState(props.data.in_wishlist);
  let [occupied, setOccupied] = useState(props.data.occupied);
  let [deleted, setDeleted] = useState(false);

  let margin = 3;
  let color = "#2ea300";

  const { push } = useRouter();

  let [openToast, setOpenToast] = useState(false);
  let [message, setMessage] = useState("");
  let [severity, setSeverity] = useState("success");

  let addingWishlist = async () => {
    setInWishlist(true);

    let data = await addToWishlist({ apartment_id: props.data.id });
    // console.log(data);
    if (!data.success) {
      setSeverity("error");
      setMessage(data.message);
      setOpenToast(true);
      setInWishlist(false);
    } else {
      setSeverity("success");
      setMessage("Apartment is added in your wishlist");
      setOpenToast(true);
    }
  };

  let removingWishlist = async () => {
    setInWishlist(false);
    let data = await removeFromWishlist({ apartment_id: props.data.id });
    // console.log(data);
    if (!data.success) {
      setSeverity("error");
      setMessage(data.message);
      setOpenToast(true);
      setInWishlist(true);
    } else {
      setSeverity("success");
      setMessage(data.data.message);
      setOpenToast(true);
    }
  };

  let toggleOccupied = async () => {
    if (!props.showOccupied) {
      return;
    }
    setOccupied(!occupied);
    let data = await toggleApartmentStatus({
      apartment_id: props.data.id,
      occupied: !occupied,
    });
    if (!data.success) {
      setSeverity("error");
      setMessage(data.message);
      setOpenToast(true);
    } else {
      setSeverity("success");
      setMessage(data.data.message);
      setOpenToast(true);
    }
  };

  let deleteApartment = async () => {
    if (!props.showDeleteButton) {
      return;
    }

    setDeleted(true);

    let data = await deleteMyApartment({ apartment_id: props.data.id });

    if (!data.success) {
      setSeverity("error");
      setMessage(data.message);
      setOpenToast(true);
    } else {
      let urls = [...props.data.images, props.data.blueprint_url];
      for (const url of urls) {
        await deleteFile(url);
      }
      setSeverity("success");
      setMessage(data.data.message);
      setOpenToast(true);
    }
  };

  return (
    <>
      <ToastComponent
        message={message}
        open={openToast}
        onClose={setOpenToast}
        onCross={setOpenToast}
        severity={severity}
      />
      {deleted ? (
        <></>
      ) : (
        <Card
          sx={{
            display: "flex",
            margin: 3,
            borderRadius: _cardRadius,
          }}
        >
          <CardMedia
            sx={{ width: "50%", cursor: "pointer" }}
            image={props.data.images[0]}
            title="green iguana"
            key={1}
            onClick={() => {
              push("/apartment-details/" + props.data.id);
            }}
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
                  <FontAwesomeIcon
                    icon={faBed}
                    size="xl"
                    style={{ margin: 3 }}
                  />{" "}
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
                          {x}
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
                    {props.showMap ? (
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
                    ) : (
                      <></>
                    )}

                    {props.noWishlist ? (
                      <></>
                    ) : !inWishlist ? (
                      <IconButton
                        size="large"
                        sx={{
                          bgcolor: _color.background_upper,
                          borderRadius: _divRadius,
                          height: "40px",
                          width: "40px",
                        }}
                        onClick={addingWishlist}
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
                        onClick={removingWishlist}
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

                    {props.showEditButton ? (
                      <>
                        <IconButton
                          size="large"
                          sx={{
                            bgcolor: _color.background_upper,
                            borderRadius: _divRadius,
                            height: "40px",
                            width: "40px",
                          }}
                          onClick={() => {
                            push("/edit-apartment/" + props.data.id);
                          }}
                        >
                          <Tooltip title="Edit">
                            <EditIcon />
                          </Tooltip>
                        </IconButton>
                      </>
                    ) : (
                      <></>
                    )}
                    {props.showDeleteButton ? (
                      <>
                        <IconButton
                          size="large"
                          color="error"
                          sx={{
                            bgcolor: _color.background_upper,
                            borderRadius: _divRadius,
                            height: "40px",
                            width: "40px",
                          }}
                          onClick={deleteApartment}
                        >
                          <Tooltip title="Delete">
                            <DeleteIcon />
                          </Tooltip>
                        </IconButton>
                      </>
                    ) : (
                      <></>
                    )}
                    <IconButton
                      size="large"
                      color={occupied ? "success" : "inherit"}
                      sx={{
                        bgcolor: _color.background_upper,
                        borderRadius: _divRadius,
                        height: "40px",
                        width: "40px",
                      }}
                      onClick={toggleOccupied}
                    >
                      <Tooltip title={occupied ? "Occupied" : "Vacant"}>
                        <SensorOccupiedIcon />
                      </Tooltip>
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Box>
          </Grid>
        </Card>
      )}
    </>
  );
}
