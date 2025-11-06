// components/PassengerDetails.jsx (or .tsx)
"use client";
import React, { useEffect } from "react";
import SideBar from "./SideBar";
import Link from "next/link";

export default function PassengerDetails() {
  useEffect(() => {
    // Focus event
    document
      .querySelectorAll(
        ".form-comment input, .form-comment textarea, .form-comment select"
      )
      ?.forEach(function (element) {
        element?.addEventListener("focus", function () {
          this?.closest(".form-group").classList.add("focused");
        });
      });

    // Blur event
    document
      .querySelectorAll(
        ".form-comment input, .form-comment textarea, .form-comment select"
      )
      ?.forEach(function (element) {
        element.addEventListener("blur", function () {
          var inputValue = this.value;
          if (inputValue === "") {
            this.classList.remove("filled");
            this.closest(".form-group").classList.remove("focused");
          } else {
            this.classList.add("filled");
          }
        });
      });

    // Check for pre-filled inputs
    document
      .querySelectorAll(
        ".form-comment input, .form-comment textarea, .form-comment select"
      )
      ?.forEach(function (element) {
        if (element?.value !== "") {
          element?.closest(".form-group").classList.add("focused");
          element.classList.add("filled");
        }
      });
  }, []);

  // Example: Pre-populate passenger/luggage counts based on selected car from previous step
  // This would require state management across pages, e.g., using Context API or passing props
  // For now, using placeholder logic or defaulting to empty
  const initialPassengerCount = 1; // e.g., from context or props
  const initialLuggageCount = 1; // e.g., from context or props

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
                      defaultValue=""
                      required // Added required for validation
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
                      defaultValue=""
                      required // Added required for validation
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
                      type="email" // Changed to email type for better validation
                      defaultValue=""
                      required // Added required for validation
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
                      type="tel" // Changed to tel type for phone numbers
                      defaultValue=""
                      required // Added required for validation
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
                      defaultValue={initialPassengerCount} // Use initial value
                      required // Added required for validation
                    >
                      {/* Dynamically generate options based on selected car capacity if available */}
                      {/* For now, using a reasonable range */}
                      {[...Array(8)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
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
                      defaultValue={initialLuggageCount} // Use initial value
                      required // Added required for validation
                    >
                      {/* Dynamically generate options based on selected car capacity if available */}
                      {/* For now, using a reasonable range */}
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Removed the Notes for the Driver section */}
              </div>
            </form>
          </div>
          <div className="mt-30 mb-120 wow fadeInUp">
            <Link
              className="btn btn-primary btn-primary-big w-100"
              href="/booking-payment"
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
      <SideBar />
    </div>
  );
}