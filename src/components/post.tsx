"use client"

import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { _cardRadius, _divRadius } from "@/static/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faShower } from "@fortawesome/free-solid-svg-icons";
import FacilitiesComponent from "./facilities";


export default function Post(props: any) {
    let contactOwner = () => {
        
        // needs work
    };

  return (
    <>
      <Card sx={{ margin: 2, borderRadius: _cardRadius }}>
        <CardContent>
            <Grid container>
                <Grid item md={8}>
                    <Typography key={2} gutterBottom variant="h5" component="div" fontWeight={400}>
                        <b>{props.data.post_title}</b>
                    </Typography>
                </Grid>
                <Grid item md={4} display={"flex"} alignItems={"center"} fontSize={"20px"}  justifyContent={"right"}>
                    <b>BDT. {props.data.price}</b> 
                </Grid>
            </Grid>

            <Grid style={{marginTop:"5px", marginBottom:"10px"}}>
                {props.data.post_body}
            </Grid>
            
            <Grid container>
                <Grid item md={3} style={{display:"flex", justifyContent:"left"}}>
                    <b>{props.data.type}</b>  
                </Grid>

                <Grid item md={3} style={{display:"flex", justifyContent:"left"}}>
                    <FontAwesomeIcon icon={faBed} style={{ margin: 3 }} />{" "} <b>{props.data.bedrooms}</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <FontAwesomeIcon icon={faShower} style={{ margin: 3 }} />{" "} <b>{props.data.bathrooms}</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </Grid>

                <Grid item md={3} style={{display:"flex", justifyContent:"center"}}>
                    {props.data.area_sqft} sqft 
                </Grid>

                <Grid item md={3} style={{display:"flex", justifyContent:"right"}}>
                    {props.data.zone}{", "}{props.data.district} 
                </Grid> 
            </Grid>

            <Card style={{marginTop:"5px", marginBottom:"7.5px"}}>
                <Grid container style={{margin:"2px"}}>
                    <Grid item md={1.3} style={{display:"flex", alignItems:"center"}}>
                        Facilities
                    </Grid>
                    <Grid item md={0.2} style={{display:"flex", alignItems:"center"}}>
                        :
                    </Grid>

                    {/* <Grid item md={10} lg={10}>
                        <FacilitiesComponent facilities={props.data.facilities} />
                    </Grid> */}
                    
                    {/* <Grid item md={10} lg={10}>
                        {props.data.facilities.map((x: any, idx: number) => {
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
                    </Grid> */}
                </Grid>
            </Card>

            <Card style={{marginTop:"7.5px", marginBottom:"0px"}}>
                <Grid container style={{margin:"2px"}}>
                    <Grid item md={1.3}  style={{display:"flex", alignItems:"center"}}>
                        Starpoints
                    </Grid>
                    <Grid item md={0.2} style={{display:"flex", alignItems:"center"}}>
                        :
                    </Grid>
                    
                    {/* <Grid item md={10} lg={10}>
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
                                fontSize: "14px",
                                margin: "5px"
                                }}
                            >
                                {x}
                            </Button>
                            );
                        })}
                    </Grid> */}
                </Grid>
            </Card>
 
            <Button
                type="submit"
                onClick={contactOwner}
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
                >
                Contact Owner
            </Button>
        </CardContent>
      </Card>
    </>
  );
}
