import React from "react";
import { RoleSwitcher } from "./RoleSwitcher";

export const Navbar: React.FC = () => (
  <nav className="bg-white border-b border-gray-200 shadow-md px-6 py-4 flex justify-between items-center">
    <div className="flex items-center">
      <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center shadow-sm">
        <span className="text-white font-bold text-lg">S</span>
      </div>
      <h1 className="ml-3 text-xl font-bold text-gray-800">
        ServiHub <span className="text-indigo-600">Booking</span>
      </h1>
    </div>
    
    <div className="flex items-center">
      <RoleSwitcher />
      <div className="ml-4 flex items-center">
        <div className="bg-gray-200 border border-gray-300 rounded-full w-9 h-9" />
      </div>
    </div>
  </nav>
);