import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "../../../public/output.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Home } from "./Home";
import { Create } from "./Create";
import { NotFound } from "./NotFound";
import "flowbite";

export default function App() {
  const [currentUser, setCurrentUser] = useState({ name: "Test User" });

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
        <BrowserRouter>
          <Header user={currentUser} />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home user={currentUser} />} />
            <Route path="/create" element={<Create user={currentUser} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}
