import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import necessary components for routing
import "./index.css";
import Home from "./pages/Home.jsx";
import RegistrationForm from "./pages/Auth.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Route for Home page */}
        <Route path="/auth" element={<RegistrationForm />} />
        {/* Route for Auth page */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
