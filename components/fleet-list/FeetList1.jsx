// components/FleetList1.jsx (or .tsx)
"use client";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination"; // Assuming this component exists
import { carBrands, carTypes, cars } from "@/data/cars";
import Image from "next/image";
import Link from "next/link";

export default function FleetList1() {
  const [selectedCarTypes, setSelectedCarTypes] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCars, setSelectedCars] = useState(cars);

  useEffect(() => {
    let items = cars;
    if (selectedCarTypes !== "All") {
      items = items.filter((car) => car.carType === selectedCarTypes);
    }
    if (selectedBrand !== "All") {
      items = items.filter((car) => car.brand === selectedBrand);
    }
    setSelectedCars(items);
  }, [selectedCarTypes, selectedBrand]);

  return (
    <section className="section pt-60 bg-white latest-new-white">
      <div className="container-sub">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-6 text-center text-sm-start mb-30">
            <h2 className="heading-24-medium wow fadeInUp">
              Choose Your Fleet
            </h2>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 text-center text-sm-end mb-30 wow fadeInUp">
            <div className="dropdown dropdown-menu-box">
              <a
                className="dropdown-toggle"
                id="dropdownMenuButton1"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Vehicle Type
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                {carTypes.map((type) => ( // Use 'type' instead of 'elm'
                  <li key={type} onClick={() => setSelectedCarTypes(type)}>
                    <a
                      className={`dropdown-item cursor-pointer ${selectedCarTypes === type ? "car-filter-active" : ""
                        }`}
                    >
                      {type}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown dropdown-menu-box">
              <a
                className="dropdown-toggle"
                id="dropdownMenuButton2"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Vehicle Make
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton2"
              >
                {carBrands.map((brand) => ( // Use 'brand' instead of 'elm'
                  <li key={brand} onClick={() => setSelectedBrand(brand)}>
                    <a
                      className={`dropdown-item cursor-pointer ${selectedBrand === brand ? "car-filter-active" : ""
                        }`}
                    >
                      {brand}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="row mt-30">
          {selectedCars.slice(0, 6).map((car) => ( // Use 'car' instead of 'elm'
            <div key={car.id} className="col-lg-4 mb-30"> {/* Use car.id for key */}
              <div className="cardFleet wow fadeInUp">
                <div className="cardInfo text-center"> {/* Centered info */}
                  <Link href={`/fleet-single/${car.id}`}>
                    <h3 className="text-20-medium color-text mb-5"> {/* Reduced margin */}
                      {car.title}
                    </h3>
                    <p className="text-14 color-text mb-10 text-truncate"> {/* Truncate description */}
                      {car.description}
                    </p>
                  </Link>
                  {/* Added Brand and Price */}
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-14-medium color-primary">{car.brand}</span>
                    <span className="text-16-bold color-text">€{car.price}/hr</span> {/* Example price format */}
                  </div>
                </div>
                <div className="cardImage mb-30">
                  <Link href={`/fleet-single/${car.id}`}>
                    <Image
                      width={1530}
                      height={711}
                      style={{ height: "fit-content", objectFit: "cover" }} // Ensure image fits nicely
                      src={car.imgSrc}
                      alt={`${car.title} - Malik`} // Improved alt text
                    />
                  </Link>
                </div>

                <div className="cardInfoBottom grid grid-cols-2 gap-4 border-t pt-15">
                  <div className="info-item text-center">
                    <span className="icon-circle icon-passenger block mx-auto mb-2">
                      {/* Uses existing CSS class */}
                    </span>
                    <span className="text-14 block">
                      Passengers <span className="block text-16-medium color-text">{car.passenger}</span>
                    </span>
                  </div>
                  <div className="info-item text-center">
                    <span className="icon-circle icon-luggage block mx-auto mb-2">
                      {/* Uses existing CSS class */}
                    </span>
                    <span className="text-14 block">
                      Luggage <span className="block text-16-medium color-text">{car.luggage}</span>
                    </span>
                  </div>
                  <div className="info-item text-center">
                    <span className="icon-circle icon-fuel block mx-auto mb-2">
                      {/* Uses existing CSS class */}
                    </span>
                    <span className="text-14 block">
                      Fuel <span className="block text-16-medium color-text">{car.fuelType}</span>
                    </span>
                  </div>
                  <div className="info-item text-center">
                    <span className="icon-circle icon-type block mx-auto mb-2">
                      {/* Uses existing CSS class */}
                    </span>
                    <span className="text-14 block">
                      Type <span className="block text-16-medium color-text">{car.carType}</span>
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
          {selectedCars.length === 0 && ( // Improved conditional check
            <div className="col-12 text-center"> {/* Centered message */}
              <p className="text-18-medium color-text">No items found. Try another filter.</p>
            </div>
          )}
        </div>
        {/* Optionally add Pagination component here if you want to show more than 6 cars */}
        {/* <Pagination /> */}
      </div>
    </section>
  );
}