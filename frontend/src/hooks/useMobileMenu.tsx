import { MobileMenuContext } from "@/contexts/mobileMenuContext";
import { useContext } from "react";

// Hook
export const useMobileMenu = () => {
  const context = useContext(MobileMenuContext);

  if (!context) {
    throw new Error("useMobileMenu must be used within a MobileMenuProvider");
  }

  return context;
};
