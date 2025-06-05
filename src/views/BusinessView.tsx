import React from "react";
import { useBookingStore } from "../hooks/useBookingStore";
import type { BookingPayload } from "../types/booking";
import { Check, X as CloseIcon, Clock, MoreVertical } from "react-feather";
import { templates } from "../components/TemplateEngine";

export const BusinessView: React.FC = () => {
  const bookings = useBookingStore((state) => state.bookings);
  const updateBooking = useBookingStore((state) => state.updateBooking);

  const handleStatusChange = (id: string, status: BookingPayload["status"]) => {
    const booking = bookings.find((b) => b.id === id);
    if (booking) {
      updateBooking({ ...booking, status });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTemplateLabel = (templateId: string) => {
    return templates.find(t => t.id === templateId)?.label || templateId;
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
          <p className="text-gray-600 mt-1">
            Review and manage pending booking requests
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
          <Clock size={18} className="text-gray-500" />
          <span className="text-gray-700 font-medium">
            {bookings.filter(b => b.status === "pending").length} Pending Requests
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 py-3 px-6 text-gray-600 text-sm font-medium">
          <div className="col-span-4">Booking Details</div>
          <div className="col-span-3">Time</div>
          <div className="col-span-3">Customer Info</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="divide-y divide-gray-100">
          {bookings
            .filter((b) => b.status === "pending")
            .map((b) => (
              <div key={b.id} className="py-5 px-6 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-12 items-center">
                  <div className="col-span-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4">
                        <div className="bg-blue-500 w-3 h-3 rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {getTemplateLabel(b.templateId)}
                        </h3>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {Object.entries(b.customFields).map(([key, value]) => (
                            <span 
                              key={key} 
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                              {String(value)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3 text-gray-700">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-2 text-gray-500" />
                      <span>{formatDate(b.start)}</span>
                    </div>
                    <div className="text-sm text-gray-500 ml-6">
                      Duration: {Math.round((new Date(b.end).getTime() - new Date(b.start).getTime()) / (1000 * 60))} min
                    </div>
                  </div>

                  <div className="col-span-3">
                    {b.customFields.name ? (
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">
                            {String(b.customFields.name)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-500">No customer info</span>
                    )}
                  </div>

                  <div className="col-span-2 flex justify-end space-x-2">
                    <button
                      onClick={() => handleStatusChange(b.id, "approved")}
                      className="p-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors"
                      title="Approve"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={() => handleStatusChange(b.id, "rejected")}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      title="Reject"
                    >
                      <CloseIcon size={18} />
                    </button>
                    <button
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                      title="More options"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {bookings.filter(b => b.status === "pending").length === 0 && (
          <div className="py-16 text-center">
            <div className="mx-auto bg-gray-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Check size={24} className="text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">All caught up!</h3>
            <p className="text-gray-500 mt-1 max-w-md mx-auto">
              You have no pending booking requests. New requests will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};