// src/App.js
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./components/signUp/signUp";
import ProfileSetup from "./components/profileSetup/profileSetup";
import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/login/login";
import "./App.css"; // Import the CSS file

function App() {
  return (
    <BrowserRouter>
      <div className="main-container">
        {" "}
        {/* Apply the CSS class here */}
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/profileSetup" element={<ProfileSetup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
