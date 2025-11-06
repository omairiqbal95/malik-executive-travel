
// components/BookingExtra.jsx (or .tsx)
"use client";
import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { activeInputFocus } from "@/utlis/activeInputFocus";
import Link from "next/link";
import { extras } from "@/data/cars"; // Import the extras array

export default function BookingExtra() {
  // Initialize state with the imported extras array
  const [extraItems, setExtraItems] = useState(() =>
    extras.map(item => ({
      ...item,
      // Add a quantity field for items that should have one (e.g., seats, flowers)
      // Assuming items needing quantity are those with IDs 1, 2, 4 based on previous structure
      // A more robust way would be to add a 'type' field to the data (e.g., 'quantity', 'select')
      quantity: [1, 2, 4].includes(item.id) ? 1 : undefined, // Default quantity to 1 for relevant items, undefined otherwise
      selected: [6].includes(item.id) // Default selected state for items needing selection (e.g., ID 6)
    }))
  );

  // Handle quantity changes for items that have a quantity input
  const handleQuantityChange = (id, newQty) => {
    if (newQty >= 0) { // Allow 0 quantity
      setExtraItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  // Handle selection for items that have a select button
  const handleSelectToggle = (id) => {
    setExtraItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  useEffect(() => {
    // Focus event
    activeInputFocus();
  }, []);

  // Separate items that need quantity input from those that need selection
  const quantityItems = extraItems.filter(item => item.quantity !== undefined);
  const selectItems = extraItems.filter(item => item.selected !== undefined);

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
            {/* Render items that have a quantity input */}
            {quantityItems.map((elm) => (
              <div key={elm.id} className="item-extra"> {/* Use elm.id for key */}
                <div className="extra-info">
                  <h5 className="text-20-medium color-text mb-5">
                    {elm.title} <span className="price">€{elm.price}</span> {/* Use elm.title */}
                  </h5>
                  <p className="text-14 color-grey">{elm.description}</p> {/* Use elm.description */}
                </div>
                <div className="extra-quantity">
                  <span
                    onClick={() => handleQuantityChange(elm.id, elm.quantity - 1)}
                    className="minus"
                  >
                    {" "}
                  </span>
                  <input
                    className="form-control"
                    onChange={(e) => handleQuantityChange(elm.id, parseInt(e.target.value) || 0)}
                    type="text"
                    value={elm.quantity}
                  />
                  <span
                    onClick={() => handleQuantityChange(elm.id, elm.quantity + 1)}
                    className="plus"
                  ></span>
                </div>
              </div>
            ))}
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
              href="/booking-passenger" // Adjust link as needed
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
      <SideBar />
    </div>
  );
}