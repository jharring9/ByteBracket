import React, { useEffect, useState } from "react";
import "../../../public/output.css";
import "flowbite";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Home } from "./Home";
import { Create } from "./Create";
import { NotFound } from "./NotFound";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Register } from "./Register";
import { Account } from "./Account";
import { About } from "./About";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { ViewBracket } from "./ViewBracket";
import { AcceptOauthCallback } from "./AcceptOauthCallback";
import { ViewLeague } from "./leagues-flow/ViewLeague";
import { fetchImages } from "./shared";
import { Leagues } from "./Leagues";
import { JoinLeague } from "./leagues-flow/JoinLeague";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { CreateLeague } from "./leagues-flow/CreateLeague";

export default function App() {
  const dispatch = useDispatch();
  const [navigation, setNavigation] = useState([
    { name: "Home", href: "/home", current: false },
    { name: "Create Bracket", href: "/create", current: false },
    { name: "About", href: "/about", current: false },
    { name: "Leagues", href: "/leagues", current: false },
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
    fetchImages(dispatch);
  }, []);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
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
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/leagues/:id" element={<ViewLeague />} />
          <Route path="/newleague" element={<CreateLeague />} />
          <Route path="/join/:id" element={<JoinLeague />} />
          <Route path="/bracket/:user/:id" element={<ViewBracket />} />
          <Route
            path="/auth/callback/google"
            element={<AcceptOauthCallback provider="google" />}
          />
          <Route
            path="/auth/callback/facebook"
            element={<AcceptOauthCallback provider="facebook" />}
          />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer navigation={navigation} />
      </div>
    </BrowserRouter>
  );
}
