"use client";

import { useEffect, useRef } from "react";

export default function PlacePicker({ 
  value, 
  onChange, 
  placeholder = "Enter a location" 
}) {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initAutocomplete = () => {
      if (!inputRef.current) return;
      
      if (value?.address) {
        inputRef.current.value = value.address;
      }

      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["geocode"],
          componentRestrictions: { country: "es" } 
        }
      );
      autocompleteRef.current = autocomplete;

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        
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

    if (typeof window.google === "undefined") {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initAutocomplete;
      document.head.appendChild(script);
    } else {
      initAutocomplete();
    }

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