// src/App.js
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./components/signUp/signUp";
import ProfileSetup from "./components/profileSetup/profileSetup";
import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/login/login";
import "./App.css"; // Import the CSS file
import EditProfile from "./components/editProfile/editProfile";
import { UserProvider } from "./components/userContext";

function App() {
  return (
    <BrowserRouter>
      <div className="main-container">
        <UserProvider>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/profileSetup" element={<ProfileSetup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/editProfile" element={<EditProfile />} />
          </Routes>
        </UserProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
