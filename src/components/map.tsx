import { useEffect, useRef, useMemo, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Typography } from "@mui/material";
import { _pageHeight } from "@/static/constants";

export default function Map(props: any) {
  const address = props.address;
  const lat = props.lat ? props.lat : 23.8103;
  const lng = props.lng ? props.lng : 90.4125;

  const mapRef = useRef(null);

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    version: "weekly",
  });
  let [map, setMap] = useState({});
  useEffect(() => {
    loader.load().then((google) => {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results: any, status) => {
        console.log(results);
        let lat = results ? results[0].geometry.location.lat() : 23.8103;
        let lng = results ? results[0].geometry.location.lng() : 90.4125;
        const map = new google.maps.Map(mapRef.current, {
          center: {
            lat,
            lng,
          },
          zoom: 16,
        });
        if (
          (!props.lat || !props.lng) &&
          (!props.address || props.address === "")
        )
          return;
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
          draggable: true,
          title: "hello world",
          icon: image,
          // label: "H",
          animation: google.maps.Animation.DROP,
        });
        marker.addListener("dragend", (event: any) => {
          console.log(event.latLng.lat(), event.latLng.lng());
          let _lat: number = +event.latLng.lat();
          let _lng: number = +event.latLng.lng();
          geocoder.geocode(
            { location: { lat: _lat, lng: _lng } },
            (results, status) => {
              console.log(results[0]);

              let address = results[0].address_components.map((x) => x.long_name).join(",")

              infowindow.setContent(
                address
              );
              infowindow.open(map, marker);
              props.setAddress(address);
            }
          );
        });
        // console.log(results[0])

        infowindow.setContent(
          results[0].address_components.map((x) => x.long_name).join(",")
        );
        infowindow.open(map, marker);
        // if (status === "OK") {
        //   const map = new google.maps.Map(mapRef.current, {
        //     center: {
        //       lat,
        //       lng,
        //     },
        //     zoom: 16,
        //   });
        //   const marker = new google.maps.Marker({
        //     map: map,
        //     position: results[0].geometry.location,
        //   });
        // } else {
        //   console.error(
        //     `Geocode was not successful for the following reason: ${status}`
        //   );
        // }
      });
    });
  }, [lat, lng, address]);
  return (
    <div
      style={{ height: props.height, width: props.width }}
      ref={mapRef}
    ></div>
  );
}
