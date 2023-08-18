import { useEffect, useRef, useMemo, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Typography } from "@mui/material";
import { _pageHeight } from "@/static/constants";
import { mapLoader } from "@/services/google-map-service";

export default function Map(props: any) {
  let address = props.address;
  const lat = props.lat ? props.lat : 23.8103;
  const lng = props.lng ? props.lng : 90.4125;
  let fromAddress = props.fromAddress;
  let fromLatLng = props.fromLatLng;

  const mapRef = useRef(null);
  useEffect(() => {
    if (fromAddress) {
      const loader = mapLoader;

      loader.importLibrary("geocoding").then(({ Geocoder }) => {
        // console.log("geocoder", geocoder);
        let geocoder = new Geocoder();
        geocoder.geocode({ address }, (results: any, status) => {
          const _lat = results ? results[0].geometry.location.lat() : 23.8103;
          const _lng = results ? results[0].geometry.location.lng() : 90.4125;
          loader.importLibrary("maps").then(({ Map, InfoWindow }) => {
            const map = new Map(mapRef.current, {
              center: {
                lat: _lat,
                lng: _lng,
              },
              zoom: 16,
            });
            if (!results) return;
            let infowindow = new InfoWindow();

            // map.addListener("drag", () => {
            //   console.log("dragging");
            // });

            const image = "/icons8-house-25.png";
            // "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
            loader.importLibrary("marker").then(({ Marker }) => {
              const marker = new Marker({
                map: map,
                position: {
                  lat: _lat,
                  lng: _lng,
                },
                draggable: props.draggable,
                icon: image,
                // label: "H",
                animation: google.maps.Animation.DROP,
              });
              let address = results[0].address_components
                .map((x: any) => x.long_name)
                .join(",");

              let districtIndex = results[0].address_components.findIndex(
                (x: any) => x.types.includes("administrative_area_level_2")
              );
              let divisionIndex = results[0].address_components.findIndex(
                (x: any) => x.types.includes("administrative_area_level_1")
              );
              let zoneIndex = results[0].address_components.findIndex(
                (x: any) => x.types.includes("sublocality_level_1")
              );

              infowindow.setContent(address);
              infowindow.open(map, marker);

              props.setAddress(address);
              props.setLatLng({ lat: _lat, lng: _lng });
              props.setZone(results[0].address_components[zoneIndex].long_name);
              props.setDistrict(
                results[0].address_components[districtIndex].long_name
                  .replace("District", "")
                  .trim()
              );
              props.setDivision(
                results[0].address_components[divisionIndex].long_name
                  .replace("Division", "")
                  .trim()
              );
              marker.addListener("dragend", (event: any) => {
                let _lat: number = +event.latLng.lat();
                let _lng: number = +event.latLng.lng();
                geocoder.geocode(
                  { location: { lat: _lat, lng: _lng } },
                  (results: any, status: any) => {
                    // console.log(results[0]);
                    let address = results[0].address_components
                      .map((x: any) => x.long_name)
                      .join(",");

                    let districtIndex = results[0].address_components.findIndex(
                      (x: any) =>
                        x.types.includes("administrative_area_level_2")
                    );
                    let divisionIndex = results[0].address_components.findIndex(
                      (x: any) =>
                        x.types.includes("administrative_area_level_1")
                    );
                    let zoneIndex = results[0].address_components.findIndex(
                      (x: any) => x.types.includes("sublocality_level_1")
                    );

                    infowindow.setContent(address);
                    infowindow.open(map, marker);
                    props.setAddress(address);
                    props.setLatLng({ lat: _lat, lng: _lng });
                    props.setZone(
                      results[0].address_components[zoneIndex].long_name
                    );
                    props.setDistrict(
                      results[0].address_components[districtIndex].long_name
                        .replace("District", "")
                        .trim()
                    );
                    props.setDivision(
                      results[0].address_components[divisionIndex].long_name
                        .replace("Division", "")
                        .trim()
                    );
                  }
                );
              });
            });
          });
        });
      });
    }
  }, [address]);

  useEffect(() => {
    if (fromLatLng) {
      const loader = mapLoader;
      loader.load().then((google) => {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results: any, status) => {
          const map = new google.maps.Map(mapRef.current, {
            center: {
              lat,
              lng,
            },
            zoom: 16,
          });
          if (!props.lat || !props.lng) return;
          let infowindow = new google.maps.InfoWindow();

          // map.addListener("drag", () => {
          //   console.log("dragging");
          // });

          const image = "/icons8-house-25.png";
          // "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

          const marker = new google.maps.Marker({
            map: map,
            position: {
              lat,
              lng,
            },
            draggable: props.draggable,
            icon: image,
            // label: "H",
            animation: google.maps.Animation.DROP,
          });
          // console.log(results[0])

          infowindow.setContent(
            results[0].address_components.map((x: any) => x.long_name).join(",")
          );
          infowindow.open(map, marker);
        });
      });
    }
  }, [lat, lng]);
  return (
    <div
      style={{ height: props.height, width: props.width }}
      ref={mapRef}
    ></div>
  );
}
