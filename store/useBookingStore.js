import { create } from 'zustand';

const PRICING = {
  AIRPORT_KEYWORDS: ['airport', 'aeropuerto', 'bcn', 'el prat', 'terminal', 'aeroport'],
  AIRPORT_FIXED_PRICE: 55,
  CITY_RATE_PER_KM: 1.8,
  MIN_CITY_FARE: 20,
  HOLIDAYS: [
    '2025-01-01','2025-04-18','2025-04-21','2025-05-01',
    '2025-08-15','2025-10-12','2025-11-01','2025-12-25',
    '2026-01-01','2026-04-10','2026-04-13','2026-05-01',
    '2026-08-15','2026-10-12','2026-11-01','2026-12-25',
  ],
};

const isAirportLocation = (loc) => {
  const address = typeof loc === 'string' ? loc : loc?.address;
  if (!address) return false;
  return PRICING.AIRPORT_KEYWORDS.some(kw => address.toLowerCase().includes(kw));
};

const estimateDistanceKm = (pickup, dropoff) => {
  if (!pickup?.address || !dropoff?.address) return 10;
  const p = pickup?.address.toLowerCase();
  const d = dropoff?.address.toLowerCase();
  if (p.includes('barcelona') && d.includes('barcelona')) return 12;
  if (isAirportLocation(pickup) || isAirportLocation(dropoff)) return 20;
  return 30;
};

const getSurcharges = (date, time) => {
  if (!date || !time) return 1.0;
  let multiplier = 1.0;
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) multiplier += 0.2;
  const dateStr = date.toISOString().split('T')[0];
  if (PRICING.HOLIDAYS.includes(dateStr)) multiplier += 0.25;
  const hour = parseInt(time.split(':')[0], 10);
  if (hour >= 22 || hour < 6) multiplier += 0.15;
  const month = date.getMonth(), day = date.getDate();
  if ((month === 11 && day >= 24) || (month === 0 && day <= 1)) multiplier += 0.3;
  return multiplier;
};

const calculateBasePrice = (pickup, dropoff, date, time) => {
  if (isAirportLocation(pickup) || isAirportLocation(dropoff)) return PRICING.AIRPORT_FIXED_PRICE;
  const distance = estimateDistanceKm(pickup, dropoff);
  let basePrice = Math.max(PRICING.MIN_CITY_FARE, distance * PRICING.CITY_RATE_PER_KM);
  return Math.round(basePrice * getSurcharges(date, time) * 100) / 100;
};

const calculateExtrasTotal = (extras, extrasData) => {
  if (!extrasData) return 0;
  return extras.reduce((sum, e) => {
    const item = extrasData.find(x => x.id === e.id);
    if (!item) return sum;
    if (e.quantity != null && e.quantity > 0) return sum + item.price * e.quantity;
    if (e.selected) return sum + item.price;
    return sum;
  }, 0);
};

const now = new Date();
const defaultDate = new Date(now);
defaultDate.setDate(now.getDate() + 3);

export const useBookingStore = create((set, get) => ({
  date: defaultDate,
  time: "12:00",
  pickup: { address: '', lat: null, lng: null },
  dropoff: { address: '', lat: null, lng: null },
  selectedVehicle: null,
  extras: [],
  extrasData: null,
  passenger: { firstName: '', lastName: '', email: '', phone: '', passengers: 1, luggage: 1 },
  notes: '',
  distance: "~",
  duration: "~",
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setPickup: (location) => set({ pickup: location }),
  setDropoff: (location) => set({ dropoff: location }),
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
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
  setNotes: (notes) => set({ notes }),
  removeExtra: (id) => set((state) => ({ extras: state.extras.filter(e => e.id !== id) })),
  setExtrasData: (data) => set({ extrasData: data }),
  setPassenger: (field, value) => set((state) => ({ passenger: { ...state.passenger, [field]: value } })),
  setDistance: (distance) => set({ distance }),
  setDuration: (duration) => set({ duration }),
  getBasePrice: () => {
    const { pickup, dropoff, date, time, selectedVehicle } = get();
    if (!selectedVehicle) return 0;
    if (selectedVehicle.price != null) return selectedVehicle.price;
    return calculateBasePrice(pickup, dropoff, date, time);
  },
  getTotalPrice: () => {
    const { extras } = get();
    const base = get().getBasePrice();
    const extrasTotal = calculateExtrasTotal(extras, get().extrasData);
    return Math.round((base + extrasTotal) * 100) / 100;
  },
  resetBooking: () => set({
    date: null, time: null,
    pickup: '', dropoff: '',
    selectedVehicle: null, extras: [],
    passenger: { firstName: '', lastName: '', email: '', phone: '', passengers: 1, luggage: 1 },
  }),
  PRICING, isAirportLocation, estimateDistanceKm, calculateBasePrice, calculateExtrasTotal
}));
