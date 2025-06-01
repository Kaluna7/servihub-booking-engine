import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export const RoleSwitcher: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = searchParams.get("role") || "customer";
  const toggleRole = () => {
    const newRole = role === "customer" ? "business" : "customer";
    navigate(`/?role=${newRole}`);
  };
  return (
    <button
      onClick={toggleRole}
      className="px-3 py-1 bg-primary text-white rounded"
    >
      Switch to {role === "customer" ? "Business" : "Customer"} View
    </button>
  );
};
