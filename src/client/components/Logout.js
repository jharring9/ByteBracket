import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.username) {
      navigate("/home");
    }
  }, [user]);

  useEffect(() => {
    const logout = async () => {
      await fetch("/v1/session", {
        method: "DELETE",
        credentials: "include",
      });
      dispatch(resetUser());
    };
    logout();
  }, []);
};
