"use client"

import { Box, Button, Card, Grid } from "@mui/material"
import React, { use } from "react";
import SearchBarLocation from "./searchbar-location";
import ApartmentTypesComponent from "./apartment-types";
import Budget from "./budget";
import { searchApartments } from "@/app/advance-search/apis";
import { useRouter } from "next/navigation";

export default function SearchbarHome(props: any) {
    const [apartmentTypes, setApartmentTypes] = React.useState<any>([]);
    const [budget, setBudget] = React.useState<any>([5000, 50000]);

    const [location, setLocation] = React.useState<any>("");
    const [radius, setRadius] = React.useState<number | "">("");
    const [searchAddress, setSearchAddress] = React.useState<any>("");
    const [zone, setZone] = React.useState<any>("");
    const [district, setDistrict] = React.useState<any>("");
    const [division, setDivision] = React.useState<any>("");

    let [fetchingApartments, setFetchingApartments] = React.useState(false);
    let [openToast, setOpenToast] = React.useState(false);
    let [message, setMessage] = React.useState("");
    let [severity, setSeverity] = React.useState("success");
    let [apartments, setApartments] = React.useState([]);

    const { push } = useRouter();
    const router = useRouter();

    const search = async () => {
        setFetchingApartments(true);
        const params = {
          apartmentTypes: apartmentTypes,
          location: location,
          radius: radius,
          price_min: +budget[0],
          price_max: +budget[1],
        };

        // push(
        //     "/advance-search", {
        //         query: {
        //             data: JSON.stringify(params)
        //     }}
        // );

        let data: any = await searchApartments(params);

        push("/advance-search?search_id=" + JSON.stringify(data));
        // if (!data.success) {
        //   setSeverity("error");
        //   setMessage(data.message);
        //   setOpenToast(true);
        //   setFetchingApartments(false);
    
        //   setTimeout(() => {
        //     push("/advance-search");
        //   }, 500);
    
        //   return;
        // }
        // setApartments(data.data);
        // setSeverity("success");
        // setMessage(`${data.data.length} apartments are found`);
        // setOpenToast(true);
        // setFetchingApartments(false);
      };
    
    return (
        <>
            <Grid container style={{display: "flex", justifyContent: "center", alignItems:"center", width: "45vw", height: "35vh", borderRadius:"12px", backgroundColor: "rgba(230, 230, 230, 0.8)"}}>
                <Grid container margin={"10px"} marginTop={"20px"}>
                    <Grid item lg={6} md={6} marginTop={"5px"}>
                        <Budget key={6} budget={budget} setBudget={setBudget}  />
                    </Grid>

                    <Grid item lg={6} md={6} >
                        <Grid container>
                            <Grid item lg={12} md={12} marginBottom={"5px"}>
                                <Box mx={1}>
                                    <ApartmentTypesComponent
                                        value={apartmentTypes}
                                        setValue={setApartmentTypes}
                                    />
                                </Box>
                            </Grid>

                            <Grid item lg={12} md={12} marginTop={"5px"}>
                                <Box px={1}>
                                    <SearchBarLocation
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
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item lg={12} md={12} marginBottom={"10px"} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <Button variant="contained" onClick={search}>
                        Search
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}