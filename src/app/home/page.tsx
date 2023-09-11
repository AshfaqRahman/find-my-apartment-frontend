"use client";
import * as React from "react";
import Image from "next/image";
import { Box, Card, Grid, Typography } from "@mui/material";
import {
  _apartmentTypes,
  _area,
  _baths,
  _beds,
  _budget,
} from "@/static/constants";
import AppBarHomeComponent from "@/components/app-bar-home";
import ToastComponent from "@/mui-components/toast";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { checkAuth } from "./apis";
import Link from "next/link";
import ZoneCard from "@/components/zone-card";
import ApartmentCard from "@/components/apartment-card";
import { ExploreApartments } from "./explore-apis";
import SearchbarHome from "@/components/searchbar-home";
import AppBarComponent from "@/components/app-bar";

function Copyright(props: any) {
  return (
    <Grid
      align="center"
      style={{ backgroundColor: "E6E6E6", fontSize: "14px" }}
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Find My Apartment
      </Link>{" "}
      {new Date().getFullYear()}
    </Grid>
  );
}

export default function Home() {
  const { push } = useRouter();

  let [openToast, setOpenToast] = React.useState(false);
  let [message, setMessage] = React.useState("");
  let [severity, setSeverity] = React.useState("success");

  let [fetchingApartments, setFetchingApartments] = React.useState(false);
  let [apartments, setApartments] = React.useState<any>([]);

  const getApartments = async () => { 
    setFetchingApartments(true);
    
    let data : any = await ExploreApartments();

    // console.log(data);
    console.log(data.data);
    
    // console.log(data.data.apartments);
    // console.log("Maruf");
    
    if (data.success) { 
      setApartments(data.data);
      setSeverity("success");
    } else {
      setSeverity("error");
    }
    
    setOpenToast(true);
    setFetchingApartments(false);
  }
  

  const bgColor = "#E6E6E6";

  return (
    <>
      {/* <AppBarHomeComponent /> */}
      {/* <AppBarComponent/> */}

      <Grid container style={{ paddingBottom: "5px" }}>
        <Grid item md={12} lg={12}>
          <Grid height={"30vh"}>
            <img
              src={"dhaka-view.jpg"}
              // Revoke data uri after image is loaded
              style={{
                zIndex: -1,
                bottom: 0,
                position: "fixed"
              }}
              width={"100%"}
              height={"100%"}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container md={12} style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom:"10vh", paddingBottom:"10vh"}}>
        {/* <h1> Find My Apartment </h1> */}
        <SearchbarHome />
      </Grid>

      <Grid container md={12}>
        <Grid item md={9} style={{ padding: "4px" }}>
          <Card
            style={{
              height: "76.8vh",
              backgroundColor: bgColor,
              marginRight: "0.4vw",
              marginLeft: "0.4vw",
            }}
          >
            <Grid
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: bgColor,
                fontSize: "20px",
                fontFamily: "Tahoma",
              }}
            >
              <h1>Trending Neighbourhood</h1>
            </Grid>

            <Grid container style={{ height: "32.5vh" }}>
              <Grid item xs>
                <ZoneCard
                  cardTitle="Dhanmondi"
                  zoneLink="https://en.wikipedia.org/wiki/Dhanmondi_Thana"
                  imageSrc="/dhanmondi.jpg"
                  imageAlt="Dhanmondi"
                  cardText="A residential and commercial area in Dhaka, Bangladesh, known for its central location and cultural vibrancy."
                />
              </Grid>

              <Grid item xs>
                <ZoneCard
                  cardTitle="Motijheel"
                  zoneLink="https://en.wikipedia.org/wiki/Motijheel_Thana"
                  imageSrc="/motijheel.jpg"
                  imageAlt="Motijheel"
                  cardText="Located in the heart of the city, a central business district and is the downtown and the city centre of Dhaka."
                />
              </Grid>
            </Grid>

            <Grid container style={{ height: "32.5vh" }}>
              <Grid item xs>
                <ZoneCard
                  cardTitle="Gulshan"
                  zoneLink="https://en.wikipedia.org/wiki/Gulshan_Thana"
                  imageSrc="/gulshan.jpg"
                  imageAlt="Gulshan"
                  cardText="An affluent residential and business neighbourhood. Hosts the majority of embassies and high commissions in Bangladesh. "
                />
              </Grid>

              <Grid item xs>
                <ZoneCard
                  cardTitle="Azimpur"
                  zoneLink="https://en.wikipedia.org/wiki/Azimpur,_Dhaka"
                  imageSrc="/azimpur.jpg"
                  imageAlt="Azimpur"
                  cardText="An old region in the old part of Dhaka. In 1950, this area was redesigned as the government employee's residence. "
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item md={3} style={{ paddingTop: "4px" }}>
          <Card
            style={{
              height: "76.8vh",
              backgroundColor: bgColor,
              marginRight: "0.5vw",
            }}
          >
            <Grid
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "20px",
                fontFamily: "Tahoma",
              }}
            >
              <h1>Explore</h1>
            </Grid>

            <Grid style={{ fontFamily: "Tahoma", margin: "10px" }}>
              {/* { getApartments() } */}
              {Array.isArray(apartments) && apartments.map((x: any, idx) => {
                return (
                  <ApartmentCard
                    key={idx}
                    price={x.price}
                    area={x.area_sqft}
                    bedrooms={x.bedrooms}
                    bathrooms={x.washrooms}
                    id={x.id}
                  />
                );
              })}
              {/* <ApartmentCard
                price="18000"
                area="Lalbag"
                bedrooms="3"
                bathrooms="2"
              />
              <ApartmentCard
                price="22000"
                area="Dhanmondi"
                bedrooms="3"
                bathrooms="2"
              />
              <ApartmentCard
                price="22000"
                area="Mohammadpur"
                bedrooms="4"
                bathrooms="2"
              />
              <ApartmentCard
                price="20000"
                area="Gulshan"
                bedrooms="2"
                bathrooms="1"
              />
              <ApartmentCard
                price="15000"
                area="Azimpur"
                bedrooms="3"
                bathrooms="2"
              /> */}
            </Grid>
          </Card>
        </Grid>

        <ToastComponent
          message={message}
          open={openToast}
          onClose={setOpenToast}
          onCross={setOpenToast}
          severity={severity}
        />
      </Grid>
      
      <Grid style={{backgroundColor:"#E6E6E6"}}>
        <Copyright />  
      </Grid>
      
    </>
  );
}
