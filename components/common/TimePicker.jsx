"use client";
import React from "react";
import DatePicker from "react-multi-date-picker";
import TimePickerPlugin from "react-multi-date-picker/plugins/time_picker";

export default function TimePickerComponent({ value, onChange }) {
  // Convert "HH:mm" string to Date for the picker
  const dateValue = React.useMemo(() => {
    if (!value) return new Date(); // fallback to current time
    const [hours, minutes] = (value || "00:00").split(':').map(Number);
    const d = new Date();
    d.setHours(hours || 0, minutes || 0, 0, 0);
    return d;
  }, [value]);

  const handleTimeChange = (dateObject) => {
    if (!dateObject) {
      onChange("");
      return;
    }
    // Format as "HH:mm" (24-hour)
    const hours = String(dateObject.hour).padStart(2, '0');
    const minutes = String(dateObject.minute).padStart(2, '0');
    onChange(`${hours}:${minutes}`);
  };

  return (
    <DatePicker
      value={dateValue}
      onChange={handleTimeChange}
      disableDayPicker
      format="HH:mm"        // 👈 24-hour display in picker
      editable={false}
      plugins={[<TimePickerPlugin />]}
      style={{ width: "100%" }}
      containerStyle={{ width: "100%" }}
    />
  );
}