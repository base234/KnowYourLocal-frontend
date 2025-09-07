import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider as DescopeAuthProvider } from '@descope/react-sdk';

import "./index.css";
import "./brand-theme.css";
import App from "./App.jsx";
import { AuthProvider as AppAuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <DescopeAuthProvider projectId="P31zCvjcYtbIuIGx3vbcVTEv7msh">
        <AppAuthProvider>
          <App />
        </AppAuthProvider>
      </DescopeAuthProvider>
    </BrowserRouter>

);
