"use client"

import FacilitiesComponent from "@/components/facilities";
import KeywordsComponent from "@/components/keywords";
import SelectComponent from "@/mui-components/select";
import TextFieldComponent from "@/mui-components/text-field";
import { Box, Button, Grid, TextField, TextareaAutosize } from "@mui/material";
import React from "react";
import { PostSubmitApi } from "./post-submit-apis";
import { useRouter } from "next/navigation";
import ClearIcon from '@mui/icons-material/Clear';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LocationSearchMapComponent from "@/components/location-search-map-norange";


export default function Post(props: any) {
  const { push } = useRouter();
  
  var [postTitle, setPostTitle] = React.useState("")
  var [postBody, setPostBody] = React.useState("")
  var [gender, setGender] = React.useState("")
  var [residents, setResidents] = React.useState("")
  var [roommates, setRoommates] = React.useState("")
  var [bedrooms, setBedrooms] = React.useState("")
  var [bathrooms, setBathrooms] = React.useState("")
  var [area_sqft, setAreaSqFt] = React.useState("")
  const handleAreaSqft = (e: any) => {
    setAreaSqFt(e.target.value)
  }
  var [price, setPrice] = React.useState("")
  const handlePriceChange = (e: any) => {
    setPrice(e.target.value);
  };
  
  var [facilities, setFacilities] = React.useState([]);
  var [keywords, setKeywords] = React.useState([]);

  const [searchAddress, setSearchAddress] = React.useState<any>("");
  const [radius, setRadius] = React.useState<number | "">("");
  

  const [address, setAddress] = React.useState<any>("");
  const handleAddressChange = (e: any) => {
    setAddress(e.target.value);
  };

  const [zone, setZone] = React.useState<any>("");
  const [district, setDistrict] = React.useState<any>("");
  const [division, setDivision] = React.useState<any>("");
  const [location, setLocation] = React.useState<any>({});

  const [streetNo, setStreetNo] = React.useState<number | "">("");
  const handleStreetNoChange = (e: any) => {
    setStreetNo(e.target.value);
  };
  const [houseNo, setHouseNo] = React.useState<number | "">("");
  const handleHouseNoChange = (e: any) => {
    setHouseNo(e.target.value);
  };

  const [description, setDescription] = React.useState<any>("");
  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const [mapAddress, setMapAddress] = React.useState<any>("");

  let [postSubmtitLoading, setPostSubmtitLoading] = React.useState(false);
  let [openError, setOpenError] = React.useState(false);
  let [openSuccess, setOpenSuccess] = React.useState(false);
  let [message, setMessage] = React.useState("");

  let submitPost = async () => {
    setTimeout(()=> {
        props.setOpenModal(false)
    }, 500)
    setPostSubmtitLoading(true)

    const params = {
        post_data: {
            post_title: postTitle,
            post_body: postBody,
            price: price,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            area_sqft: area_sqft,
            residents: residents,
            roommates: roommates,
            gender: gender,
        },

        keywords: {
          starpoint_ids: keywords,
        },

        facilities: {
          facility_ids: facilities,
        },

        location: {
          detailed_address: address,
          street_no: streetNo,
          house_no: houseNo,
          zone: zone,
          district: district,
          division: division,
          latitude: location.lat,
          longitude: location.lng,
        }
    }
    const response = await PostSubmitApi(params)

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

  const numList = ["1", "2", "3", "4", "5", "6", "7", "8"]
  const genders = ["Male", "Female", "Other"]
  const demoZone = ["Azimpur", "Dhanmondi", "Gulshan", "Motijheel"]
  const demoDistrict = ["Dhaka", "Chattogram", "Sylhet", "Barishal"]

  return (
    <>
        <Grid style={{display:"flex", justifyContent:"center"}} overflow={"auto"}>
            <Box width={"90vw"} minHeight={"70vh"} style={{backgroundColor:"white"}}>
                <Grid container>
                    <Grid container style={{display:"flex", justifyContent:"center", alignItems:"center", paddingTop:"5px", paddingLeft:"10px"}}>
                        <Grid item lg={2} md={2} style={{display:"flex", justifyContent:"center"}}>
                            <Button variant="contained" endIcon={<ClearIcon/>} color="error" onClick={()=>props.setOpenModal(false)}>Cancel</Button>
                        </Grid>

                        <Grid item lg={8} md={8} style={{padding:"10px", paddingTop:"5px", display:"flex", justifyContent:"center", fontFamily:"Lato"}}>
                            <h1> Room Finder </h1>
                        </Grid>
                                
                        <Grid item lg={2} md={2} style={{display:"flex", justifyContent:"center", paddingRight:"0px"}}>
                            <Button variant="contained" onClick={submitPost} endIcon={<PostAddIcon/>}>Post</Button>
                        </Grid>
                    </Grid>

                    <Grid item lg={7.5} md={7.5} >
                        <Grid container>
                            <Grid container>
                                <Grid item lg={9} md={9} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingBottom:"20px", paddingLeft:"20px"}}>
                                    <TextField required label="Title" fullWidth multiline={true} value={postTitle} onChange={(e) => { setPostTitle(e.target.value) }} inputProps={{maxLength: 50}}/>
                                </Grid>

                                <Grid item lg={3} md={3} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingBottom:"20px", paddingLeft:"20px"}}>
                                    <SelectComponent required elements={genders} title={'Gender'} value={gender} handleChange={setGender}/>
                                </Grid>
                            </Grid>

                            <Grid item lg={12} md={12} style={{display:"flex", justifyContent:"center", alignItems:"center",  paddingBottom:"20px", paddingLeft:"20px"}}>
                                <TextField required label="Body" fullWidth multiline={true} value={postBody} onChange={(e) => { setPostBody(e.target.value) }} inputProps={{style: { height: "175px"}, maxLength: 350}}/>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item lg={4.5} md={4.5} >
                        <Grid container>
                            <Grid item lg={6} md={6} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingBottom:"20px", paddingLeft:"20px", paddingRight:"10px"}}>
                                <SelectComponent required elements={numList} title={'Roommates'} value={roommates} handleChange={setRoommates}/>
                            </Grid>

                            <Grid item lg={6} md={6} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingBottom:"20px", paddingLeft:"10px", paddingRight:"20px"}}>
                                <SelectComponent required elements={numList} title={'Residents'} value={residents} handleChange={setResidents}/>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item md={6} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingBottom:"20px", paddingLeft:"20px", paddingRight:"10px"}}>
                                <SelectComponent required elements={numList} title={'Bedrooms'} value={bedrooms} handleChange={setBedrooms}/>
                            </Grid>

                            <Grid item md={6} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingBottom:"20px", paddingLeft:"10px", paddingRight:"20px"}}>
                                <SelectComponent required elements={numList} title={'Bathrooms'} value={bathrooms} handleChange={setBathrooms}/>
                            </Grid>
                        </Grid>
                        
                        <Grid container>
                        <Grid item lg={6} md={6} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingBottom:"20px", paddingLeft:"20px", paddingRight:"10px"}}>
                            <TextFieldComponent required label="Price (BDT)" type="number" value={price} handleChange={handlePriceChange} fullWidth />
                        </Grid>

                        <Grid item lg={6} md={6} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingBottom:"20px", paddingLeft:"10px", paddingRight:"20px"}}>
                            <TextFieldComponent required label="Area (sq. ft)" type="number" value={area_sqft} handleChange={handleAreaSqft} fullWidth />
                        </Grid>
                        </Grid>

                        <Grid container>

                        <Grid item container lg={12} md={12} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingBottom:"20px", paddingLeft:"20px", paddingRight:"30px"}}>
                            <LocationSearchMapComponent
                                required
                                setRadius={setRadius}
                                radius={radius}
                                setLocation={setLocation}
                                searchAddress={searchAddress}
                                setSearchAddress={setSearchAddress}
                                setAddress={setSearchAddress}
                                setDistrict={setDistrict}
                                setDivision={setDivision}
                                setZone={setZone}
                            />
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid container overflow={"auto"}>
                    <Grid item lg={6} md={6} style={{paddingBottom:"20px", paddingLeft:"20px", paddingRight:"10px"}}>
                        <FacilitiesComponent required value={facilities} setValue={setFacilities}/>
                    </Grid>
                    
                    <Grid item lg={6} md={6} style={{paddingBottom:"20px", paddingLeft:"10px", paddingRight:"20px"}}>
                        <KeywordsComponent required value={keywords} setValue={setKeywords} />
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    </>
  );
}