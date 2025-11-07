// store/useBookingStore.js
import { create } from 'zustand';

export const useBookingStore = create((set, get) => ({
  // Step 1: Date, Time, Pickup, Dropoff
  date: null,
  time: null,
  pickup: '',
  dropoff: '',

  // Actions
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setPickup: (pickup) => set({ pickup }),
  setDropoff: (dropoff) => set({ dropoff }),

  // Optional: Reset or initialize
  resetBooking: () =>
    set({
      date: null,
      time: null,
      pickup: '',
      dropoff: '',
      vehicle: null,
      extras: [],
      passenger: {},
    }),
}));