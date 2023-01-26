import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = ({ setUser }) => {
  const navigate = useNavigate();
  useEffect ( () => {
    const logout = async () => {
      await fetch("/v1/session", {
        method: "DELETE",
        credentials: "include",
      });
      setUser(null);
      navigate("/home");
    }
    logout();
  }, []);
};
