"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { features } from "@/data/cars";
import { useBookingStore } from "@/store/useBookingStore";

export default function PassengerDetails() {
  const router = useRouter();
  const bookingState = useBookingStore();
  const {
    pickup,
    dropoff,
    date,
    time,
    selectedVehicle,
    passenger,
    setPassenger,
    getBasePrice,
    getTotalPrice,
    extras
  } = bookingState;

  const [loading, setLoading] = useState(false);

  // Handle Stripe checkout
  const handlePayment = async () => {
  try {
    setPassenger('firstName', passenger.firstName);
  setPassenger('lastName', passenger.lastName);
  setPassenger('email', passenger.email);
  setPassenger('phone', passenger.phone);
    setLoading(true);

    console.log("Store before payment:", {
      pickup,
      dropoff,
      selectedVehicle,
      passenger,
      extras,
      total: getTotalPrice()
    });

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicle: selectedVehicle,
        extras,
        passenger,
        total: getTotalPrice()
      }),
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url; // redirect to Stripe Checkout
    }
  } catch (err) {
    console.error("Stripe checkout error:", err);
    setLoading(false);
  }
};



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
                      value={passenger.firstName}
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
                      value={passenger.lastName}
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
                      value={passenger.email}
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
                      value={passenger.phone}
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
                      value={passenger.passengers}
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
                      value={passenger.luggage}
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
              disabled={loading}
            >
              {loading ? "Processing..." : "Continue to Payment"}
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel: Sidebar with Ride Summary & Total */}
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
