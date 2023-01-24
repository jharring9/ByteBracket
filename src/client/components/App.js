import React, { useEffect, useState } from "react";
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
import { Account } from "./Account";
import { About } from "./About";

export default function App() {
  const [navigation, setNavigation] = React.useState([
    { name: "Home", href: "/home", current: false },
    { name: "Create Bracket", href: "/create", current: false },
    { name: "About", href: "/about", current: false },
    { name: "Social", href: "/social", current: false },
  ]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/v1/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data);
      }
    };
    getUser();
  }, []);

  return (
    <div className="relative overflow-hidden bg-gray-100">
      <BrowserRouter>
        <Header
          user={currentUser}
          navigation={navigation}
          setNavigation={setNavigation}
        />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home user={currentUser} />} />
          <Route path="/create" element={<Create user={currentUser} />} />
          <Route path="/login" element={<Login user={currentUser} />} />
          <Route path="/register" element={<Register user={currentUser} />} />
          <Route path="/account" element={<Account user={currentUser} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer navigation={navigation} />
      </BrowserRouter>
    </div>
  );
}
