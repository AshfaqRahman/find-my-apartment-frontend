"use client"

import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faShower } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function ApartmentCard(props: any) {
    const { push } = useRouter();

    return (
        <>
            <Card style={{height:"5vw", margin:"10px"}}>
                <CardActionArea href={"/apartment-details/" + props.id}>
                    <Grid container md={12}>
                        <Grid item md={6} style={{paddingTop:"7px", paddingLeft:"7px"}}>
                            <Grid style={{fontSize:"20px", marginLeft:"5px"}}>
                            <b>BDT {props.price}</b>
                            </Grid>
                            <Grid style={{fontSize:"16px", marginLeft:"5px"}}>
                            {props.area} sqft
                            </Grid>
                        </Grid>

                        <Grid item md={3}  style={{paddingTop:"20px", paddingLeft:"7px"}}>
                            <Grid style={{fontSize:"16px", marginLeft:"5px"}}>
                                <FontAwesomeIcon icon={faBed} style={{ margin: 3 }} />{" "} {props.bedrooms} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            </Grid>
                        </Grid>

                        <Grid item md={3}  style={{paddingTop:"20px", paddingLeft:"7px"}}>
                            <Grid style={{fontSize:"16px", marginLeft:"5px"}}>
                                <FontAwesomeIcon icon={faShower} style={{ margin: 3 }}/>{" "} {props.bathrooms} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            </Grid>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
        </>
    );
}