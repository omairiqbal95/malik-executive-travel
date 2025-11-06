// contexts/BookingContext.js
"use client"; // <-- Add this line at the very top

import React, { createContext, useContext, useReducer } from 'react';
import { cars, extras } from '@/data/cars'; // Import your car and extras data

// Initial State
const initialState = {
  passengerDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Add other passenger details fields if needed
  },
  selectedVehicle: null, // ID or the full object of the selected car
  selectedExtras: [], // Array of selected extra objects { id, title, price, quantity (if applicable) }
  date: null, // Selected date object (e.g., from DatePicker)
  time: null, // Selected time string (e.g., from TimePicker) "HH:mm"
  fromLocation: '', // String or object from PlacePicker
  toLocation: '', // String or object from PlacePicker
  flightNumber: '', // From BookingExtra
  notesForDriver: '', // From BookingExtra or PassengerDetails (if kept)
  numberOfPassengers: 1, // From PassengerDetails
  numberOfLuggage: 1, // From PassengerDetails
  calculatedPrice: 0, // Dynamically calculated
  // Add other relevant state fields
};

// Action Types
const SET_PASSENGER_DETAILS = 'SET_PASSENGER_DETAILS';
const SET_SELECTED_VEHICLE = 'SET_SELECTED_VEHICLE';
const ADD_EXTRA = 'ADD_EXTRA';
const REMOVE_EXTRA = 'REMOVE_EXTRA';
const UPDATE_EXTRA_QUANTITY = 'UPDATE_EXTRA_QUANTITY';
const SET_DATE = 'SET_DATE';
const SET_TIME = 'SET_TIME';
const SET_FROM_LOCATION = 'SET_FROM_LOCATION';
const SET_TO_LOCATION = 'SET_TO_LOCATION';
const SET_FLIGHT_NUMBER = 'SET_FLIGHT_NUMBER';
const SET_NOTES_FOR_DRIVER = 'SET_NOTES_FOR_DRIVER';
const SET_NUMBER_OF_PASSENGERS = 'SET_NUMBER_OF_PASSENGERS';
const SET_NUMBER_OF_LUGGAGE = 'SET_NUMBER_OF_LUGGAGE';
const CALCULATE_PRICE = 'CALCULATE_PRICE'; // Action to trigger price recalculation

// Reducer Function
const bookingReducer = (state, action) => {
  switch (action.type) {
    case SET_PASSENGER_DETAILS:
      return { ...state, passengerDetails: { ...state.passengerDetails, ...action.payload } };
    case SET_SELECTED_VEHICLE:
      return { ...state, selectedVehicle: action.payload };
    case ADD_EXTRA:
      // Check if already added
      const existingIndex = state.selectedExtras.findIndex(item => item.id === action.payload.id);
      if (existingIndex >= 0) {
        // If it's a quantity item, increment quantity, otherwise just return state
        if (action.payload.quantity !== undefined) {
          const updatedExtras = [...state.selectedExtras];
          updatedExtras[existingIndex].quantity = (updatedExtras[existingIndex].quantity || 0) + (action.payload.quantity || 1);
          return { ...state, selectedExtras: updatedExtras };
        } else {
          // For select items, if already selected, don't add again
          return state;
        }
      } else {
        // Add new extra
        return { ...state, selectedExtras: [...state.selectedExtras, action.payload] };
      }
    case REMOVE_EXTRA:
      return { ...state, selectedExtras: state.selectedExtras.filter(item => item.id !== action.payload.id) };
    case UPDATE_EXTRA_QUANTITY:
      return {
        ...state,
        selectedExtras: state.selectedExtras.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    case SET_DATE:
      return { ...state, date: action.payload };
    case SET_TIME:
      return { ...state, time: action.payload };
    case SET_FROM_LOCATION:
      return { ...state, fromLocation: action.payload };
    case SET_TO_LOCATION:
      return { ...state, toLocation: action.payload };
    case SET_FLIGHT_NUMBER:
      return { ...state, flightNumber: action.payload };
    case SET_NOTES_FOR_DRIVER:
      return { ...state, notesForDriver: action.payload };
    case SET_NUMBER_OF_PASSENGERS:
      return { ...state, numberOfPassengers: action.payload };
    case SET_NUMBER_OF_LUGGAGE:
      return { ...state, numberOfLuggage: action.payload };
    case CALCULATE_PRICE:
      // Implement your price calculation logic here
      let total = 0;
      if (state.selectedVehicle) {
        const vehicle = cars.find(car => car.id === state.selectedVehicle);
        if (vehicle) {
          total += vehicle.price; // Assuming price is per hour/day or base price
        }
      }
      state.selectedExtras.forEach(extra => {
        if (extra.quantity !== undefined) {
          total += extra.price * (extra.quantity || 1); // Handle quantity
        } else if (extra.selected) { // For select items
          total += extra.price;
        }
      });
      // Add other calculations if needed (distance, time, etc.)
      return { ...state, calculatedPrice: total };
    default:
      return state;
  }
};

// Context Creation
const BookingContext = createContext();

// Provider Component
export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Action Creators (Functions to dispatch actions)
  const setPassengerDetails = (details) => dispatch({ type: SET_PASSENGER_DETAILS, payload: details });
  const setSelectedVehicle = (vehicleId) => dispatch({ type: SET_SELECTED_VEHICLE, payload: vehicleId });
  const addExtra = (extra) => dispatch({ type: ADD_EXTRA, payload: extra });
  const removeExtra = (extraId) => dispatch({ type: REMOVE_EXTRA, payload: { id: extraId } });
  const updateExtraQuantity = (id, quantity) => dispatch({ type: UPDATE_EXTRA_QUANTITY, payload: { id, quantity } });
  const setDate = (date) => dispatch({ type: SET_DATE, payload: date });
  const setTime = (time) => dispatch({ type: SET_TIME, payload: time });
  const setFromLocation = (location) => dispatch({ type: SET_FROM_LOCATION, payload: location });
  const setToLocation = (location) => dispatch({ type: SET_TO_LOCATION, payload: location });
  const setFlightNumber = (number) => dispatch({ type: SET_FLIGHT_NUMBER, payload: number });
  const setNotesForDriver = (notes) => dispatch({ type: SET_NOTES_FOR_DRIVER, payload: notes });
  const setNumberOfPassengers = (num) => dispatch({ type: SET_NUMBER_OF_PASSENGERS, payload: num });
  const setNumberOfLuggage = (num) => dispatch({ type: SET_NUMBER_OF_LUGGAGE, payload: num });

  // Function to trigger price calculation (call this after any change that affects price)
  const calculatePrice = () => dispatch({ type: CALCULATE_PRICE });

  // Provide state and actions
  const value = {
    ...state,
    setPassengerDetails,
    setSelectedVehicle,
    addExtra,
    removeExtra,
    updateExtraQuantity,
    setDate,
    setTime,
    setFromLocation,
    setToLocation,
    setFlightNumber,
    setNotesForDriver,
    setNumberOfPassengers,
    setNumberOfLuggage,
    calculatePrice, // Make calculatePrice available
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

// Custom Hook to use the context
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};