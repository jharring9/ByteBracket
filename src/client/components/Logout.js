import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const logout = async () => {
      await fetch("/v1/session", {
        method: "DELETE",
        credentials: "include",
      });
      dispatch(resetUser());
      navigate("/home");
    };
    logout();
  }, []);
};
