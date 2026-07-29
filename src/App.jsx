import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Routers from "./routes/Routers";
import { LandingPageConfigProvider } from "./context/LandingPageConfigContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";

import { ProfileProvider } from "./context/ProfileContext";
import { NotificationProvider } from "./context/NotificationContext";
import AIChatAssistant from "./components/AIChatAssistant";

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AdminAuthProvider>
          <LandingPageConfigProvider>
            <ProfileProvider>
              <Routers />
              <AIChatAssistant />
              <div className="pointer-events-none fixed inset-0 z-[9999]">
                <Toaster
                  position="bottom-right"
                  richColors
                  closeButton
                  duration={4000}
                  expand={true}
                />
              </div>
            </ProfileProvider>
          </LandingPageConfigProvider>
        </AdminAuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
