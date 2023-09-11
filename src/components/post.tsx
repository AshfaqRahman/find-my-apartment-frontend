"use client";

import {
  Button,
  Card,
  CardContent,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { _cardRadius, _divRadius } from "@/static/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faShower } from "@fortawesome/free-solid-svg-icons";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import FacilitiesComponent from "./facilities";
import { useRouter } from "next/navigation";

export default function Post(props: any) {
  const { push } = useRouter();

  let contactOwner = () => {
    // needs work
    // console.log(props.data);
    push("/chat?receiver_id=" + props.data.post_owner);
  };

  return (
    <>
      <Card sx={{ margin: 2, borderRadius: _cardRadius }}>
        <CardContent>
          <Grid container>
            <Grid item md={8}>
              <Typography key={2} gutterBottom variant="h5" fontWeight={400}>
                <b>{props.data.post_title}</b>
              </Typography>
            </Grid>

            <Grid
              item
              md={1.5}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Tooltip title={"Area (sq. ft)"}>
                <b>{props.data.area_sqft} sqft </b>
              </Tooltip>
            </Grid>

            <Grid
              item
              md={0.5}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "right",
              }}
            >
              <Tooltip title={"Gender"}>
                {props.data.gender == "Male" ? (
                  <MaleIcon />
                ) : props.data.gender == "Female" ? (
                  <FemaleIcon />
                ) : (
                  <TransgenderIcon />
                )}
              </Tooltip>
            </Grid>
            <Grid
              item
              md={2}
              display={"flex"}
              alignItems={"center"}
              fontSize={"20px"}
              justifyContent={"right"}
            >
              <Tooltip title={"Price"}>
                <b>BDT. {props.data.price}</b>
              </Tooltip>
            </Grid>
          </Grid>

          <Grid style={{ marginTop: "5px", marginBottom: "10px" }}>
            {props.data.post_body}
          </Grid>

          <Grid container>
            <Grid
              item
              md={4}
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <Tooltip title={"Bedrooms"}>
                <FontAwesomeIcon icon={faBed} style={{ margin: 3 }} />
              </Tooltip>{" "}
              &nbsp; <b>{props.data.bedrooms}</b> &nbsp; &nbsp; &nbsp; &nbsp;
              <Tooltip title={"Bathrooms"}>
                <FontAwesomeIcon icon={faShower} style={{ margin: 3 }} />
              </Tooltip>{" "}
              &nbsp; <b>{props.data.bathrooms}</b> &nbsp; &nbsp; &nbsp; &nbsp;
              <Tooltip title={"Roommates"}>
                <PeopleIcon style={{ margin: 3 }} />
              </Tooltip>{" "}
              &nbsp; <b>{props.data.roommates}</b> &nbsp; &nbsp; &nbsp; &nbsp;
              <Tooltip title={"Residents"}>
                <GroupsIcon style={{ margin: 3 }} />
              </Tooltip>{" "}
              &nbsp; <b>{props.data.residents}</b> &nbsp; &nbsp; &nbsp; &nbsp;
            </Grid>

            <Grid
              item
              md={8}
              style={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              <Tooltip title={"Zone"}>
                <>
                  {props.data.location.zone == null ? (
                    <></>
                  ) : (
                    props.data.location.zone
                  )}
                </>
              </Tooltip>
              {props.data.location.zone == null ? "" : ","} &nbsp;
              <Tooltip title={"District"}>
                <>{props.data.location.district}</>
              </Tooltip>
              {","} &nbsp;
              <Tooltip title={"Division"}>
                <>{props.data.location.division}</>
              </Tooltip>
            </Grid>
          </Grid>

          <Card style={{ marginTop: "5px", marginBottom: "7.5px" }}>
            <Grid container style={{ margin: "2px" }}>
              <Grid
                item
                md={1.3}
                style={{ display: "flex", alignItems: "center" }}
              >
                Facilities
              </Grid>
              <Grid
                item
                md={0.2}
                style={{ display: "flex", alignItems: "center" }}
              >
                :
              </Grid>

              <Grid item md={10} lg={10}>
                {props.data.facilities?.map((x: any, idx: number) => {
                  return (
                    <Button
                      key={idx}
                      variant="contained"
                      color="info"
                      sx={{
                        borderRadius: "50px",
                        height: "20px",
                        mr: 1,
                        fontSize: "14px",
                        margin: "5px",
                      }}
                    >
                      {x}
                    </Button>
                  );
                })}
              </Grid>
            </Grid>
          </Card>

          <Card style={{ marginTop: "7.5px", marginBottom: "0px" }}>
            <Grid container style={{ margin: "2px" }}>
              <Grid
                item
                md={1.3}
                style={{ display: "flex", alignItems: "center" }}
              >
                Starpoints
              </Grid>
              <Grid
                item
                md={0.2}
                style={{ display: "flex", alignItems: "center" }}
              >
                :
              </Grid>

              <Grid item md={10} lg={10}>
                {props.data.starpoints?.map((x: any, idx: number) => {
                  return (
                    <Button
                      key={idx}
                      variant="contained"
                      color="info"
                      sx={{
                        borderRadius: "50px",
                        height: "20px",
                        mr: 1,
                        fontSize: "14px",
                        margin: "5px",
                      }}
                    >
                      {x}
                    </Button>
                  );
                })}
              </Grid>
            </Grid>
          </Card>

          <Button
            type="submit"
            onClick={contactOwner}
            fullWidth
            variant="contained"
            onClick={contactOwner}
            sx={{ mt: 2, mb: 1 }}
          >
            Contact Owner
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
