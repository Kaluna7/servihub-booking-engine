import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { BookingPayload } from "../types/booking";
import { useBookingStore } from "../hooks/useBookingStore";
import { BookingDialog } from "./BookingDialog";
import type { SlotInfo, Event as CalendarEvent } from "react-big-calendar";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

type ExtendedEvent = CalendarEvent & { status: BookingPayload["status"] };

export const CalendarShell: React.FC = () => {
  const bookings = useBookingStore((state) => state.bookings);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const events: ExtendedEvent[] = bookings.map((b: BookingPayload) => ({
    id: b.id,
    title: `${b.templateId} (${b.status})`,
    start: new Date(b.start),
    end: new Date(b.end),
    allDay: false,
    status: b.status,
  }));

  const eventStyleGetter = (event: ExtendedEvent) => {
    let backgroundColor = "";
    switch (event.status) {
      case "pending":
        backgroundColor = "bg-indigo-500 border-l-4 border-indigo-700";
        break;
      case "approved":
        backgroundColor = "bg-emerald-500 border-l-4 border-emerald-700";
        break;
      case "rejected":
        backgroundColor = "bg-red-500 border-l-4 border-red-700";
        break;
      case "cancelled":
        backgroundColor = "bg-gray-500 border-l-4 border-gray-700";
        break;
      default:
        backgroundColor = "bg-blue-500 border-l-4 border-blue-700";
    }
    return { 
      className: `${backgroundColor} text-white py-1 px-2 rounded-md text-sm font-medium` 
    };
  };

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedSlot({ start: slotInfo.start, end: slotInfo.end });
    setDialogOpen(true);
  };

  return (
    <div className="flex flex-col h-full p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Booking Calendar</h1>
        <p className="text-gray-500 text-sm mt-1">
          Select a time slot to create new booking
        </p>
      </div>

      <div className="flex-grow bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Calendar
          localizer={localizer}
          events={events}
          defaultView={Views.MONTH}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          selectable
          onSelectSlot={handleSelectSlot}
          style={{ height: "calc(100vh - 180px)" }}
          eventPropGetter={eventStyleGetter}
          dayPropGetter={() => ({ 
            className: "hover:bg-gray-50 transition-colors" 
          })}
        />
      </div>

      {dialogOpen && selectedSlot && (
        <BookingDialog slot={selectedSlot} onClose={() => setDialogOpen(false)} />
      )}
    </div>
  );
};