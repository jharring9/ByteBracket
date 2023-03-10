import React, { useEffect, useState } from "react";
import "../../../public/output.css";
import ReactGA from "react-ga4";
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
import { useDispatch } from "react-redux";
import { ViewBracket } from "./ViewBracket";
import { AcceptOauthCallback } from "./AcceptOauthCallback";
import { ViewLeague } from "./leagues-flow/ViewLeague";
import { checkSession, fetchImages } from "./shared";
import { Leagues } from "./Leagues";
import { JoinLeague } from "./leagues-flow/JoinLeague";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { CreateLeague } from "./leagues-flow/CreateLeague";
import { SnapBackLeague } from "./leagues-flow/sponsored-leagues/SnapbackSports";

/* Google Analytics */
ReactGA.initialize("G-GR6LZND73X");

/* Bracket Creation */
export const BEFORE_OPEN = true;
export const AFTER_START = false;

export default function App() {
  const dispatch = useDispatch();
  const [navigation, setNavigation] = useState([
    { name: "Home", href: "/home", current: false },
    { name: "Create Bracket", href: "/create", current: false },
    { name: "Leagues", href: "/leagues", current: false },
    { name: "About", href: "/about", current: false },
  ]);

  useEffect(() => {
    checkSession(dispatch);
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
          <Route path="/leagues/:id/:urlcode?" element={<ViewLeague />} />
          <Route
            path="/leagues/snapback/:urlcode?"
            element={<SnapBackLeague />}
          />
          <Route path="/join/:id/:code?" element={<JoinLeague />} />
          <Route path="/newleague" element={<CreateLeague />} />
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
