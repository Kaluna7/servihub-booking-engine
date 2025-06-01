import React, { useState } from "react";
import { templates } from "./TemplateEngine";
import { useBookingStore } from "../hooks/useBookingStore";
import type { BookingPayload } from "../types/booking";
import type { FieldSpec } from "../types/template";
import { v4 as uuidv4 } from "uuid";

interface Props {
  slot: { start: Date; end: Date };
  onClose: () => void;
}

export const BookingDialog: React.FC<Props> = ({ slot, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(templates[0].id);
  const [customValues, setCustomValues] = useState<Record<string, unknown>>({});
  const addBooking = useBookingStore((state) => state.addBooking);
  const template = templates.find((t) => t.id === selectedTemplate)!;
  const handleChange = (fieldId: string, value: unknown) => {
    setCustomValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = () => {
    for (const field of template.fields) {
      if (field.required && customValues[field.id] === undefined) return;
      if (field.type === "number") {
        const raw = customValues[field.id];
        const v = typeof raw === "string" ? Number(raw) : Number(raw);
        if (field.min !== undefined && v < field.min) return;
        if (field.max !== undefined && v > field.max) return;
      }
    }

    const payload: BookingPayload = {
      id: uuidv4(),
      templateId: template.id,
      start: slot.start.toISOString(),
      end: slot.end.toISOString(),
      status: "pending",
      customFields: customValues,
    };

    addBooking(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-card p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">New Booking</h2>
        <div className="mb-4">
          <label className="block mb-1">Template</label>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="w-full border border-border rounded p-2"
          >
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {template.fields.map((field: FieldSpec) => (
          <div className="mb-3" key={field.id}>
            <label className="block mb-1">{field.label}</label>

            {field.type === "text" && (
              <input
                type="text"
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full border border-border rounded p-2"
              />
            )}

            {field.type === "number" && (
              <input
                type="number"
                min={field.min}
                max={field.max}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full border border-border rounded p-2"
              />
            )}

            {field.type === "select" && (
              <select
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full border border-border rounded p-2"
              >
                <option value="">Select...</option>
                {field.options?.map((opt: { value: string; label: string }) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-muted text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
