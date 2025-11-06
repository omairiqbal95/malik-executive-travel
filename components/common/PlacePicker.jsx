"use client";
import { locations } from "@/data/locations";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function PlacePicker() {
  const [inputValue, setInputValue] = useState(""); // Changed from selectedLocation to inputValue
  const [isActive, setIsActive] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState(locations); // For filtered list
  const [selectedLocation, setSelectedLocation] = useState(locations[0].placeName); // Keep track of selected from list
  const inputRef = useRef(null); // Use null for initial value

  // Filter locations based on input value
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

  // Handle clicks outside the input/dropdown to close it
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
    setInputValue(e.target.value);
    setIsActive(true); // Open dropdown when user starts typing
  };

  const handleSelectFromList = (locationName) => {
    setInputValue(locationName); // Set input to the selected name
    setSelectedLocation(locationName); // Update selected state
    setIsActive(false); // Close dropdown
  };

  const handleInputBlur = () => {
    // If the user types something that doesn't match a list item,
    // you might want to save that as the selected location.
    // For now, let's just close the dropdown if it doesn't match exactly.
    // Or, you could set the selectedLocation to the inputValue if it's not in the list.
    // Option 1: Only keep it if it matches a list item
    // const matchedLocation = locations.find(loc => loc.placeName === inputValue);
    // if (matchedLocation) {
    //   setSelectedLocation(matchedLocation.placeName);
    // } else {
    //   // Optionally reset to the last selected from list or clear it
    //   setInputValue(selectedLocation); // Or setInputValue('') to clear
    // }

    // Option 2: Allow any input value to be the selected location
    if (inputValue.trim() !== "") {
      setSelectedLocation(inputValue); // Save whatever the user typed as the selected value
    } else {
      // If input is empty on blur, maybe revert to the last selected from the list or a default
      setInputValue(selectedLocation);
    }
    setIsActive(false); // Close dropdown on blur
  };

  const handleInputFocus = () => {
    setIsActive(true); // Open dropdown when input is focused
  };

  return (
    <div className="relative" ref={inputRef}> {/* Wrapper for positioning */}
      <input
        ref={inputRef}
        className="search-input dropdown-location"
        onClick={() => setIsActive(true)} // Open dropdown on click
        type="text"
        placeholder="Enter or select location..." // Add a placeholder
        value={inputValue} // Use inputValue state
        onChange={handleInputChange} // Update inputValue as user types
        onBlur={handleInputBlur} // Handle blur to potentially save custom input
        onFocus={handleInputFocus} // Open dropdown on focus
      />
      {isActive && (
        <div
          className="box-dropdown-location absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md overflow-hidden"
        >
          <div className="list-locations max-h-60 overflow-y-auto">
            {/* Option to add custom input if it doesn't match existing and is not empty */}
            {inputValue.trim() !== "" && !locations.some(loc => loc.placeName.toLowerCase() === inputValue.toLowerCase()) && (
              <div
                onClick={() => handleSelectFromList(inputValue)} // Treat custom input as a selection
                className="item-location p-2 cursor-pointer hover:bg-gray-100 border-b border-gray-200" // Add border to separate
                key="custom-option" // Unique key for the custom option
              >
                <div className="location-info">
                  <h6 className="text-16-medium color-text title-location">
                    Add "{inputValue}" as new location
                  </h6>
                  {/* Optionally add a small icon or text indicating it's custom */}
                </div>
              </div>
            )}
            {filteredLocations.length > 0 ? (
              filteredLocations.map((elm) => ( // Removed 'i' index, used elm.id if available, otherwise used elm.placeName as key
                <div
                  key={elm.id || elm.placeName} // Use id if available, otherwise placeName (ensure placeName is unique or handle duplicates)
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
              <div className="item-location p-2 text-gray-500">No locations found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}