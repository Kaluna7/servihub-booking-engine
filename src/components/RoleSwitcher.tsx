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
      className={`
        relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
        ${role === "customer" 
          ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/30" 
          : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/30"}
        hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2
        focus:ring-offset-2 ${
          role === "customer" 
            ? "focus:ring-indigo-500 focus:ring-offset-indigo-100" 
            : "focus:ring-emerald-500 focus:ring-offset-emerald-100"
        }
      `}
    >
      <span className="flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        Switch to {role === "customer" ? "Business" : "Customer"} View
      </span>
    </button>
  );
};