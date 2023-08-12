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
  const imgSize = 150, wdt = "30vw";
  return (
    <>
      <AppBarComponent>
      </AppBarComponent>
      
      <Grid>  
        <div>
        <Image 
            src="/dhaka-view.jpg" 
            width={1365} height={416}
             
            alt="Apartment"/> 
        </div>
      </Grid>

      <Grid container style={{height:"77vh", backgroundColor: "#D8D8D8"}}>
        <Grid item style={{width:"75vw", backgroundColor: "#D8D8D8"}}>
          <Grid>
            <div style={{backgroundColor: "#D8D8D8"}}>
              <div style={{display: "flex", justifyContent: "center", backgroundColor: "#D8D8D8", fontSize: "25px", fontFamily: "Tahoma"}}>
                <h1>Trending Neighbourhood</h1>
              </div>
            </div>
          </Grid>

          <Grid container>
            <Grid item xs>
              <Card style={{backgroundColor: "#D8D8D8"}}>
                <div style={{display: "flex", justifyContent: "right", width:wdt, margin:"20px",  marginLeft:"45px"}}>
                  <a href="https://en.wikipedia.org/wiki/Dhanmondi_Thana">
                    <div style={{
                      display: "flex", justifyContent: "left", backgroundColor: "#F2F2F2",  borderRadius:"10px", fontFamily:"Tahoma", width:wdt}}>
                      <div>
                        <Image 
                          src="/dhanmondi.jpg" 
                          width={imgSize} height={imgSize}
                          alt="Dhanmondi"/>   
                      </div>
                      <div style={{marginLeft:"40px"}}>
                        <h1>Dhanmondi</h1>
                      </div>
                    </div>  
                  </a>
                </div>
              </Card>
            </Grid>

            <Grid item xs>
              <Card style={{backgroundColor: "#D8D8D8"}}>
                <div style={{display: "flex", justifyContent: "right", width:wdt, margin:"20px",  marginLeft:"55px"}}>
                  <a href="https://en.wikipedia.org/wiki/Motijheel_Thana">
                    <div style={{
                        display: "flex", justifyContent: "left", backgroundColor: "#F2F2F2", borderRadius:"10px", fontFamily:"Tahoma", width:wdt}}>
                      <div>
                        <Image 
                            src="/motijheel.jpg" 
                            width={imgSize} height={imgSize}
                            alt="Motijheel"/>   
                      </div>
                      <div style={{marginLeft:"40px"}}>
                        <h1>Motijheel</h1>
                      </div>
                    </div>
                  </a>
                </div>
              </Card>
            </Grid>
          </Grid>   

          <Grid container>
            <Grid item xs>
              <Card style={{backgroundColor: "#D8D8D8"}}>
                <div style={{display: "flex", justifyContent: "right", width:wdt, margin:"20px",  marginLeft:"45px"}}>
                  <a href="https://en.wikipedia.org/wiki/Azimpur,_Dhaka">
                    <div style={{
                      display: "flex", justifyContent: "left", backgroundColor: "#F2F2F2",  borderRadius:"10px", fontFamily:"Tahoma", width:wdt}}>
                      <div>
                        <Image 
                          src="/azimpur.jpg" 
                          width={imgSize} height={imgSize}
                          alt="Azimpur"/>   
                      </div>
                      <div style={{marginLeft:"40px"}}>
                        <h1>Azimpur</h1>
                      </div>
                    </div>  
                  </a>
                </div>
              </Card>
            </Grid>

            <Grid item xs>
              <Card style={{backgroundColor: "#D8D8D8"}}>
                  <div style={{display: "flex", justifyContent: "right", width:wdt, margin:"20px",  marginLeft:"55px"}}>
                    <a href="https://en.wikipedia.org/wiki/Gulshan_Thana">
                      <div style={{
                          display: "flex", justifyContent: "left", backgroundColor: "#F2F2F2", borderRadius:"10px", fontFamily:"Tahoma", width:wdt}}>
                        <div>
                          <Image 
                              src="/gulshan.jpg" 
                              width={imgSize} height={imgSize}
                              alt="Gulshan"/>   
                        </div>
                        <div style={{marginLeft:"40px"}}>
                          <h1>Gulshan</h1>
                        </div>
                      </div>
                    </a>
                  </div>
              </Card>
            </Grid>
          </Grid>  
        </Grid>

        <Grid item style={{width:"23.75vw", backgroundColor: "red"}}>
          <Grid>
            <div style={{backgroundColor: "#D8D8D8"}}>
              <div style={{display: "flex", justifyContent: "center", backgroundColor: "#D8D8D8", fontSize: "25px", fontFamily: "Tahoma"}}>
                <h1>Explore</h1>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Copyright/>
    </>
  );
}
