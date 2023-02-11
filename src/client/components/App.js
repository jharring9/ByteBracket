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
import { Logout } from "./Logout";
import { Register } from "./Register";
import { Account } from "./Account";
import { About } from "./About";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { ViewBracket } from "./ViewBracket";
import { AcceptOauthCallback } from "./AcceptOauthCallback";

export default function App() {
  const dispatch = useDispatch();
  const [navigation, setNavigation] = useState([
    { name: "Home", href: "/home", current: false },
    { name: "Create Bracket", href: "/create", current: false },
    { name: "About", href: "/about", current: false },
    { name: "Social", href: "/social", current: false },
  ]);

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/v1/session", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const user = await res.json();
        dispatch(setUser(user));
      }
    };
    checkSession();
  }, []);

  return (
    <div className="relative overflow-hidden bg-gray-100">
      <BrowserRouter>
        <Header navigation={navigation} setNavigation={setNavigation} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/bracket/:user/:id" element={<ViewBracket />} />
          <Route
            path="/auth/callback/google"
            element={<AcceptOauthCallback provider="google" />}
          />
          <Route
            path="/auth/callback/facebook"
            element={<AcceptOauthCallback provider="facebook" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer navigation={navigation} />
      </BrowserRouter>
    </div>
  );
}
