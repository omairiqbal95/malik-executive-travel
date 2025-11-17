"use client";

import React, { useEffect, useState } from "react";
import { GoogleMap, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";
import { useBookingStore } from "@/store/useBookingStore";

const containerStyle = { width: "400px", height: "400px" };
const DEFAULT_PICKUP = { lat: 41.3851, lng: 2.1734 };
const DEFAULT_DROPOFF = { lat: 41.4036, lng: 2.1744 };

export default function RideSummaryMap() {
  const { pickup, dropoff, setDistance, setDuration } = useBookingStore();
  const [directions, setDirections] = useState(null);

  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY });

  useEffect(() => {
    if (!isLoaded) return;
    const origin = pickup?.lat && pickup?.lng ? pickup : DEFAULT_PICKUP;
    const destination = dropoff?.lat && dropoff?.lng ? dropoff : DEFAULT_DROPOFF;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route({ origin, destination, travelMode: google.maps.TravelMode.DRIVING }, (result, status) => {
      if (status === "OK" && result) {
        setDirections(result);
        const leg = result.routes[0].legs[0];
        setDistance(leg.distance.text);
        setDuration(leg.duration.text);
      } else {
        setDistance("~");
        setDuration("~");
      }
    });
  }, [pickup, dropoff, isLoaded, setDistance, setDuration]);

  if (!isLoaded) return <p>Loading map...</p>;
  const center = pickup?.lat && pickup?.lng ? pickup : DEFAULT_PICKUP;

  return <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>{directions && <DirectionsRenderer directions={directions} />}</GoogleMap>;
}
