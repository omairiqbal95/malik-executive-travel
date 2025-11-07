"use client";
import React from "react";
import DatePicker from "react-multi-date-picker";

export default function DatePickerComponent({ value, onChange }) {
  return (
    <DatePicker
      format="MMMM DD YYYY"
      value={value}          // Should be a Date, string, or valid input for the library
      onChange={onChange}    // This receives a DateObject (from react-multi-date-picker)
      style={{ width: "100%" }}
      containerStyle={{ width: "100%" }}
    />
  );
}