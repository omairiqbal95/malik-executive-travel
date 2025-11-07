// components/booking/BookingSummary.jsx
"use client";
import { useBookingStore } from "@/store/useBookingStore";
import { features } from "@/data/cars";

export default function BookingSummary() {
  const { pickup, dropoff, date, time, selectedVehicle, totalPrice } = useBookingStore();

  const formatDate = (d) => {
    if (!d || !(d instanceof Date)) return "—";
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (t) => t || "—";

  return (
    <div className="box-tab-right">
      <div className="sidebar">
        <div className="d-flex align-items-center justify-content-between wow fadeInUp">
          <h6 className="text-20-medium color-text">Ride Summary</h6>
          <a className="text-14-medium color-text text-decoration-underline" href="/">
            Edit
          </a>
        </div>
        
        <div className="mt-20 wow fadeInUp">
          <ul className="list-routes">
            <li>
              <span className="location-item">A </span>
              <span className="info-location text-14-medium">{pickup || "Pickup"}</span>
            </li>
            <li>
              <span className="location-item">B </span>
              <span className="info-location text-14-medium">{dropoff || "Dropoff"}</span>
            </li>
            {selectedVehicle && (
              <li>
                <span className="location-item">V </span>
                <span className="info-location text-14-medium">{selectedVehicle.title}</span>
              </li>
            )}
          </ul>
        </div>

        <div className="mt-20 wow fadeInUp">
          <ul className="list-icons">
            <li>
              <span className="icon-item icon-plan"> </span>
              <span className="info-location text-14-medium">{formatDate(date)}</span>
            </li>
            <li>
              <span className="icon-item icon-time"></span>
              <span className="info-location text-14-medium">{formatTime(time)}</span>
            </li>
          </ul>
        </div>

        {/* === TOTAL PRICE === */}
        {selectedVehicle && (
          <div className="mt-20 wow fadeInUp">
            <div className="box-total-price p-3 bg-light rounded">
              <div className="d-flex justify-content-between">
                <span className="text-16 color-grey">Total Price</span>
                <span className="text-20-medium color-text">€{totalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Map & Features — keep as before */}
      </div>
      <div className="sidebar wow fadeInUp">
        <ul className="list-ticks list-ticks-small list-ticks-small-booking">
          {features.map((f, i) => (
            <li key={i} className="text-14 mb-20">{f}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}