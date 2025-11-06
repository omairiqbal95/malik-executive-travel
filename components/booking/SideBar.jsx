// components/SideBar.jsx (or .tsx)
import React from "react";
import { useBooking } from "@/context/BookingContext"; // Import the hook
import { cars, extras } from "@/data/cars"; // Import car and extra data to get titles/prices

export default function SideBar() {
  const { 
    passengerDetails, 
    selectedVehicle, 
    selectedExtras, 
    date, 
    time, 
    fromLocation, 
    toLocation, 
    flightNumber, 
    notesForDriver, 
    numberOfPassengers, 
    numberOfLuggage,
    calculatedPrice // Get the calculated price from context
  } = useBooking();

  // Helper function to format date (adjust format as needed)
  const formatDate = (dateObj) => {
    if (!dateObj) return "Not selected";
    // Example: "Thu, Oct 06, 2023"
    return dateObj.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Helper function to format time (adjust format as needed)
  const formatTime = (timeStr) => {
    if (!timeStr) return "Not selected";
    // Assuming timeStr is in HH:mm format, you can adjust the display format here if needed
    return timeStr;
  };

  // Get selected vehicle details
  const selectedVehicleDetails = selectedVehicle ? cars.find(car => car.id === selectedVehicle) : null;

  // Calculate total extra price
  const totalExtraPrice = selectedExtras.reduce((total, extra) => {
    const extraData = extras.find(e => e.id === extra.id);
    if (extraData) {
      if (extra.quantity !== undefined) {
        return total + (extraData.price * (extra.quantity || 1));
      } else if (extra.selected) { // For select items
        return total + extraData.price;
      }
    }
    return total;
  }, 0);

  // Calculate base vehicle price (assuming it's per hour/day or fixed)
  const baseVehiclePrice = selectedVehicleDetails ? selectedVehicleDetails.price : 0;

  return (
    <div className="box-tab-right">
      <div className="sidebar">
        <div className="d-flex align-items-center justify-content-between wow fadeInUp">
          <h6 className="text-20-medium color-text">Ride Summary</h6>
          <a
            className="text-14-medium color-text text-decoration-underline"
            href="#"
          >
            Edit
          </a>
        </div>
        <div className="mt-20 wow fadeInUp">
          <ul className="list-routes">
            <li>
              <span className="location-item">A </span>
              <span className="info-location text-14-medium">
                {fromLocation || "Not selected"}
              </span>
            </li>
            <li>
              <span className="location-item">B </span>
              <span className="info-location text-14-medium">
                {toLocation || "Not selected"}
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
            {/* Consider making the map dynamic based on from/to locations, or use a placeholder */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11905.58370691577!2d2.158990777158385!3d41.39020507926246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f75b4dcac9%3A0x24639460200ac820!2sBarcelona%2C%20Spain!5e0!3m2!1sen!2s!4v1730818900000!5m2!1sen!2s"
              style={{ border: "0px", width: "100%", height: "200px" }} // Added width/height
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          {/* Note: Distance and Time might need to be calculated dynamically based on from/to and traffic */}
          {/* For now, showing placeholders or derived from context if available */}
          <div className="box-info-route">
            <div className="info-route-left">
              <span className="text-14 color-grey">Passengers</span>
              <span className="text-14-medium color-text">
                {numberOfPassengers || 1}
              </span>
            </div>
            <div className="info-route-left">
              <span className="text-14 color-grey">Luggage</span>
              <span className="text-14-medium color-text">
                {numberOfLuggage || 1}
              </span>
            </div>
          </div>
          <div className="border-bottom mt-30 mb-25"></div>
          <div className="mt-0">
            <span className="text-14 color-grey">Vehicle</span>
            <br />
            <span className="text-14-medium color-text">
              {selectedVehicleDetails ? selectedVehicleDetails.title : "Not selected"}
            </span>
          </div>
          {selectedExtras.length > 0 && (
            <>
              <div className="border-bottom mt-30 mb-25"></div>
              <div className="mt-0">
                <span className="text-14 color-grey">Extra Options</span>
                <br />
                {selectedExtras.map(extra => {
                  const extraData = extras.find(e => e.id === extra.id);
                  if (!extraData) return null; // Skip if extra data not found

                  if (extra.quantity !== undefined) {
                    return (
                      <span key={extra.id} className="text-14-medium color-text">
                        {extra.quantity} x {extraData.title} - €{(extraData.price * extra.quantity).toFixed(2)}
                        <br />
                      </span>
                    );
                  } else if (extra.selected) { // For select items
                    return (
                      <span key={extra.id} className="text-14-medium color-text">
                        1 x {extraData.title} - €{extraData.price.toFixed(2)}
                        <br />
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="sidebar wow fadeInUp">
        <ul className="list-prices list-prices-2">
          <li>
            <span className="text">Selected vehicle</span>
            <span className="price">€{baseVehiclePrice.toFixed(2)}</span> {/* Display base price */}
          </li>
          <li>
            <span className="text">Extra options</span>
            <span className="price">€{totalExtraPrice.toFixed(2)}</span> {/* Display total extra price */}
          </li>
        </ul>
        <div className="border-bottom mt-30 mb-15"></div>
        <ul className="list-prices">
          <li>
            <span className="text text-20-medium">Total</span>
            <span className="price text-20-medium">€{calculatedPrice.toFixed(2)}</span> {/* Display calculated total from context */}
          </li>
        </ul>
      </div>
    </div>
  );
}