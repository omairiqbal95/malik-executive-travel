"use client";

import React from "react";
import { cars, features } from "@/data/cars";
import Image from "next/image";
import Link from "next/link";
import { useBookingStore } from "@/store/useBookingStore";

export default function BookingVehicles() {
  const { date, time, pickup, dropoff } = useBookingStore();

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
            Select Your Car
          </h3>
          <div className="list-vehicles wow fadeInUp">
            {cars.map((elm, i) => (
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
                      €{elm.price}
                    </h4>
                  </div>
                  <div className="price-desc mb-20">
                    All prices include IVA, fees &amp; tip.
                  </div>
                  <Link className="btn btn-primary w-100" href="/booking-extra">
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
            ))}
          </div>
        </div>
      </div>
      <div className="box-tab-right">
        <div className="sidebar">
          <div className="d-flex align-items-center justify-content-between wow fadeInUp">
            <h6 className="text-20-medium color-text">Ride Summary</h6>
            {/* TODO: Later, make "Edit" go back to home with prefilled data */}
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
          {/* Map and distance can stay static for now, or enhance later */}
          <div className="mt-20 wow fadeInUp">
            <div className="box-map-route">
              {/* Consider dynamic map later */}
              <iframe
                src="https://www.google.com/maps/embed?pb=..."
                style={{ border: "0px", width: "100%", height: "200px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            {/* Keep estimated distance/time as placeholder for now */}
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