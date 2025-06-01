import React from "react";
import { RoleSwitcher } from "./RoleSwitcher";

export const Navbar: React.FC = () => (
  <nav className="bg-card shadow-sm p-4 flex justify-between items-center">
    <h1 className="text-xl font-semibold">ServiHub Booking</h1>
    <RoleSwitcher />
  </nav>
);
