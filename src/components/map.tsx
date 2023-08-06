import { useEffect, useRef, useMemo } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Map(props: any) {
  const address = props.address;
  const mapRef = useRef(null);

  //   const geocoder = useMemo(() => new google.maps.Geocoder(), []);
  // useEffect(() => {
  //   const loader = new Loader({
  //     apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  //     version: "weekly",
  //   });
  //   console.log(loader);
  //   loader.load().then((google) => {
  //     let geocoder = new google.maps.Geocoder();
  //     geocoder.geocode({ address: address }, (results, status) => {
  //       if (status === "OK") {
  //         const map = new google.maps.Map(mapRef.current, {
  //           center: results[0].geometry.location,
  //           zoom: 16,
  //         });
  //         const marker = new google.maps.Marker({
  //           map: map,
  //           position: results[0].geometry.location,
  //         });
  //       } else {
  //         console.error(
  //           `Geocode was not successful for the following reason: ${status}`
  //         );
  //       }
  //     });
  //   });
  // }, [address]);
  return <div style={{ height: "93vh", width: "33.33vw" }} ref={mapRef} />;
}
