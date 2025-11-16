"use client";

import { useEffect, useState } from "react";
import { extras as extrasData, features } from "@/data/cars";
import { useBookingStore } from "@/store/useBookingStore";
import { GoogleMap, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";
import Link from "next/link";
const containerStyle = { width: "100%", height: "300px" };
const DEFAULT_PICKUP = { lat: 41.3851, lng: 2.1734 };
const DEFAULT_DROPOFF = { lat: 41.4036, lng: 2.1744 };

export default function BookingExtra() {
  const [flightNumber, setFlightNumber] = useState("");
  const [directions, setDirections] = useState(null);

  const pickup = useBookingStore(state => state.pickup);
  const dropoff = useBookingStore(state => state.dropoff);
  const selectedVehicle = useBookingStore(state => state.selectedVehicle);
  const extras = useBookingStore(state => state.extras);
  const distance = useBookingStore(state => state.distance);
  const duration = useBookingStore(state => state.duration);
  const setExtra = useBookingStore(state => state.setExtra);
  const removeExtra = useBookingStore(state => state.removeExtra);
  const setDistance = useBookingStore(state => state.setDistance);
  const setDuration = useBookingStore(state => state.setDuration);
  const setExtrasData = useBookingStore(state => state.setExtrasData);
  const getBasePrice = useBookingStore(state => state.getBasePrice);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (!extrasData) {
      import("@/data/cars").then(mod => setExtrasData(mod.extras));
    }
  }, [setExtrasData]);

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

  const getExtraState = id => extras.find(e => e.id === id) || {};
  const handleQuantityChange = (id, newQty) =>
    newQty > 0 ? setExtra(id, { quantity: newQty }) : removeExtra(id);

  const quantityItems = extrasData?.filter(item => [1, 2, 4].includes(item.id)) || [];

  return (
    <div className="box-row-tab mt-50 flex flex-col lg:flex-row gap-6">
      {/* Left Panel: Extra Options */}
      <div className="box-tab-left lg:w-1/2">
        <div className="box-content-detail">
          <h3 className="heading-24-medium color-text mb-30 wow fadeInUp">Extra Options</h3>

          <form className="form-contact form-comment wow fadeInUp" onSubmit={e => e.preventDefault()}>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="form-label" htmlFor="flight">Flight/train number</label>
                  <input
                    className="form-control"
                    id="flight"
                    type="text"
                    value={flightNumber}
                    onChange={e => setFlightNumber(e.target.value)}
                    placeholder=""
                    onFocus={e => (e.target.placeholder = "")}
                    onBlur={e => { if (!flightNumber) e.target.placeholder = ""; }}
                  />
                </div>
              </div>
            </div>
          </form>

          <div className="list-extras wow fadeInUp mt-1">
            {quantityItems.map(elm => {
              const state = getExtraState(elm.id);
              const qty = state.quantity || 0;
              const totalPrice = elm.price * qty;

              return (
                <div key={elm.id} className="item-extra mb-3">
                  <div className="extra-info-row">
                    <div className="extra-info">
                      <h5>
                        {elm.title} <span className="price">€{totalPrice.toFixed(2)}</span>
                      </h5>
                    </div>
                    <div className="extra-quantity">
                      <span className="minus" onClick={() => handleQuantityChange(elm.id, qty - 1)}>-</span>
                      <input
                        type="text"
                        value={qty}
                        onChange={e => handleQuantityChange(elm.id, parseInt(e.target.value) || 0)}
                      />
                      <span className="plus" onClick={() => handleQuantityChange(elm.id, qty + 1)}>+</span>
                    </div>
                  </div>
                  <p>{elm.description}</p>
                </div>
              );
            })}
            {/* Notes for the chauffeur */}
            <div className="mt-4 wow fadeInUp">
              <div className="form-contact form-comment">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="notes">
                          Notes for the chauffeur
                        </label>
                        <textarea
                          defaultValue={``}
                          className="form-control"
                          id="notes"
                          rows="5"
                          placeholder=""
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="mt-30 mb-120 wow fadeInUp">
              <Link
                className="btn btn-primary btn-primary-big w-100"
                href="/booking-passenger"
              >
                Continue
                <svg
                  className="icon-16 ml-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  ></path>
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </div>

      <div className="box-tab-right lg:w-1/2 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Ride Summary Column */}
          <div className="flex-1 bg-white p-4 rounded shadow wow fadeInUp">
            <h6 className="text-20-medium color-text mb-3">Ride Summary</h6>
            <ul className="list-routes">
              <li>
                <span className="location-item">A </span>
                <span className="info-location text-14-medium">{pickup?.address || "Pickup location"}</span>
              </li>
              <li>
                <span className="location-item">B </span>
                <span className="info-location text-14-medium">{dropoff?.address || "Drop-off location"}</span>
              </li>
              {selectedVehicle && (
                <li>
                  <span className="location-item">V </span>
                  <span className="info-location text-14-medium">{selectedVehicle.title}</span>
                </li>
              )}
            </ul>

            <ul className="list-icons mt-4">
              <li>
                <span className="icon-item icon-plan"></span>
                <span className="info-location text-14-medium">{pickup?.date || "Select date"}</span>
              </li>
              <li>
                <span className="icon-item icon-time"></span>
                <span className="info-location text-14-medium">{pickup?.time || "Select time"}</span>
              </li>
            </ul>
          </div>

          {/* Map + Pricing Column */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Map */}
            {isLoaded && (
              <div className="rounded overflow-hidden wow fadeInUp">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={pickup?.lat && pickup?.lng ? pickup : DEFAULT_PICKUP}
                  zoom={13}
                >
                  {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
                <div className="box-info-route flex justify-between mt-2 text-sm">
                  <span>Distance: <span className="font-medium">{distance}</span></span>
                  <span>Time: <span className="font-medium">{duration}</span></span>
                </div>
              </div>
            )}

            {/* Pricing */}
            {selectedVehicle && (
              <div className="bg-light p-4 rounded shadow">
                <div className="d-flex justify-between mb-2">
                  <span className="text-16 color-grey">Base Price</span>
                  <span className="text-16-medium color-text">€{getBasePrice().toFixed(2)}</span>
                </div>

                {extras.length > 0 && extras.map(e => {
                  const data = extrasData.find(d => d.id === e.id);
                  return (
                    <div key={e.id} className="d-flex justify-between mb-2">
                      <span>{data?.title} x{e.quantity || 1}</span>
                      <span>€{((data?.price || 0) * (e.quantity || 1)).toFixed(2)}</span>
                    </div>
                  );
                })}

                <div className="d-flex justify-between mt-3 pt-2 border-t-2 font-semibold text-lg">
                  <span>Total</span>
                  <span>
                    €{(getBasePrice() + extras.reduce((acc, e) => {
                      const data = extrasData.find(d => d.id === e.id);
                      return acc + ((data?.price || 0) * (e.quantity || 1));
                    }, 0)).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features (underneath columns) */}
        <div className="sidebar wow fadeInUp">
          <ul className="list-ticks list-ticks-small list-ticks-small-booking">
            {features.map((feature, index) => (
              <li key={index} className="text-14 mb-20">{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
