"use client";

import { useEffect, useRef } from "react";
import { loadGoogleMapsAPI } from "@/utlis/loadGoogleMaps";

export default function PlacePicker({ value, onChange, placeholder = "Enter a location" }) {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initAutocomplete = () => {
      if (!inputRef.current) return;

      if (value?.address) {
        inputRef.current.value = value.address;
      }

      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"],
        componentRestrictions: { country: "es" },
      });

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();
        if (!place.geometry || !place.formatted_address) {
          const rawInput = inputRef.current.value;
          onChange({ address: rawInput, lat: null, lng: null });
          return;
        }

        const address = place.formatted_address;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        inputRef.current.value = address;
        onChange({ address, lat, lng });
      });
    };

    loadGoogleMapsAPI(initAutocomplete);

    return () => {
      if (autocompleteRef.current) {
        autocompleteRef.current = null;
      }
    };
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      className="search-input"
      placeholder={placeholder}
      autoComplete="off"
    />
  );
}
