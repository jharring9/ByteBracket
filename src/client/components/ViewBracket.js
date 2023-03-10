import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReadOnlyBracket } from "./bracket-components/ReadOnlyBracket";
import { useDispatch } from "react-redux";
import { setField } from "../store/lambdaSlice";
import { BackButton, fetchImages } from "./shared";
import { Transition } from "@headlessui/react";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import html2canvas from "html2canvas";
import downloadjs from "downloadjs";


// const savePng = async () => {
//   const canvas = await html2canvas(document.body);
//   const dataURL = canvas.toDataURL('image/png');
//   downloadjs(dataURL, 'download.png', 'image/png');
// };

export const ViewBracket = () => {
  const url = window.location.href
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bracket, setBracket] = useState([]);
  const [champion, setChampion] = useState(-1);
  const [masterBracket, setMasterBracket] = useState([]);
  const [masterChampion, setMasterChampion] = useState(-1);
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

    const fetchMasterBracket = async () => {
      const res = await fetch("/v1/master/bracket/master", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setMasterBracket(data.bracket);
        setMasterChampion(data.champion);
      }
    };

    fetchImages(dispatch);
    fetchField();
    fetchMasterBracket();
    fetchBracket();
  }, [user, id]);

  useEffect(() => {
    document.title = "View Bracket - ByteBracket";
  }, []);

  async function savePng(props) {
    const canvas = await html2canvas(document.body);
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, `${user}/bracket/${id}.png`, 'image/png');
  }

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
              <p className="text-center text-gray-600">Created by {user}</p>
              <CopyToClipboard text={url}>
                <button className={"m-2 h-10 w-full rounded-lg border border-black bg-indigo-700 px-5 font-medium text-white shadow-xl transition-colors duration-150 hover:bg-indigo-600 lg:w-auto"}>Copy URL to the clipboard</button>
              </CopyToClipboard>
              <button onClick={() => savePng()} className={"m-2 h-10 w-full rounded-lg border border-black bg-indigo-700 px-5 font-medium text-white shadow-xl transition-colors duration-150 hover:bg-indigo-600 lg:w-auto"}>Download Bracket</button>
            </div>
            <ReadOnlyBracket
              regions={bracket}
              champion={champion}
              master={masterBracket}
              masterChampion={masterChampion}
            />
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
