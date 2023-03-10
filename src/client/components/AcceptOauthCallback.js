import React, { useEffect } from "react";
import ReactGA from "react-ga4";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";

export const AcceptOauthCallback = ({ provider }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const params = window.location.search;
    const { code } = Object.fromEntries(new URLSearchParams(params));
    processLogin(code);
  });

  const processLogin = async (code) => {
    const res = await fetch(`/v1/oauth/${provider}/process?code=${code}`);
    const data = await res.json();
    if (res.ok) {
      dispatch(setUser(data));
      ReactGA.event({ action: "login", category: "user", label: provider });
      window.close();
    }
  };

  return (
    <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <p className="mt-1 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
          You have been logged in.
        </p>
        <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
          You have been logged in! Please close this tab to return to
          ByteBracket.
        </p>
      </div>
    </div>
  );
};
