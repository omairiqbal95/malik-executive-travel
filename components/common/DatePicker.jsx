"use client";
import React from "react";
import DatePicker from "react-multi-date-picker";

export default function DatePickerComponent({ value, onChange }) {
  const today = new Date();
  return (
    <DatePicker
      format="MMMM DD YYYY"
      value={value}
      onChange={onChange}
      minDate={today} // ← Prevents past dates
      style={{ width: "100%" }}
      containerStyle={{ width: "100%" }}
    />
  );
}