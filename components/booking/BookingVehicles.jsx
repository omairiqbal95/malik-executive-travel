"use client";

import React from "react";
import { cars, features } from "@/data/cars";
import Image from "next/image";
import Link from "next/link";
import { useBookingStore } from "@/store/useBookingStore";

// ===== PRICING CONFIG =====
const PRICING = {
  AIRPORT_KEYWORDS: ['airport', 'aeropuerto', 'bcn', 'el prat', 'terminal'],
  AIRPORT_FIXED_PRICE: 55, // €
  CITY_RATE_PER_KM: 1.8, // €/km
  MIN_CITY_FARE: 20, // €
  HOLIDAYS: [
    '2025-01-01', // New Year
    '2025-04-18', // Good Friday
    '2025-04-21', // Easter Monday
    '2025-05-01', // Labour Day
    '2025-08-15', // Assumption
    '2025-10-12', // National Day
    '2025-11-01', // All Saints
    '2025-12-25', // Christmas
    '2026-01-01', // New Year
    '2026-04-10', // Good Friday
    '2026-04-13', // Easter Monday
    // Add more as needed
  ],
};

// Helper: Is location an airport?
const isAirportLocation = (loc) => {
  if (!loc) return false;
  const lower = loc.toLowerCase();
  return PRICING.AIRPORT_KEYWORDS.some(kw => lower.includes(kw));
};

// Helper: Estimate distance (km) — replace later with Google API
const estimateDistanceKm = (pickup, dropoff) => {
  // Simple heuristic: if both in Barcelona, ~5-15 km
  // In real app, call /api/distance?from=...&to=...
  if (!pickup || !dropoff) return 10;
  if (pickup.toLowerCase().includes('barcelona') && dropoff.toLowerCase().includes('barcelona')) {
    return 12; // avg city ride
  }
  return 30; // default fallback
};

// Helper: Get surcharge multiplier
const getSurcharges = (date, time) => {
  let multiplier = 1.0;

  if (!date || !time) return multiplier;

  // Weekend?
  const dayOfWeek = date.getDay(); // 0 = Sun, 6 = Sat
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    multiplier += 0.20;
  }

  // Holiday?
  const dateStr = date.toISOString().split('T')[0]; // "YYYY-MM-DD"
  if (PRICING.HOLIDAYS.includes(dateStr)) {
    multiplier += 0.25;
  }

  // Night?
  const hour = parseInt(time.split(':')[0], 10);
  if (hour >= 22 || hour < 6) {
    multiplier += 0.15;
  }

  // Peak holiday period? (Dec 24 – Jan 1)
  const month = date.getMonth(); // 0 = Jan, 11 = Dec
  const day = date.getDate();
  if (month === 11 && day >= 24) multiplier += 0.30;
  if (month === 0 && day <= 1) multiplier += 0.30;

  return multiplier;
};

// Main pricing function
const calculateBasePrice = (pickup, dropoff, date, time) => {
  // Airport transfer?
  if (isAirportLocation(pickup) || isAirportLocation(dropoff)) {
    return PRICING.AIRPORT_FIXED_PRICE;
  }

  // City ride
  const dist = estimateDistanceKm(pickup, dropoff);
  let price = Math.max(PRICING.MIN_CITY_FARE, dist * PRICING.CITY_RATE_PER_KM);

  // Apply surcharges
  const surchargeMult = getSurcharges(date, time);
  return Math.round(price * surchargeMult * 100) / 100; // round to 2 decimals
};

// Calculate extras total
const calculateExtrasTotal = (extras, extrasData) => {
  return extras.reduce((sum, e) => {
    const item = extrasData.find(x => x.id === e.id);
    if (!item) return sum;
    if (e.quantity != null) return sum + (item.price * (e.quantity || 0));
    if (e.selected) return sum + item.price;
    return sum;
  }, 0);
};

export default function BookingVehicles() {
  const { date, time, pickup, dropoff, setSelectedVehicle } = useBookingStore();

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

  const getVehiclePrice = (car) => {
    return calculateBasePrice(pickup, dropoff, date, time);
  };

  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
            Select Your Car
          </h3>
          <div className="list-vehicles wow fadeInUp">
            {cars.map((elm, i) => {
              const finalPrice = getVehiclePrice(elm);
              return (
                <div key={i} className="item-vehicle wow fadeInUp">
                  <div className="vehicle-left">
                    <div className="vehicle-image">
                      <Image
                        width={1530}
                        height={711}
                        style={{ height: "fit-content" }}
                        src={elm.imgSrc}
                        alt="luxride"
                      />
                    </div>
                    <div className="vehicle-facilities">
                      <div className="text-fact meet-greeting">
                        Meet & Greet included
                      </div>
                      <div className="text-fact free-cancel">
                        Free cancellation
                      </div>
                      <div className="text-fact free-waiting">
                        Free Waiting time
                      </div>
                      <div className="text-fact safe-travel">
                        Safe and secure travel
                      </div>
                    </div>
                  </div>
                  <div className="vehicle-right">
                    <h5 className="text-20-medium color-text mb-10">
                      {elm.title}
                    </h5>
                    <p className="text-14 color-text mb-20">{elm.description}</p>
                    <div className="vehicle-passenger-luggage mb-10">
                      <span className="passenger">{elm.passenger}</span>
                      <span className="luggage">{elm.luggage}</span>
                    </div>
                    <div className="vehicle-price">
                      <h4 className="heading-30-medium color-text">
                        €{finalPrice.toFixed(2)}
                      </h4>
                    </div>
                    <div className="price-desc mb-20">
                      All prices include IVA, fees &amp; tip.
                    </div>
                    <Link
                      className="btn btn-primary w-100"
                      href="/booking-extra"
                      onClick={() => setSelectedVehicle({ ...elm, price: finalPrice })}
                    >
                      Select
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
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== RIDE SUMMARY WITH TOTAL ===== */}
      <div className="box-tab-right">
        <div className="sidebar">
          <div className="d-flex align-items-center justify-content-between wow fadeInUp">
            <h6 className="text-20-medium color-text">Ride Summary</h6>
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