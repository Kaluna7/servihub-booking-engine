import React, { useState } from "react";
import { templates } from "./TemplateEngine";
import { useBookingStore } from "../hooks/useBookingStore";
import type { BookingPayload } from "../types/booking";
import type { FieldSpec } from "../types/template";
import { v4 as uuidv4 } from "uuid";
import { X } from "react-feather";

interface Props {
  slot: { start: Date; end: Date };
  onClose: () => void;
}

export const BookingDialog: React.FC<Props> = ({ slot, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(templates[0].id);
  const [customValues, setCustomValues] = useState<Record<string, unknown>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addBooking = useBookingStore((state) => state.addBooking);
  const template = templates.find((t) => t.id === selectedTemplate)!;

  const handleChange = (fieldId: string, value: unknown) => {
    setCustomValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Validate fields
    for (const field of template.fields) {
      if (field.required && customValues[field.id] === undefined) {
        setIsSubmitting(false);
        return;
      }
      
      if (field.type === "number") {
        const raw = customValues[field.id];
        const v = typeof raw === "string" ? Number(raw) : Number(raw);
        
        if (field.min !== undefined && v < field.min) {
          setIsSubmitting(false);
          return;
        }
        if (field.max !== undefined && v > field.max) {
          setIsSubmitting(false);
          return;
        }
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

  const formatTime = (date: Date) => 
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-xl font-bold text-gray-800">New Booking</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-5">
          <div className="flex items-center mb-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="mr-3 bg-white p-2 rounded-md border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <div>
              <p className="font-medium text-gray-800">
                {slot.start.toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                {formatTime(slot.start)} - {formatTime(slot.end)}
              </p>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Booking Type</label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 py-1">
            {template.fields.map((field: FieldSpec) => (
              <div className="mb-4" key={field.id}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {field.type === "text" && (
                  <input
                    type="text"
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                )}

                {field.type === "number" && (
                  <input
                    type="number"
                    min={field.min}
                    max={field.max}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder={`${field.min} - ${field.max}`}
                  />
                )}

                {field.type === "select" && (
                  <select
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="">Select an option</option>
                    {field.options?.map((opt: { value: string; label: string }) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-5 bg-gray-50 border-t border-gray-100">
          <button 
            onClick={onClose} 
            className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
              isSubmitting 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isSubmitting ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};