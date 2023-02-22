import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReadOnlyBracket } from "./bracket-components/ReadOnlyBracket";
import { useDispatch } from "react-redux";
import { setField } from "../store/lambdaSlice";
import { fetchImages, slowTransition } from "./shared";
import { Transition } from "@headlessui/react";

export const ViewBracket = () => {
  const dispatch = useDispatch();
  const [bracket, setBracket] = useState([]);
  const [champion, setChampion] = useState(-1);
  const [loaded, setLoaded] = useState(false);
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
        setChampion(data.champion);
        setLoaded(true);
      }
    };
    fetchImages(dispatch);
    fetchBracket();
  }, [user, id]);

  return (
    <Transition show={loaded} {...slowTransition}>
      <ReadOnlyBracket regions={bracket} champion={champion} />;
    </Transition>
  );
};
