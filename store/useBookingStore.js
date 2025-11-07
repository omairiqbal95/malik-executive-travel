import { create } from 'zustand';

export const useBookingStore = create((set, get) => ({
  // Step 1
  date: null,
  time: null,
  pickup: '',
  dropoff: '',
  // Step 2
  selectedVehicle: null,
  // Step 3
  extras: [],
  // Step 4
  passenger: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passengers: 1,
    luggage: 1,
  },

  // Step 1
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setPickup: (pickup) => set({ pickup }),
  setDropoff: (dropoff) => set({ dropoff }),

  // Step 2
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),

  // Step 3
  setExtra: (id, data) => set((state) => {
    const existingIndex = state.extras.findIndex(e => e.id === id);
    let newExtras;
    if (existingIndex >= 0) {
      newExtras = [...state.extras];
      newExtras[existingIndex] = { id, ...data };
    } else {
      newExtras = [...state.extras, { id, ...data }];
    }
    return { extras: newExtras };
  }),
  removeExtra: (id) => set((state) => ({
    extras: state.extras.filter(e => e.id !== id)
  })),

  // Step 4
  setPassenger: (field, value) => set((state) => ({
    passenger: { ...state.passenger, [field]: value }
  })),

  resetBooking: () =>
    set({
      date: null,
      time: null,
      pickup: '',
      dropoff: '',
      selectedVehicle: null,
      extras: [],
      passenger: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        passengers: 1,
        luggage: 1,
      },
    }),
}));