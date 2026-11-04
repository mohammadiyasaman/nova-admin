import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import ReduxProvider from "./Redux/ReduxProvider";
import AdminUIProvider from "./Shared/Providers/AdminUIProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider>
      <AdminUIProvider>
        <App />
      </AdminUIProvider>
    </ReduxProvider>
  </StrictMode>,
);
