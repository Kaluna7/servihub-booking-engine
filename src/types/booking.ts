export interface BookingPayload {
  id: string;
  templateId: string;
  start: string;
  end: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  resourceIds?: string[];
  customFields: Record<string, any>;
}
