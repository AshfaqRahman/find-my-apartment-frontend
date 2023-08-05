"use client";
import * as React from "react";
import { useCallback, useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import { Box, Grid, Typography } from "@mui/material";
import ButtonComponent from "@/mui-components/buttons";
import MultiSelectComponent from "@/mui-components/multi-select";
import {
  _apartmentTypes,
  _area,
  _baths,
  _beds,
  _budget,
} from "@/static/constants";
import SliderComponent from "@/mui-components/slider";
import TextFieldComponent from "@/mui-components/text-field";
import Budget from "@/components/budget";
import Area from "@/components/area";
import HOST from "@/static/host";
import axios from "axios";
import Apartment from "@/components/apartment";
import SelectComponent from "@/mui-components/select";
import { searchApartments } from "./apis";

const localPath = "advance-search";

export default function Home() {
  const [apartmentTypes, setApartmentTypes] = React.useState(_apartmentTypes);
  const handleApartmentTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setApartmentTypes(
      apartmentTypes.map((x, idx) => {
        if (idx.toString() === event.target.id) {
          return {
            ...x,
            checked: event.target.checked,
          };
        }
        return x;
      })
    );
  };

  const [beds, setBeds] = React.useState(_beds);
  const handleBedsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBeds(
      beds.map((x, idx) => {
        if (idx.toString() === event.target.id) {
          return {
            ...x,
            checked: event.target.checked,
          };
        }
        return x;
      })
    );
  };

  const [baths, setBaths] = React.useState(_baths);
  const handleBathsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBaths(
      baths.map((x, idx) => {
        if (idx.toString() === event.target.id) {
          return {
            ...x,
            checked: event.target.checked,
          };
        }
        return x;
      })
    );
  };

  const [budget, setBudget] = React.useState([10000, 99999]);
  const [area, setArea] = React.useState([500, 10000]);

  let [apartments, setApartments] = React.useState([
    {
      id: 1,
      price: 10000,
      bedrooms: 3,
      baths: 2,
      area_sqft: 1000,
      apartment_type: "Flat",
      address: "Dhaka",
      type: "Family",
    },
    {
      id: 2,
      price: 10000,
      bedrooms: 3,
      baths: 2,
      area_sqft: 1000,
      apartment_type: "Flat",
      address: "Dhaka",
      type: "Family",
    },
  ]);

  let apartmentStatuses = ["Any", "Vacant", "Occupied"];
  let [apartmentStatus, setApartmentStatus] = React.useState("Any");

  const handleApartmentStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setApartmentStatus(event.target.value);
  };

  let orderByes = ["price lowest", "nearest", "latest", "price highest", "preference"];
  let [orderBy, setOrderBy] = React.useState("");

  const handleOrderByChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrderBy(event.target.value);
  };

  const saveSearch = () => {
    console.log("saving search ...");
  };
  

	// const onSearch = =async (data: any) => {
	// 	setSelected(data);
	// };

  const search = async () => {
    // searchApartments()

    console.log("searching ...");
    const url = `${HOST}/apartments`;
    const params = {
      apartmentTypes: apartmentTypes
        .filter((x) => x.checked)
        .map((x) => x.name),
      beds: beds.filter((x) => x.checked).map((x) => x.name),
      baths: baths.filter((x) => x.checked).map((x) => x.name),
      price_min: budget[0],
      price_max: budget[1],
      area_min: area[0],
      area_max: area[1],
    };
    console.log("params: ", params);
    // const data = await axios({
    //   method: "GET",
    //   url: url,
    //   params: params,
    // });
    // console.log(data);


    // setApartments(data.data);
  };

  return (
    <>
      <Grid container spacing={0} key={1}>
        <Grid key={1} container item md={2} sx={{ backgroundColor: "#D8D8D8" }}>
          <Grid key={1} item md={6}>
            <Box sx={{ margin: "10px" }}>
              <ButtonComponent variant="contained" onClick={saveSearch}>
                Save Search
              </ButtonComponent>
            </Box>
          </Grid>
          <Grid key={2} item md={6}>
            <Box sx={{ margin: "10px" }}>
              <ButtonComponent
                variant="contained"
                onClick={search}
              >
                Search
              </ButtonComponent>
            </Box>
          </Grid>
          <Grid key={3} item md={12}>
            <Box sx={{ mx: "10px" }}>
              <MultiSelectComponent
                elements={apartmentTypes}
                title={""}
                handleChange={handleApartmentTypeChange}
              />
            </Box>
          </Grid>
          <Grid key={4} item md={6}>
            <Box sx={{ mx: "10px" }}>
              <MultiSelectComponent
                elements={beds}
                title={"Bedrooms"}
                handleChange={handleBedsChange}
              />
            </Box>
          </Grid>
          <Grid key={5} item md={6}>
            <Box sx={{ margin: "10px" }}>
              <MultiSelectComponent
                elements={baths}
                title={"Baths"}
                handleChange={handleBathsChange}
              />
            </Box>
          </Grid>
          <Budget  key={6}
            budget={budget}
            grid_slider_md={12}
            box_slider_mx={"5px"}
            box_slider_px={"15px"}
            grid_text_md={6}
            box_text_mx={"5px"}
            box_text_px={"0px"}
            setBudget={setBudget}
          />

          <Area  key={7}
            area={area}
            grid_slider_md={12}
            box_slider_mx={"5px"}
            box_slider_px={"15px"}
            grid_text_md={6}
            box_text_mx={"5px"}
            box_text_px={"0px"}
            setArea={setArea}
          />
        </Grid>
        <Grid key={2} container item md={5} sx={{ backgroundColor: "#f5fcf8" }}>
          <Grid  key={1} item md={6}>
            <Box sx={{ margin: "10px" }}>
              <SelectComponent
                title={"Status"}
                elements={apartmentStatuses}
                value={apartmentStatus}
                handleChange={handleApartmentStatusChange}
              />
            </Box>
          </Grid>
          <Grid  key={2} item md={6}>
            <Box sx={{ margin: "10px" }}>
              <SelectComponent
                title={"Order By"}
                elements={orderByes}
                value={orderBy}
                handleChange={handleOrderByChange}
              />
            </Box>
          </Grid>
          <Grid  key={3} item md={12}> 
          {apartments.map((x, idx) => {
            return (
                <Apartment data={x} key={idx} />
            );
          })}
          </Grid>
        </Grid>
        <Grid key={3} item md={5} sx={{ backgroundColor: "#f0f0f0" }}>
          <Typography gutterBottom variant="h1" component="div">
            Map
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
