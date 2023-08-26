"use client"

import FacilitiesComponent from "@/components/facilities";
import KeywordsComponent from "@/components/keywords";
import SelectComponent from "@/mui-components/select";
import TextFieldComponent from "@/mui-components/text-field";
import { Box, Button, Grid, TextField, TextareaAutosize } from "@mui/material";
import React from "react";
import { PostSubmitApi } from "./post-submit-apis";
import { useRouter } from "next/navigation";


export default function Post(props: any) {
  const { push } = useRouter();

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

  let [postSubmtitLoading, setPostSubmtitLoading] = React.useState(false);
  let [openError, setOpenError] = React.useState(false);
  let [openSuccess, setOpenSuccess] = React.useState(false);
  let [message, setMessage] = React.useState("");

  let submitPost = async () => {
    setPostSubmtitLoading(true)

    const data = {
        post_title: postTitle,
        post_body: postBody,
        ap_type: apType,
        price: price,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        area_sqft: area_sqft,
        zone: zone,
        district: district,
        facilities: facilities,
        keywords: keywords
    }
    const response = await PostSubmitApi(data)

    if (response.success) {
        setMessage("Post added successfully")
        setOpenSuccess(true)
        setTimeout(()=> {
            setPostSubmtitLoading(false)
            push("/room-finder")
        }, 1000)
    } else {
        setPostSubmtitLoading(false)
        setMessage(response.message)
        setOpenError(true)
    }
  }

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
                                <TextField required label="Title" fullWidth multiline={true} value={postTitle} onChange={(e) => { setPostTitle(e.target.value) }}/>
                            </Grid>

                            <Grid item lg={12} md={12} style={{display:"flex", justifyContent:"center", alignItems:"center",  paddingBottom:"20px", paddingLeft:"20px"}}>
                                <TextField required label="Body" fullWidth multiline={true} value={postBody} onChange={(e) => { setPostBody(e.target.value) }} inputProps={{style: { height: "250px"},}}/>
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