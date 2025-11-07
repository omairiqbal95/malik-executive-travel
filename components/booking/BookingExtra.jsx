"use client";

import { useEffect } from "react";
import { activeInputFocus } from "@/utlis/activeInputFocus";
import Link from "next/link";
import { extras as extrasData, features } from "@/data/cars";
import { useBookingStore } from "@/store/useBookingStore";

export default function BookingExtra() {
  const bookingState = useBookingStore();
  useEffect(() => {
    console.log("Booking store state:", bookingState);
  }, []);

  const { date, time, pickup, dropoff, selectedVehicle, extras, setExtra, removeExtra } = useBookingStore();

  useEffect(() => {
    activeInputFocus();
  }, []);

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

  const getExtraState = (id) => {
    return extras.find(e => e.id === id) || {};
  };

  const handleQuantityChange = (id, newQty) => {
    if (newQty > 0) {
      setExtra(id, { quantity: newQty });
    } else if (newQty === 0) {
      removeExtra(id);
    }
  };

  const handleSelectToggle = (id) => {
    const current = getExtraState(id);
    if (current.selected) {
      removeExtra(id);
    } else {
      setExtra(id, { selected: true });
    }
  };

  const quantityItems = extrasData.filter(item => [1, 2, 4].includes(item.id));
  const selectItems = extrasData.filter(item => [6].includes(item.id));

  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
            Extra Options
          </h3>
          <div className="form-contact form-comment wow fadeInUp">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="flight">
                      Flight/train number
                    </label>
                    <input
                      className="form-control"
                      id="flight"
                      type="text"
                      defaultValue="LH83822"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="list-extras wow fadeInUp">
            {quantityItems.map((elm) => {
              const state = getExtraState(elm.id);
              const qty = state.quantity || 0;
              return (
                <div key={elm.id} className="item-extra">
                  <div className="extra-info">
                    <h5 className="text-20-medium color-text mb-5">
                      {elm.title} <span className="price">€{elm.price}</span>
                    </h5>
                    <p className="text-14 color-grey">{elm.description}</p>
                  </div>
                  <div className="extra-quantity">
                    <span
                      onClick={() => handleQuantityChange(elm.id, qty - 1)}
                      className="minus"
                    ></span>
                    <input
                      className="form-control"
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        handleQuantityChange(elm.id, val);
                      }}
                      type="text"
                      value={qty}
                    />
                    <span
                      onClick={() => handleQuantityChange(elm.id, qty + 1)}
                      className="plus"
                    ></span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-45 wow fadeInUp">
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

          {/* Locations + Vehicle */}
          <div className="mt-20 wow fadeInUp">
            <ul className="list-routes">
              <li className="route-item">
                <span className="location-item">A</span>
                <span className="info-location text-14-medium">
                  {pickup || "Pickup location"}
                </span>
              </li>
              <li className="route-item">
                <span className="location-item">B</span>
                <span className="info-location text-14-medium">
                  {dropoff || "Drop-off location"}
                </span>
              </li>
              {selectedVehicle && (
                <li className="route-item no-arrow">
                  <span className="location-item">V</span>
                  <span className="info-location text-14-medium">
                    {selectedVehicle.title}
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* Date & Time */}
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

          {/* Map & Route Info */}
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

        {/* Features List */}
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