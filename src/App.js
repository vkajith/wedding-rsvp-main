import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvitationPage from "./components/InvitationPage";
import AdminPage from "./components/AdminPage";

export default function WeddingRSVPSystem() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvitationPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}
