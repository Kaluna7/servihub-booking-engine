import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { CustomerView } from "./views/CustomerView";
import { BusinessView } from "./views/BusinessView";

const AppRoutes: React.FC = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "customer";
  return (
    <Routes>
      <Route
        path="/"
        element={role === "customer" ? <CustomerView /> : <BusinessView />}
      />
      <Route path="*" element={<Navigate to="/?role=customer" replace />} />
    </Routes>
  );
};

export const App: React.FC = () => (
  <BrowserRouter>
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-grow">
        <AppRoutes />
      </div>
    </div>
  </BrowserRouter>
);
