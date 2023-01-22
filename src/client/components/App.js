import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "../../../public/output.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Home } from "./Home";
import { Create } from "./Create";
import { NotFound } from "./NotFound";
import "flowbite";
import { Login } from "./Login";
import { Register } from "./Register";

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Test User",
    email: "tom@example.com",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
  });

  return (
    <div className="relative overflow-hidden bg-gray-100">
      <BrowserRouter>
        <Header user={currentUser} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home user={currentUser} />} />
          <Route path="/create" element={<Create user={currentUser} />} />
          <Route path="/login" element={<Login user={currentUser} />} />
          <Route path="/register" element={<Register user={currentUser} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
