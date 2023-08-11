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
      geocoder.geocode({ location: {lat, lng} }, (results, status) => {
        const map = new google.maps.Map(mapRef.current, {
          center: {
            lat,
            lng,
          },
          zoom: 16,
        });
        if(!props.lat || !props.lng) return;
        let infowindow = new google.maps.InfoWindow ();

        const image = "/icons8-house-25.png"
    // "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  
        const marker = new google.maps.Marker({
          map: map,
          position: {
            lat,
            lng
          },
          title: "hello world",
          icon: image,
          // label: "H",
          animation: google.maps.Animation.DROP,
        });
        // console.log(results[0])

        infowindow.setContent(results[0].address_components.map(x => x.long_name).join(','));
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
  return <div style={{ height: props.height, width: props.width }}  ref={mapRef}>
  </div>;
}
