"use client";

import React, { useEffect, useState } from "react";
import { cars, features } from "@/data/cars";
import Image from "next/image";
import Link from "next/link";
import { useBookingStore } from "@/store/useBookingStore";
import RideSummaryMap from "@/components/common/RideSummaryMap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function BookingVehicles() {
  const { date, time, pickup, dropoff, setSelectedVehicle, distance, duration } =
    useBookingStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 575);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatDate = (d) =>
    !d
      ? "Select date"
      : d instanceof Date
      ? d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
      : String(d);
  const formatTime = (t) =>
    !t
      ? "Select time"
      : /^\d{1,2}:\d{2}$/.test(t)
      ? `${t.split(":")[0].padStart(2, "0")}:${t.split(":")[1].padStart(2, "0")}`
      : t;

  const getVehiclePrice = (car) =>
    useBookingStore.getState().calculateBasePrice(pickup, dropoff, date, time);

  const renderCarCard = (elm, i) => {
    const finalPrice = getVehiclePrice(elm);
    return (
      <div key={i} className="item-vehicle wow fadeInUp" style={{ marginBottom: "20px" }}>
        <div className="vehicle-left">
          <div className="vehicle-image">
            <Image width={1530} height={711} style={{ height: "fit-content" }} src={elm.imgSrc} alt="luxride" />
          </div>
          <div className="vehicle-facilities">
            <div className="text-fact meet-greeting">Meet & Greet included</div>
            <div className="text-fact free-cancel">Free cancellation</div>
            <div className="text-fact free-waiting">Free Waiting time</div>
            <div className="text-fact safe-travel">Safe and secure travel</div>
          </div>
        </div>
        <div className="vehicle-right">
          <h5 className="text-20-medium color-text mb-10">{elm.title}</h5>
          <p className="text-14 color-text mb-20">{elm.description}</p>
          <div className="vehicle-passenger-luggage mb-10">
            <span className="passenger">{elm.passenger}</span>
            <span className="luggage">{elm.luggage}</span>
          </div>
          <div className="vehicle-price">
            <h4 className="heading-30-medium color-text">€{finalPrice.toFixed(2)}</h4>
          </div>
          <div className="price-desc mb-20">All prices include IVA, fees &amp; tip.</div>
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"></path>
            </svg>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <h3 className="heading-24-medium color-text mb-30 wow fadeInUp">Select Your Car</h3>

          {/* MOBILE SWIPER */}
          {isMobile ? (
            <Swiper spaceBetween={15} slidesPerView={"auto"} className="mobile-swiper">
              {cars.map((car, i) => (
                <SwiperSlide key={i} style={{ width: "80%", maxWidth: "400px" }}>
                  {renderCarCard(car, i)}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="list-vehicles wow fadeInUp">
              {cars.map((elm, i) => renderCarCard(elm, i))}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="box-tab-right">
        <div className="sidebar">
          <div className="d-flex align-items-center justify-content-between wow fadeInUp">
            <h6 className="text-20-medium color-text">Ride Summary</h6>
          </div>
          <div className="mt-20 wow fadeInUp">
            <ul className="list-routes">
              <li><span className="location-item">A </span><span className="info-location text-14-medium">{pickup?.address || "Pickup location"}</span></li>
              <li><span className="location-item">B </span><span className="info-location text-14-medium">{dropoff?.address || "Drop-off location"}</span></li>
            </ul>
          </div>
          <div className="mt-20 wow fadeInUp">
            <ul className="list-icons">
              <li><span className="icon-item icon-plan"> </span><span className="info-location text-14-medium">{formatDate(date)}</span></li>
              <li><span className="icon-item icon-time"></span><span className="info-location text-14-medium">{formatTime(time)}</span></li>
            </ul>
          </div>
          <div className="mt-20 wow fadeInUp">
            <div className="box-map-route">
              <RideSummaryMap />
            </div>
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
        </div>

        <div className="sidebar wow fadeInUp">
          <ul className="list-ticks list-ticks-small list-ticks-small-booking">
            {features.map((feature, index) => <li key={index} className="text-14 mb-20">{feature}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
