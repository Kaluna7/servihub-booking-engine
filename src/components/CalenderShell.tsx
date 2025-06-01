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
        backgroundColor = "bg-indigo-400";
        break;
      case "approved":
        backgroundColor = "bg-emerald-400";
        break;
      case "rejected":
        backgroundColor = "bg-red-500";
        break;
      case "cancelled":
        backgroundColor = "bg-muted";
        break;
      default:
        backgroundColor = "bg-primary";
    }
    return { className: `${backgroundColor} text-white rounded` };
  };

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedSlot({ start: slotInfo.start, end: slotInfo.end });
    setDialogOpen(true);
  };

  return (
    <div className="p-4">
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={Views.MONTH}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: "80vh" }}
        eventPropGetter={eventStyleGetter}
      />
      {dialogOpen && selectedSlot && (
        <BookingDialog slot={selectedSlot} onClose={() => setDialogOpen(false)} />
      )}
    </div>
  );
};
