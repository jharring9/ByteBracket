import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUser } from "../store/userSlice";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect ( () => {
    const logout = async () => {
      await fetch("/v1/session", {
        method: "DELETE",
        credentials: "include",
      });
      dispatch(resetUser);
      navigate("/home");
    }
    logout();
  }, []);
};
