"use client";

import { useState, useEffect } from "react";
import PasswordProtection from "@/components/sales/password-protection";
import SalesPanel from "@/components/sales/sales-panel";

export default function SalesPanelPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user was previously authenticated in this session
  useEffect(() => {
    const authStatus = sessionStorage.getItem("salesPanelAuth");
    if (authStatus === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthentication = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true);
      sessionStorage.setItem("salesPanelAuth", "authenticated");
    }
  };

  return (
    <div className="min-h-screen">
      {!isAuthenticated ? (
        <PasswordProtection onAuthenticate={handleAuthentication} />
      ) : (
        <SalesPanel />
      )}
    </div>
  );
}
