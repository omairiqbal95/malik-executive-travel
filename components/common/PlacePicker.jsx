"use client";
import { locations } from "@/data/locations";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function PlacePicker({ value, onChange }) {
  const [inputValue, setInputValue] = useState(value || "");
  const [isActive, setIsActive] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredLocations(locations);
    } else {
      const lowerCaseInput = inputValue.toLowerCase();
      const results = locations.filter(
        (location) =>
          location.placeName.toLowerCase().includes(lowerCaseInput) ||
          location.location.toLowerCase().includes(lowerCaseInput)
      );
      setFilteredLocations(results);
    }
  }, [inputValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsActive(true);
  };

  const handleSelectFromList = (locationName) => {
    setInputValue(locationName);
    onChange(locationName);
    setIsActive(false);
  };

  const handleInputBlur = () => {
    if (inputValue.trim() !== "") {
      onChange(inputValue);
    }
    setIsActive(false);
  };

  const handleInputFocus = () => {
    setIsActive(true);
  };

  return (
    <div className="relative" ref={inputRef}>
      <input
        className="search-input dropdown-location"
        type="text"
        placeholder="Enter or select location..."
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        onClick={() => setIsActive(true)}
      />
      {isActive && (
        <div className="box-dropdown-location absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md overflow-hidden">
          <div className="list-locations max-h-60 overflow-y-auto">
            {inputValue.trim() !== "" &&
              !locations.some(
                (loc) =>
                  loc.placeName.toLowerCase() === inputValue.toLowerCase()
              ) && (
                <div
                  onClick={() => handleSelectFromList(inputValue)}
                  className="item-location p-2 cursor-pointer hover:bg-gray-100 border-b border-gray-200"
                  key="custom-option"
                >
                  <div className="location-info">
                    <h6 className="text-16-medium color-text title-location">
                      Add "{inputValue}" as new location
                    </h6>
                  </div>
                </div>
              )}
            {filteredLocations.length > 0 ? (
              filteredLocations.map((elm) => (
                <div
                  key={elm.id || elm.placeName}
                  onClick={() => handleSelectFromList(elm.placeName)}
                  className="item-location cursor-pointer p-2 hover:bg-gray-100"
                >
                  <div className="location-icon">
                    <Image width={16} height={16} src={elm.icon} alt="luxride" />
                  </div>
                  <div className="location-info">
                    <h6 className="text-16-medium color-text title-location">
                      {elm.placeName}
                    </h6>
                    <p className="text-14 color-grey searchLocations">
                      {elm.location}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="item-location p-2 text-gray-500">
                No locations found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}