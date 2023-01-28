import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetUser } from "../store/userSlice";

export const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const logout = async () => {
      await fetch("/v1/session", {
        method: "DELETE",
        credentials: "include",
      });
      dispatch(resetUser);
      window.location.href = "/home";
    };
    logout();
  }, []);
};
