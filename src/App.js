// src/App.js
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./components/signUp/signUp";
import ProfileSetup from "./components/profileSetup/profileSetup";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/profileSetup" element={<ProfileSetup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
