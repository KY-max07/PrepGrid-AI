import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/home/DashBoard";
import PrepGrid from "./pages/prepgrid/PrepGrid";
import { Toaster } from "react-hot-toast";
import UserProvider from "./context/UserProvider";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/prep-grid/:sessionId" element={<PrepGrid />} />
          </Routes>
          <Toaster
            toastOptions={{
              className: "",
              style: {
                fontSize: "13px",
              },
            }}
          />
        </Router>
      </div>
    </UserProvider>
  );
};

export default App;
