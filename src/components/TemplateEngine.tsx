import type { BookingTemplate } from "../types/template";

export const templates: BookingTemplate[] = [
  {
    id: "tuition-class",
    label: "Tuition – Class",
    defaultColor: "bg-sky-500",
    icon: "BookOpen",
    fields: [
      { id: "subject", label: "Subject", type: "text", required: true },
      { id: "maxSlots", label: "Max Slots", type: "number", min: 1, required: true },
      {
        id: "recurrenceType",
        label: "Recurrence",
        type: "select",
        options: [
          { value: "NONE", label: "None" },
          { value: "WEEKLY", label: "Weekly" },
        ],
        required: true,
      },
    ],
    statusPreset: {
      pending: "bg-indigo-400",
      approved: "bg-emerald-400",
      rejected: "bg-red-500",
      cancelled: "bg-muted",
    },
    recurrence: { allowed: true, defaultFreq: "WEEKLY" },
    resources: ["Teacher"],
  },
  {
    id: "salon-appointment",
    label: "Salon Appointment",
    defaultColor: "bg-pink-500",
    icon: "Scissors",
    fields: [
      {
        id: "serviceType",
        label: "Service Type",
        type: "select",
        options: [
          { value: "haircut", label: "Haircut" },
          { value: "color", label: "Hair Color" },
        ],
        required: true,
      },
      {
        id: "stylist",
        label: "Stylist",
        type: "select",
        options: [
          { value: "stylist_01", label: "Stylist A" },
          { value: "stylist_02", label: "Stylist B" },
        ],
        required: true,
      },
    ],
    statusPreset: {
      pending: "bg-indigo-400",
      approved: "bg-emerald-400",
      rejected: "bg-red-500",
      cancelled: "bg-muted",
    },
    recurrence: { allowed: false },
    resources: ["Stylist"],
  },
];
