import { useContext } from "react";
import { AdminUIContext } from "./AdminUIContext";

export const useAdminUI = () => {
  const context = useContext(AdminUIContext);

  if (!context) {
    throw new Error("useAdminUI must be used inside AdminUIProvider");
  }

  return context;
};
