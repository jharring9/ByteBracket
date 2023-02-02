import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReadOnlyBracket } from "./bracket-components/ReadOnlyBracket";
import { useDispatch } from "react-redux";
import { setField } from "../store/lambdaSlice";

export const ViewBracket = () => {
  const dispatch = useDispatch();
  const [bracket, setBracket] = useState([]);
  const [title, setTitle] = useState("");
  const { user, id } = useParams();

  useEffect(() => {
    const fetchField = async () => {
      const res = await fetch(`/v1/field`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const field = await res.json();
        dispatch(setField(field));
      }
    };
    fetchField();

    const fetchBracket = async () => {
      const res = await fetch(`/v1/${user}/bracket/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setBracket(data.bracket);
        setTitle(data.name);
      }
    };
    fetchBracket();
  }, [user, id]);

  return (
    <>
      <h1 className="m-4 text-center text-2xl text-gray-900 lg:m-6">
        Viewing Bracket: {title}
      </h1>
      <ReadOnlyBracket regions={bracket} />
    </>
  );
};
