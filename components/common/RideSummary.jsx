"use client";

import { useEffect, useState } from "react";
import { GoogleMap, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";
import { useBookingStore } from "@/store/useBookingStore";
import { features } from "@/data/cars";

const containerStyle = { width: "100%", height: "300px" };
const DEFAULT_PICKUP = { lat: 41.3851, lng: 2.1734 };
const DEFAULT_DROPOFF = { lat: 41.4036, lng: 2.1744 };

export default function RideSummary() {
  const {
    pickup, dropoff, selectedVehicle,
    distance, duration, totalPrice,
    setDistance, setDuration
  } = useBookingStore();

  const [directions, setDirections] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (!isLoaded) return;

    const origin = pickup?.lat && pickup?.lng ? pickup : DEFAULT_PICKUP;
    const destination = dropoff?.lat && dropoff?.lng ? dropoff : DEFAULT_DROPOFF;
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      { origin, destination, travelMode: window.google.maps.TravelMode.DRIVING },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
          const leg = result.routes[0].legs[0];
          setDistance(leg.distance.text);
          setDuration(leg.duration.text);
        } else {
          setDistance("~");
          setDuration("~");
        }
      }
    );
  }, [pickup, dropoff, isLoaded, setDistance, setDuration]);

  if (!isLoaded) return <p>Loading map...</p>;
  const center = pickup?.lat && pickup?.lng ? pickup : DEFAULT_PICKUP;

  return (
    <div className="box-tab-right">
      <div className="sidebar">
        <div className="d-flex align-items-center justify-content-between wow fadeInUp">
          <h6 className="text-20-medium color-text">Ride Summary</h6>
          <a className="text-14-medium color-text text-decoration-underline" href="/">Edit</a>
        </div>

        <div className="mt-20 wow fadeInUp">
          <ul className="list-routes">
            <li><span className="location-item">A </span><span className="info-location text-14-medium">{pickup?.address || "Pickup location"}</span></li>
            <li><span className="location-item">B </span><span className="info-location text-14-medium">{dropoff?.address || "Drop-off location"}</span></li>
            {selectedVehicle && <li><span className="location-item">V </span><span className="info-location text-14-medium">{selectedVehicle.title}</span></li>}
          </ul>
        </div>

        <div className="mt-20 wow fadeInUp">
          <ul className="list-icons">
            <li><span className="icon-item icon-plan"> </span><span className="info-location text-14-medium">{pickup?.date || "Select date"}</span></li>
            <li><span className="icon-item icon-time"></span><span className="info-location text-14-medium">{pickup?.time || "Select time"}</span></li>
          </ul>
        </div>

        <div className="mt-20 wow fadeInUp">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
          <div className="box-info-route">
            <div className="info-route-left">
              <span className="text-14 color-grey">Estimated Distance</span>
              <span className="text-14-medium color-text">{distance}</span>
            </div>
            <div className="info-route-left">
              <span className="text-14 color-grey">Estimated Time</span>
              <span className="text-14-medium color-text">{duration}</span>
            </div>
          </div>
        </div>

        {selectedVehicle && (
          <div className="mt-20 wow fadeInUp">
            <div className="box-total-price p-3 bg-light rounded">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-16 color-grey">Base Price</span>
                <span className="text-16-medium color-text">€{selectedVehicle?.price || 0}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                <span className="text-18-medium color-text">Total</span>
                <span className="text-20-medium color-text">€{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="sidebar wow fadeInUp">
          <ul className="list-ticks list-ticks-small list-ticks-small-booking">
            {features.map((feature, index) => <li key={index} className="text-14 mb-20">{feature}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
