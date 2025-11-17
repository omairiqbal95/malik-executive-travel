"use client";

import { useEffect, useMemo, useState } from "react";
import { features } from "@/data/cars";
import { useBookingStore } from "@/store/useBookingStore";
import { GoogleMap, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "250px" }; // map size
const DEFAULT_PICKUP = { lat: 41.3851, lng: 2.1734 };
const DEFAULT_DROPOFF = { lat: 41.4036, lng: 2.1744 };

export default function PassengerDetails() {
  const bookingState = useBookingStore();
  const {
    pickup = { address: "" },
    dropoff = { address: "" },
    date,
    time,
    selectedVehicle,
    passenger = {},
    setPassenger,
    getBasePrice,
    getTotalPrice,
    extras = [],
    setDistance,
    setDuration,
    distance,
    duration
  } = bookingState;

  const [loading, setLoading] = useState(false);
  const [directions, setDirections] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  // Form validation
  const isFormValid =
    passenger.firstName?.trim() &&
    passenger.lastName?.trim() &&
    passenger.email?.trim() &&
    passenger.phone?.trim() &&
    passenger.passengers > 0 &&
    passenger.luggage > 0 &&
    pickup?.address?.trim() &&
    dropoff?.address?.trim() &&
    date &&
    time &&
    selectedVehicle;

  // Handle Stripe checkout
  const handlePayment = async () => {
    if (!isFormValid) return;

    try {
      setPassenger('firstName', passenger.firstName || "");
      setPassenger('lastName', passenger.lastName || "");
      setPassenger('email', passenger.email || "");
      setPassenger('phone', passenger.phone || "");
      setPassenger('passengers', passenger.passengers || 1);
      setPassenger('luggage', passenger.luggage || 1);

      setLoading(true);

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicle: selectedVehicle,
          extras,
          passenger,
          pickup,
          dropoff,
          date,
          time,
          total: getTotalPrice()
        }),
      });

      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Stripe checkout error:", err);
      setLoading(false);
    }
  };

  // Map directions
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

  // Form focus/blur effects
  useEffect(() => {
    const inputs = document.querySelectorAll(
      ".form-comment input, .form-comment textarea, .form-comment select"
    );
    const handleFocus = (e) => e.target.closest(".form-group")?.classList.add("focused");
    const handleBlur = (e) => {
      const input = e.target;
      if (input.value === "") {
        input.classList.remove("filled");
        input.closest(".form-group")?.classList.remove("focused");
      } else {
        input.classList.add("filled");
      }
    };
    inputs.forEach(el => {
      el.addEventListener("focus", handleFocus);
      el.addEventListener("blur", handleBlur);
      if (el.value !== "") {
        el.closest(".form-group")?.classList.add("focused");
        el.classList.add("filled");
      }
    });
    return () => {
      inputs.forEach(el => {
        el.removeEventListener("focus", handleFocus);
        el.removeEventListener("blur", handleBlur);
      });
    };
  }, []);

  const maxPassengers = selectedVehicle?.passenger || 8;
  const maxLuggage = selectedVehicle?.luggage || 10;

  const passengerOptions = useMemo(
    () => Array.from({ length: maxPassengers }, (_, i) => i + 1),
    [maxPassengers]
  );
  const luggageOptions = useMemo(
    () => Array.from({ length: maxLuggage }, (_, i) => i + 1),
    [maxLuggage]
  );

  const formatDate = (d) => d instanceof Date ? d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : (d || "Select date");
  const formatTime = (t) => t?.match(/^\d{1,2}:\d{2}$/) ? t.padStart(5, '0') : (t || "Select time");

  return (
    <div className="box-row-tab mt-50 flex flex-col lg:flex-row gap-6">
      {/* Left Panel: Passenger & Travel Details */}
      <div className="box-tab-left lg:w-1/2">
        <div className="box-content-detail">
          <h3 className="heading-24-medium color-text mb-30 wow fadeInUp">Passenger Details</h3>
          <div className="form-contact form-comment wow fadeInUp">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input
                      className="form-control"
                      type="text"
                      value={passenger.firstName || ""}
                      onChange={(e) => setPassenger('firstName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label">Last Name *</label>
                    <input
                      className="form-control"
                      type="text"
                      value={passenger.lastName || ""}
                      onChange={(e) => setPassenger('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      className="form-control"
                      type="email"
                      value={passenger.email || ""}
                      onChange={(e) => setPassenger('email', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label">Phone *</label>
                    <input
                      className="form-control"
                      type="tel"
                      value={passenger.phone || ""}
                      onChange={(e) => setPassenger('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <h3 className="heading-24-medium color-text mb-30 wow fadeInUp mt-30">Travel Details</h3>
          <div className="form-contact form-comment wow fadeInUp">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label">Passengers *</label>
                    <select
                      className="form-control"
                      value={passenger.passengers || 1}
                      onChange={(e) => setPassenger('passengers', parseInt(e.target.value))}
                      required
                    >
                      {passengerOptions.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label">Luggage *</label>
                    <select
                      className="form-control"
                      value={passenger.luggage || 1}
                      onChange={(e) => setPassenger('luggage', parseInt(e.target.value))}
                      required
                    >
                      {luggageOptions.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="mt-30 mb-120 wow fadeInUp">
            <button
              className="btn btn-primary btn-primary-big w-100"
              onClick={handlePayment}
              disabled={loading || !isFormValid}
            >
              {loading ? "Processing..." : "Continue to Payment"}
            </button>

            {!isFormValid && !loading && (
              <p className="text-red-500 mt-2 text-sm">
                Please fill in all required fields to continue.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel: Ride Summary & Map */}
      <div className="box-tab-right lg:w-1/2 flex flex-col gap-4">
        <div className="sidebar wow fadeInUp">
          <h6 className="text-20-medium color-text mb-4">Ride Summary</h6>
          <ul className="list-routes mb-4">
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

          <ul className="list-icons mb-4">
            <li>
              <span className="icon-item icon-plan"></span>
              <span className="info-location text-14-medium">{formatDate(date)}</span>
            </li>
            <li>
              <span className="icon-item icon-time"></span>
              <span className="info-location text-14-medium">{formatTime(time)}</span>
            </li>
          </ul>

          {selectedVehicle && (
            <div className="box-total-price p-4 bg-light rounded mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Base Price</span>
                <span className="font-medium text-gray-900">€{getBasePrice().toFixed(2)}</span>
              </div>
              {extras.length > 0 && (
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Extras</span>
                  <span className="font-medium text-gray-900">€{(getTotalPrice() - getBasePrice()).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-gray-300 pt-2 mt-2 font-semibold text-lg">
                <span>Total</span>
                <span className="text-gray-900">€{getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          )}

          {isLoaded && (
            <div className="rounded overflow-hidden mb-4">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={pickup?.lat && pickup?.lng ? pickup : DEFAULT_PICKUP}
                zoom={13}
              >
                {directions && <DirectionsRenderer directions={directions} />}
              </GoogleMap>
              <div className="flex justify-between text-sm mt-2">
                <span>Distance: {distance || "~"}</span>
                <span>Time: {duration || "~"}</span>
              </div>
            </div>
          )}

          <ul className="list-ticks list-ticks-small list-ticks-small-booking">
            {features.map((feature, index) => (
              <li key={index} className="text-14 mb-3">{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
