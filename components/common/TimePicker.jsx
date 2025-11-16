"use client";

import React, { useState, useEffect, useRef } from "react";
import Picker from 'react-mobile-picker';

export default function TimePickerComponent({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState({ hour: '12', minute: '00' });
  const containerRef = useRef(null);

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':');
      if (h && m) {
        setInternalValue({
          hour: h.padStart(2, '0'),
          minute: m.padStart(2, '0')
        });
      }
    }
  }, [value]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle change AND close on scroll-end
  const handlePickerChange = (newValue, name) => {
    const updated = { ...internalValue, [name]: newValue[name] };
    setInternalValue(updated);
    onChange(`${updated.hour}:${updated.minute}`);
    // Optional: also close here for scroll-end
  };

  // ✅ CLOSE IMMEDIATELY ON ITEM CLICK
  const handleItemClick = (type, val) => {
    const updated = { ...internalValue, [type]: val };
    setInternalValue(updated);
    onChange(`${updated.hour}:${updated.minute}`);
    setIsOpen(false);
  };

  const hourOptions = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const minuteOptions = ['00', '15', '30', '45'];

  return (
    <div 
      ref={containerRef}
      className="rmdp-container"
      style={{ display: 'inline-block', width: '100%', position: 'relative' }}
    >
      <div
        onClick={() => setIsOpen(true)}
        style={{
          width: '100%',
          height: '40px',
          lineHeight: '40px',
          border: '0px solid #ddd',
          borderRadius: '4px',
          padding: '0 10px',
          background: '#fff',
          fontSize: '14px',
          color: '#333',
          cursor: 'pointer',
          boxSizing: 'border-box'
        }}
      >
        {internalValue.hour}:{internalValue.minute}
      </div>

      {isOpen && (
        <div 
          style={{
            position: 'absolute',
            bottom: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            background: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: '8px',
            marginTop: '4px',
            padding: '12px 16px',
            maxHeight: '220px',
            overflow: 'hidden'
          }}
        >
          <Picker
            value={internalValue}
            onChange={handlePickerChange}
            height={180}
            itemHeight={36}
            wheelMode="natural"
          >
            <Picker.Column name="hour">
              {hourOptions.map(h => (
                <Picker.Item key={h} value={h}>
                  {({ selected }) => (
                    <div
                      onClick={() => handleItemClick('hour', h)}
                      style={{
                        padding: '0 8px',
                        textAlign: 'center',
                        color: selected ? '#333' : '#808080',
                        fontWeight: selected ? 'bold' : 'normal',
                        cursor: 'pointer'
                      }}
                    >
                      {h}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column name="minute">
              {minuteOptions.map(m => (
                <Picker.Item key={m} value={m}>
                  {({ selected }) => (
                    <div
                      onClick={() => handleItemClick('minute', m)}
                      style={{
                        padding: '0 8px',
                        textAlign: 'center',
                        color: selected ? '#333' : '#808080',
                        fontWeight: selected ? 'bold' : 'normal',
                        cursor: 'pointer'
                      }}
                    >
                      {m}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        </div>
      )}
    </div>
  );
}