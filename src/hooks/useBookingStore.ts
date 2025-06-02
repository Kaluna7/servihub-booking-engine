import { create } from "zustand";
import type { BookingPayload } from "../types/booking";

interface BookingState {
  bookings: BookingPayload[];
  addBooking: (b: BookingPayload) => void;
  updateBooking: (b: BookingPayload) => void;
  deleteBooking: (id: string) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  addBooking: (b: BookingPayload) =>
    set((state) => ({ bookings: [...state.bookings, b] })),
  updateBooking: (b: BookingPayload) =>
    set((state) => ({
      bookings: state.bookings.map((x) => (x.id === b.id ? b : x)),
    })),
  deleteBooking: (id: string) =>
    set((state) => ({
      bookings: state.bookings.filter((x) => x.id !== id),
    })),
}));
