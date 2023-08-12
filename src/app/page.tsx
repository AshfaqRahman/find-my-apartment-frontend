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

import AppBarComponent from "@/components/app-bar-home";
import Link from "next/link";

function Copyright(props:any) {
  return (
    <Grid align="center" style={{backgroundColor:"E6E6E6", fontSize:"14px"}} {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Find My Apartment
      </Link>{' '}
      {new Date().getFullYear()}
    </Grid>
  );
}

export default function Home() {
  const imgSize = 160, wdt = "30vw";
  return (
    <>
      <AppBarComponent>
      </AppBarComponent>
      
      <Grid>  
        <Grid>
        <Image 
            src="/dhaka-view.jpg" 
            width={1365} height={416}
             
            alt="Apartment"/> 
        </Grid>
      </Grid>
      
      <Grid container >
        <Card style={{height:"76.8vh", backgroundColor: "#D8D8D8", width:"75vw", marginRight: "0.4vw", marginLeft: "0.4vw"}}>
          <Grid style={{display: "flex", justifyContent: "center", backgroundColor: "#D8D8D8", fontSize: "20px", fontFamily: "Tahoma"}}>
            <h1>Trending Neighbourhood</h1>
          </Grid>

          <Grid container style={{height:"32.5vh"}}>
            <Grid item xs>
              <Card style={{display: "flex", justifyContent: "right", width:wdt, marginRight:"20px", marginTop:"10px", marginBottom:"0px", marginLeft:"45px", borderRadius:"12px"}}>
                <Link href="https://en.wikipedia.org/wiki/Dhanmondi_Thana">
                  <Grid style={{display: "flex", justifyContent: "left", width:wdt}}>
                    <Grid>
                      <Image 
                        src="/dhanmondi.jpg" 
                        width={imgSize} height={imgSize}
                        alt="Dhanmondi"/>   
                    </Grid>
                    <Grid style={{marginLeft:"40px", fontFamily: "Tahoma"}}>
                      <h2>Dhanmondi</h2>
                    </Grid>
                  </Grid>  
                </Link>
              </Card>
            </Grid>

            <Grid item xs>
              <Card style={{display: "flex", justifyContent: "right", width:wdt, marginRight:"20px", marginTop:"10px", marginBottom:"0px", marginLeft:"55px", borderRadius:"12px"}}>
                <Link href="https://en.wikipedia.org/wiki/Motijheel_Thana">
                  <Grid style={{display: "flex", justifyContent: "left", width:wdt}}>
                    <Grid>
                      <Image 
                          src="/motijheel.jpg" 
                          width={imgSize} height={imgSize}
                          alt="Motijheel"/>   
                    </Grid>
                    <Grid style={{marginLeft:"40px", fontFamily: "Tahoma"}}>
                      <h2>Motijheel</h2>
                    </Grid>
                  </Grid>
                </Link>
              </Card>
            </Grid>
          </Grid>   

          <Grid container style={{height:"32.5vh"}}>
            <Grid item xs>
              <Card style={{display: "flex", justifyContent: "right", width:wdt, marginRight:"20px", marginTop:"0px", marginBottom:"10px", marginLeft:"45px", borderRadius:"12px"}}>
                <Link href="https://en.wikipedia.org/wiki/Azimpur,_Dhaka">
                  <Grid style={{ display: "flex", justifyContent: "left", width:wdt}}>
                    <Grid>
                      <Image 
                        src="/azimpur.jpg" 
                        width={imgSize} height={imgSize}
                        alt="Azimpur"/>   
                    </Grid>
                    <Grid style={{marginLeft:"40px", fontFamily: "Tahoma"}}>
                      <h2>Azimpur</h2>
                    </Grid>
                  </Grid>  
                </Link>
              </Card>
            </Grid>

            <Grid item xs>
              <Card style={{display: "flex", justifyContent: "right", width:wdt, marginRight:"20px", marginTop:"0px", marginBottom:"10px", marginLeft:"55px", borderRadius:"12px"}}>
                <Link href="https://en.wikipedia.org/wiki/Gulshan_Thana">
                  <Grid style={{display: "flex", justifyContent: "left", width:wdt}}>
                    <Grid>
                      <Image 
                          src="/gulshan.jpg" 
                          width={imgSize} height={imgSize}
                          alt="Gulshan"/>   
                    </Grid>
                    <Grid style={{marginLeft:"40px", fontFamily: "Tahoma"}}>
                      <h2>Gulshan</h2>
                    </Grid>
                  </Grid>
                </Link>
              </Card>
            </Grid>
          </Grid>  
        </Card>

        <Card style={{height:"76.8vh", backgroundColor: "#D8D8D8", width:"22.5vw", marginRight: "0.4vw"}}>
          <Grid style={{display: "flex", justifyContent: "center", fontSize: "20px", fontFamily: "Tahoma"}}>
            <h1>Explore</h1>
          </Grid>

          <Grid style={{fontFamily: "Tahoma", margin:"10px"}}>
            <Card style={{height:"5vw", margin:"10px"}}>
              <Grid container>
              <Grid item xs>
                <Grid style={{fontSize:"20px", marginLeft:"5px"}}>
                  <b>BDT 15000</b>
                </Grid>
                <Grid style={{fontSize:"16px", marginLeft:"5px"}}>
                  Area: Badda
                </Grid>
              </Grid>

              <Grid item xs>
                <Grid style={{fontSize:"16px", marginLeft:"5px"}}>
                  Bedroom: 3
                </Grid>
                <Grid style={{fontSize:"16px", marginLeft:"5px"}}>
                  Bathroom: 2
                </Grid>
              </Grid>
              </Grid>
            </Card>
            <Card style={{height:"5vw", margin:"10px"}}>
              <Grid container>
              <Grid item xs>
                <Grid style={{fontSize:"20px", marginLeft:"5px"}}>
                  <b>BDT 15000</b>
                </Grid>
                <Grid style={{fontSize:"16px", marginLeft:"5px"}}>
                  Area: Badda
                </Grid>
              </Grid>

              <Grid item xs>
                <Grid style={{fontSize:"16px", marginLeft:"5px"}}>
                  Bedroom: 3
                </Grid>
                <Grid style={{fontSize:"16px", marginLeft:"5px"}}>
                  Bathroom: 2
                </Grid>
              </Grid>
              </Grid>
            </Card>
            <Card style={{height:"5vw", margin:"10px"}}>
              <Grid container>
              <Grid item xs>
                <Grid style={{fontSize:"20px", marginLeft:"5px"}}>
                  <b>BDT 15000</b>
                </Grid>
                <Grid style={{fontSize:"16px", marginLeft:"5px"}}>
                  Area: Badda
                </Grid>
              </Grid>

              <Grid item xs>
                <Grid style={{fontSize:"16px", marginLeft:"5px"}}>
                  Bedroom: 3
                </Grid>
                <Grid style={{fontSize:"16px", marginLeft:"5px"}}>
                  Bathroom: 2
                </Grid>
              </Grid>
              </Grid>
            </Card>
            <Card style={{height:"5vw", margin:"10px"}}>
              <Grid container>
              <Grid item xs>
                <Grid style={{fontSize:"20px", marginLeft:"5px"}}>
                  <b>BDT 15000</b>
                </Grid>
                <Grid style={{fontSize:"16px", marginLeft:"5px"}}>
                  Area: Badda
                </Grid>
              </Grid>

              <Grid item xs>
                <Grid style={{fontSize:"16px", marginLeft:"5px"}}>
                  Bedroom: 3
                </Grid>
                <Grid style={{fontSize:"16px", marginLeft:"5px"}}>
                  Bathroom: 2
                </Grid>
              </Grid>
              </Grid>
            </Card>
            <Card style={{height:"5vw", margin:"10px"}}>
              <Grid container>
              <Grid item xs>
                <Grid style={{fontSize:"20px", marginLeft:"5px"}}>
                  <b>BDT 15000</b>
                </Grid>
                <Grid style={{fontSize:"16px", marginLeft:"5px"}}>
                  Area: Badda
                </Grid>
              </Grid>

              <Grid item xs>
                <Grid style={{fontSize:"16px", marginLeft:"5px"}}>
                  Bedroom: 3
                </Grid>
                <Grid style={{fontSize:"16px", marginLeft:"5px"}}>
                  Bathroom: 2
                </Grid>
              </Grid>
              </Grid>
            </Card>
          </Grid>
        </Card>
      </Grid>

      <Copyright/>
    </>
  );
}
