"use client"

import FacilitiesComponent from "@/components/facilities";
import KeywordsComponent from "@/components/keywords";
import SelectComponent from "@/mui-components/select";
import TextFieldComponent from "@/mui-components/text-field";
import { Box, Button, Grid, TextField, TextareaAutosize } from "@mui/material";
import React from "react";


export default function Post(props: any) {
  var [postTitle, setPostTitle] = React.useState("")
  var [postBody, setPostBody] = React.useState("")
  var [apType, setApType] = React.useState("")
  var [bedrooms, setBedrooms] = React.useState("")
  var [bathrooms, setBathrooms] = React.useState("")
  var [area_sqft, setAreaSqFt] = React.useState("")
  var [price, setPrice] = React.useState("")
  var [zone, setZone] = React.useState("")
  var [district, setDistrict] = React.useState("")
  var [facilities, setFacilities] = React.useState([]);
  var [keywords, setKeywords] = React.useState([]);

  const demoNumList = ["1", "2", "3", "4", "5", "6", "7", "8"]
  const demoZone = ["Azimpur", "Dhanmondi", "Gulshan", "Motijheel"]
  const demoDistrict = ["Dhaka", "Chattogram", "Sylhet", "Barishal"]

  return (
    <>
        <Grid style={{display:"flex", justifyContent:"center"}}>
            <Box height={"70vh"} style={{backgroundColor:"white"}}>
                <Grid container>
                    <Grid item lg={12} md={12} style={{padding:"10px", paddingTop:"5px", display:"flex", justifyContent:"center"}}>
                        <h1> Room Finder </h1>
                    </Grid>

                    <Grid item lg={6} md={6} >
                        <Grid container>
                            <Grid item lg={12} md={12} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingBottom:"20px", paddingLeft:"20px"}}>
                                <TextField required label="Title" fullWidth multiline={true} value={postTitle}/>
                            </Grid>

                            <Grid item lg={12} md={12} style={{display:"flex", justifyContent:"center", alignItems:"center",  paddingBottom:"20px", paddingLeft:"20px"}}>
                                <TextField required label="Body" fullWidth multiline={true} value={postBody} inputProps={{style: { height: "250px"},}}/>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item lg={6} md={6} >
                        <Grid container>
                            <Grid item md={4} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingBottom:"20px", paddingLeft:"20px", paddingRight:"10px"}}>
                                <SelectComponent required elements={['Bachelor', 'Sublet']} title={'Type'} value={apType} setValue={setApType}/>
                            </Grid>

                            <Grid item md={4} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingBottom:"20px", paddingLeft:"10px", paddingRight:"10px"}}>
                                <SelectComponent required elements={demoNumList} title={'Bedrooms'} value={bedrooms} setValue={setBedrooms}/>
                            </Grid>

                            <Grid item md={4} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingBottom:"20px", paddingLeft:"10px", paddingRight:"20px"}}>
                                <SelectComponent required elements={demoNumList} title={'Bathrooms'} value={bathrooms} setValue={setBathrooms}/>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item md={4} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingBottom:"20px", paddingLeft:"20px", paddingRight:"10px"}}>
                                <TextFieldComponent required label="Area (sq. ft)" type="number" value={area_sqft} setValue={setAreaSqFt} fullWidth />
                            </Grid>

                            <Grid item md={4} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingBottom:"20px", paddingLeft:"10px", paddingRight:"10px"}}>
                                <SelectComponent required elements={demoZone} title={'Zone'} value={zone} setValue={setZone}/> 
                            </Grid>

                            <Grid item md={4} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingBottom:"20px", paddingLeft:"10px", paddingRight:"20px"}}>
                                <SelectComponent required elements={demoDistrict} title={'District'} value={district} setValue={setDistrict}/>
                            </Grid>
                        </Grid>

                        <Grid item lg={12} md={12} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingBottom:"20px", paddingLeft:"20px", paddingRight:"20px"}}>
                            <TextFieldComponent required label="Price (BDT)" type="number" value={price} setValue={setPrice} fullWidth />
                        </Grid>

                        <Grid container>
                            <Grid item lg={6} md={6} style={{paddingBottom:"20px", paddingLeft:"20px", paddingRight:"20px"}}>
                                <FacilitiesComponent value={facilities} setValue={setFacilities} />
                            </Grid>
                            
                            <Grid item lg={6} md={6} style={{paddingBottom:"20px", paddingLeft:"20px", paddingRight:"20px"}}>
                                <KeywordsComponent value={keywords} setValue={setKeywords} />
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item lg={6} md={6} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingTop:"18px"}}>
                                <Button variant="contained"  onClick={()=>props.setOpenModal(false)}>Cancel</Button>
                            </Grid>
                            
                            <Grid item lg={6} md={6} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingTop:"18px"}}>
                                <Button variant="contained">Post</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    </>
  );
}