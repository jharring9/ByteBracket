import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReadOnlyBracket } from "./bracket-components/ReadOnlyBracket";
import { useDispatch } from "react-redux";
import { setField } from "../store/lambdaSlice";
import { BackButton, fetchImages } from "./shared";
import { Transition } from "@headlessui/react";

export const ViewBracket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bracket, setBracket] = useState([]);
  const [champion, setChampion] = useState(-1);
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
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
        setName(data.name);
        setLoaded(true);
      }
    };
    fetchImages(dispatch);
    fetchBracket();
  }, [user, id]);

  useEffect(() => {
    document.title = "View Bracket - ByteBracket";
  }, []);

  return (
    <Transition
      show={loaded}
      enter="transition ease-out duration-[2000ms]"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      className="relative mx-auto"
    >
      <div className="mx-auto mt-4 max-w-min px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-md border border-gray-600 shadow-xl sm:overflow-hidden md:rounded-lg">
          <div className="rounded-md bg-white px-4 py-5 sm:p-6 md:rounded-lg">
            <div className="mx-auto max-w-xl space-y-4">
              <h1 className="text-center text-center text-3xl font-bold text-gray-900">
                {name}
              </h1>
              <p className="text-center text-gray-600">
                Created by {user}
              </p>
            </div>
            <ReadOnlyBracket regions={bracket} champion={champion} />
            <div className="flex justify-center">
              <div className="mt-4 flex justify-center lg:mt-2 lg:justify-start">
                <BackButton onClick={() => navigate(-1)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};
