import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export const ViewBracket = () => {
  const { user, id } = useParams();

  useEffect(() => {
    const fetchBracket = async () => {
      const res = await fetch(`/v1/${user}/bracket/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const bracket = await res.json();
        console.log(bracket);
      }
    };
    fetchBracket();
  });
};
