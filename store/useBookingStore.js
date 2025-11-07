import { create } from 'zustand';

// ===== PRICING CONFIGURATION =====
const PRICING = {
  AIRPORT_KEYWORDS: ['airport', 'aeropuerto', 'bcn', 'el prat', 'terminal', 'aeroport'],
  AIRPORT_FIXED_PRICE: 55, // €
  CITY_RATE_PER_KM: 1.8,   // €/km
  MIN_CITY_FARE: 20,       // €
  HOLIDAYS: [
    // Spain 2025
    '2025-01-01', // Año Nuevo
    '2025-04-18', // Viernes Santo
    '2025-04-21', // Lunes de Pascua
    '2025-05-01', // Día del Trabajador
    '2025-08-15', // Asunción
    '2025-10-12', // Fiesta Nacional de España
    '2025-11-01', // Día de Todos los Santos
    '2025-12-25', // Navidad
    // Spain 2026
    '2026-01-01', // Año Nuevo
    '2026-04-10', // Viernes Santo
    '2026-04-13', // Lunes de Pascua
    '2026-05-01', // Día del Trabajador
    '2026-08-15', // Asunción
    '2026-10-12', // Fiesta Nacional
    '2026-11-01', // Todos los Santos
    '2026-12-25', // Navidad
  ],
};

// ===== PRICING HELPERS =====
const isAirportLocation = (loc) => {
  if (!loc) return false;
  const lower = loc.toLowerCase();
  return PRICING.AIRPORT_KEYWORDS.some(kw => lower.includes(kw));
};

const estimateDistanceKm = (pickup, dropoff) => {
  if (!pickup || !dropoff) return 10;
  const p = pickup.toLowerCase();
  const d = dropoff.toLowerCase();
  // If both in Barcelona, assume city ride
  if (p.includes('barcelona') && d.includes('barcelona')) {
    return 12;
  }
  // Airport to city or vice versa
  if (isAirportLocation(pickup) || isAirportLocation(dropoff)) {
    return 20;
  }
  // Default fallback
  return 30;
};

const getSurcharges = (date, time) => {
  if (!date || !time) return 1.0;

  let multiplier = 1.0;

  // Weekend (Sat=6, Sun=0)
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    multiplier += 0.20;
  }

  // Public holidays
  const dateStr = date.toISOString().split('T')[0];
  if (PRICING.HOLIDAYS.includes(dateStr)) {
    multiplier += 0.25;
  }

  // Night surcharge (10 PM to 6 AM)
  const hour = parseInt(time.split(':')[0], 10);
  if (hour >= 22 || hour < 6) {
    multiplier += 0.15;
  }

  // Peak holiday period (Dec 24 – Jan 1)
  const month = date.getMonth(); // 0 = Jan, 11 = Dec
  const day = date.getDate();
  if ((month === 11 && day >= 24) || (month === 0 && day <= 1)) {
    multiplier += 0.30;
  }

  return multiplier;
};

const calculateBasePrice = (pickup, dropoff, date, time) => {
  // Airport transfer → fixed price
  if (isAirportLocation(pickup) || isAirportLocation(dropoff)) {
    return PRICING.AIRPORT_FIXED_PRICE;
  }

  // City ride → distance-based
  const distance = estimateDistanceKm(pickup, dropoff);
  let basePrice = Math.max(PRICING.MIN_CITY_FARE, distance * PRICING.CITY_RATE_PER_KM);

  // Apply time/date surcharges
  const surcharge = getSurcharges(date, time);
  return Math.round(basePrice * surcharge * 100) / 100; // Round to 2 decimals
};

const calculateExtrasTotal = (extras, extrasData) => {
  if (!extrasData) return 0;
  return extras.reduce((sum, e) => {
    const item = extrasData.find(x => x.id === e.id);
    if (!item) return sum;
    if (e.quantity != null && e.quantity > 0) {
      return sum + item.price * e.quantity;
    }
    if (e.selected) {
      return sum + item.price;
    }
    return sum;
  }, 0);
};

// ===== DEFAULTS =====
const now = new Date();
const defaultDate = new Date(now);
defaultDate.setDate(now.getDate() + 3); 

const defaultTime = "12:00"; // Noon
const defaultPickup = "Barcelona El Prat Airport (BCN)";
const defaultDropoff = "Hotel Arts Barcelona";

// ===== ZUSTAND STORE =====
export const useBookingStore = create((set, get) => ({
  // ===== STATE =====
  // Step 1: Journey details
  date: defaultDate,
  time: defaultTime,
  pickup: defaultPickup,
  dropoff: defaultDropoff,
  
  // Step 2: Vehicle
  selectedVehicle: null,
  
  // Step 3: Extras
  extras: [],
  extrasData: null, // Will be set from data/cars
  
  // Step 4: Passenger
  passenger: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passengers: 1,
    luggage: 1,
  },

  // ===== ACTIONS =====
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
    if (existingIndex >= 0) {
      const newExtras = [...state.extras];
      newExtras[existingIndex] = { id, ...data };
      return { extras: newExtras };
    } else {
      return { extras: [...state.extras, { id, ...data }] };
    }
  }),
  removeExtra: (id) => set((state) => ({
    extras: state.extras.filter(e => e.id !== id)
  })),
  setExtrasData: (data) => set({ extrasData: data }),

  // Step 4
  setPassenger: (field, value) => set((state) => ({
    passenger: { ...state.passenger, [field]: value }
  })),

  // ===== COMPUTED VALUES =====
  getBasePrice: () => {
    const { pickup, dropoff, date, time, selectedVehicle } = get();
    if (!selectedVehicle) return 0;
    // If vehicle already has a saved price (from BookingVehicles), use it
    if (selectedVehicle.price != null) {
      return selectedVehicle.price;
    }
    // Otherwise calculate dynamically
    return calculateBasePrice(pickup, dropoff, date, time);
  },

  getTotalPrice: () => {
    const { extras } = get();
    const base = get().getBasePrice();
    const extrasTotal = calculateExtrasTotal(extras, get().extrasData);
    return Math.round((base + extrasTotal) * 100) / 100;
  },

  // ===== UTILITIES =====
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