export interface FieldSpec {
  id: string; // "maxSlots" | "recurrenceType" | …
  label: string; // "Max Slots"
  type:
    | "text"
    | "textarea"
    | "number"
    | "select"
    | "multiselect"
    | "date"
    | "time"
    | "toggle";
  options?: { value: string; label: string }[]; // for select types
  min?: number; // e.g. 1 for slots
  max?: number; // upper bound
  required?: boolean;
}

export interface BookingTemplate {
  id: string; // "tuition-class"
  label: string; // "Tuition – Class"
  defaultColor: string; // e.g. "bg-sky-500"
  icon?: string; // lucide icon name for tooling menus
  fields: FieldSpec[]; // drives dialog generation
  statusPreset?: {
    pending: string; // tailwind class or css var
    approved: string;
    rejected: string;
    cancelled: string;
  };
  recurrence?: {
    allowed: boolean; // true if recurrence UI should show
    defaultFreq?: "DAILY" | "WEEKLY" | "MONTHLY";
  };
  resources?: string[]; // e.g. ['Teacher', 'Classroom']
}
