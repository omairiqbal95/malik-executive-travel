"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { features } from "@/data/cars";
import { useBookingStore } from "@/store/useBookingStore";

export default function PassengerDetails() {
  const bookingState = useBookingStore();
  useEffect(() => {
    console.log("Booking store state:", bookingState);
  }, []);

  const {
    pickup,
    dropoff,
    date,
    time,
    selectedVehicle,
    passenger,
    setPassenger,
    getBasePrice,
    getTotalPrice
  } = useBookingStore();

  useEffect(() => {
    const inputs = document.querySelectorAll(
      ".form-comment input, .form-comment textarea, .form-comment select"
    );
    const handleFocus = (e) => {
      e.target.closest(".form-group")?.classList.add("focused");
    };
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

  const passengerOptions = useMemo(() =>
    Array.from({ length: maxPassengers }, (_, i) => i + 1),
    [maxPassengers]
  );

  const luggageOptions = useMemo(() =>
    Array.from({ length: maxLuggage }, (_, i) => i + 1),
    [maxLuggage]
  );

  const formatDate = (d) => {
    if (!d) return "Select date";
    if (d instanceof Date) {
      return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
    return String(d);
  };

  const formatTime = (t) => {
    if (!t) return "Select time";
    if (/^\d{1,2}:\d{2}$/.test(t)) {
      const [h, m] = t.split(':');
      const hh = String(h).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      return `${hh}:${mm}`;
    }
    return t;
  };

  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
            Passenger Details
          </h3>
          <div className="form-contact form-comment wow fadeInUp">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullname">
                      First Name *
                    </label>
                    <input
                      className="form-control"
                      id="fullname"
                      type="text"
                      value={passenger.firstName}
                      onChange={(e) => setPassenger('firstName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="lastname">
                      Last Name *
                    </label>
                    <input
                      className="form-control"
                      id="lastname"
                      type="text"
                      value={passenger.lastName}
                      onChange={(e) => setPassenger('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      value={passenger.email}
                      onChange={(e) => setPassenger('email', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">
                      Phone Number *
                    </label>
                    <input
                      className="form-control"
                      id="phone"
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
          <div className="mt-30"></div>
          <h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
            Travel Details
          </h3>
          <div className="form-contact form-comment wow fadeInUp">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="passengers">
                      Number of Passengers *
                    </label>
                    <select
                      className="form-control"
                      id="passengers"
                      value={passenger.passengers}
                      onChange={(e) => setPassenger('passengers', parseInt(e.target.value))}
                      required
                    >
                      {passengerOptions.map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="luggage">
                      Number of Luggage Pieces *
                    </label>
                    <select
                      className="form-control"
                      id="luggage"
                      value={passenger.luggage}
                      onChange={(e) => setPassenger('luggage', parseInt(e.target.value))}
                      required
                    >
                      {luggageOptions.map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="mt-30 mb-120 wow fadeInUp">
            <Link
              className="btn btn-primary btn-primary-big w-100"
              href="https://calendly.com/gestoriasahel-info/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              Continue to Payment
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

      {/* ===== RIDE SUMMARY WITH TOTAL PRICE ===== */}
      <div className="box-tab-right">
        <div className="sidebar">
          <div className="d-flex align-items-center justify-content-between wow fadeInUp">
            <h6 className="text-20-medium color-text">Ride Summary</h6>
            <a
              className="text-14-medium color-text text-decoration-underline"
              href="/"
            >
              Edit
            </a>
          </div>
          <div className="mt-20 wow fadeInUp">
            <ul className="list-routes">
              <li>
                <span className="location-item">A </span>
                <span className="info-location text-14-medium">
                  {pickup || "Pickup location"}
                </span>
              </li>
              <li>
                <span className="location-item">B </span>
                <span className="info-location text-14-medium">
                  {dropoff || "Drop-off location"}
                </span>
              </li>
              {selectedVehicle && (
                <li>
                  <span className="location-item">V </span>
                  <span className="info-location text-14-medium">
                    {selectedVehicle.title}
                  </span>
                </li>
              )}
            </ul>
          </div>
          <div className="mt-20 wow fadeInUp">
            <ul className="list-icons">
              <li>
                <span className="icon-item icon-plan"> </span>
                <span className="info-location text-14-medium">
                  {formatDate(date)}
                </span>
              </li>
              <li>
                <span className="icon-item icon-time"></span>
                <span className="info-location text-14-medium">
                  {formatTime(time)}
                </span>
              </li>
            </ul>
          </div>

          {/* ===== TOTAL PRICE BLOCK ===== */}
          {selectedVehicle && (
            <div className="mt-20 wow fadeInUp">
              <div className="box-total-price p-3 bg-light rounded">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-16 color-grey">Base Price</span>
                  <span className="text-16-medium color-text">€{getBasePrice().toFixed(2)}</span>
                </div>
                {bookingState.extras.length > 0 && (
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-16 color-grey">Extras</span>
                    <span className="text-16-medium color-text">
                      €{(getTotalPrice() - getBasePrice()).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                  <span className="text-18-medium color-text">Total</span>
                  <span className="text-20-medium color-text">€{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-20 wow fadeInUp">
            <div className="box-map-route">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11905.58370691577!2d2.158990777158385!3d41.39020507926246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f75b4dcac9%3A0x24639460200ac820!2sBarcelona%2C%20Spain!5e0!3m2!1sen!2s!4v1730818900000!5m2!1sen!2s"
                style={{ border: "0px", width: "100%", height: "200px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="box-info-route">
              <div className="info-route-left">
                <span className="text-14 color-grey">Estimated Distance</span>
                <span className="text-14-medium color-text">~15 km</span>
              </div>
              <div className="info-route-left">
                <span className="text-14 color-grey">Estimated Time</span>
                <span className="text-14-medium color-text">~25 mins</span>
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar wow fadeInUp">
          <ul className="list-ticks list-ticks-small list-ticks-small-booking">
            {features.map((feature, index) => (
              <li key={index} className="text-14 mb-20">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}