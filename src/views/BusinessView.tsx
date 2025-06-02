import React from "react";
import { useBookingStore } from "../hooks/useBookingStore";
import type { BookingPayload } from "../types/booking";

export const BusinessView: React.FC = () => {
  const bookings = useBookingStore((state) => state.bookings);
  const updateBooking = useBookingStore((state) => state.updateBooking);

  const handleStatusChange = (id: string, status: BookingPayload["status"]) => {
    const booking = bookings.find((b) => b.id === id);
    if (booking) {
      updateBooking({ ...booking, status });
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Pending Bookings</h2>
      <div className="grid grid-cols-1 gap-4">
        {bookings
          .filter((b) => b.status === "pending")
          .map((b) => (
            <div
              key={b.id}
              className="p-4 border border-border rounded bg-card flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{b.templateId}</p>
                <p className="text-sm">
                  {new Date(b.start).toLocaleString()} -{" "}
                  {new Date(b.end).toLocaleString()}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleStatusChange(b.id, "approved")}
                  className="px-2 py-1 bg-emerald-400 text-white rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(b.id, "rejected")}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
