import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReadOnlyBracket } from "./bracket-components/ReadOnlyBracket";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "../store/lambdaSlice";
import { BackButton, fetchImages, ShareButton } from "./shared";
import { Dialog, Transition } from "@headlessui/react";
import { ClipboardDocumentIcon, LinkIcon } from "@heroicons/react/20/solid";
import { Helmet } from "react-helmet";

export const ViewBracket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bracket, setBracket] = useState([]);
  const [champion, setChampion] = useState(-1);
  const [masterBracket, setMasterBracket] = useState([]);
  const [masterChampion, setMasterChampion] = useState(-1);
  const [loaded, setLoaded] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [name, setName] = useState("");
  const { user, id } = useParams();
  const { logos, field } = useSelector((state) => state.lambda);

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

  return (
    <>
      <Helmet title="View Bracket - ByteBracket">
        <meta property="og:image" content={logos[field[champion]?.name]} />
      </Helmet>
      <Transition
        show={loaded}
        enter="transition ease-out duration-[2000ms]"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        className="relative mx-auto"
      >
        <ShareModal
          isOpen={shareModal}
          setOpen={setShareModal}
          bracketId={id}
          userId={user}
        />
        <div className="mt-2 mb-4 flex w-screen justify-center xl:hidden">
          <div className="space-y-4">
            <h1 className="text-center text-3xl font-bold text-gray-900">
              {name}
            </h1>
            <p className="text-center text-gray-600">Created by {user}</p>
          </div>
        </div>
        <div className="mb-4 flex w-screen justify-center xl:hidden">
          <div className="mt-4 flex justify-center lg:mt-2 lg:justify-start">
            <BackButton onClick={() => navigate(-1)} />
          </div>
          <div className="mt-4 flex justify-center lg:mt-2 lg:justify-start">
            <ShareButton onClick={() => setShareModal(true)} />
          </div>
        </div>
        <div className="mx-auto mt-4 w-screen px-4 pb-10 sm:px-6 lg:px-8">
          <div className="rounded-md border border-gray-600 shadow-xl sm:overflow-hidden md:rounded-lg">
            <div className="rounded-md bg-white px-4 py-5 sm:p-6 md:rounded-lg">
              <ReadOnlyBracket
                regions={bracket}
                champion={champion}
                master={masterBracket}
                masterChampion={masterChampion}
                bracketName={name}
                bracketCreator={user}
                onShare={() => setShareModal(true)}
              />
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

/**
 * Modal for sharing a bracket link.
 */
const ShareModal = ({ bracketId, userId, isOpen, setOpen }) => {
  const cancelButtonRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const link = `https://bytebracket.io/bracket/${userId}/${bracketId}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500 sm:mx-0 sm:h-10 sm:w-10">
                    <LinkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Share Bracket
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Share this link with your friends to show them your
                        bracket!
                      </p>
                    </div>
                    <div className="mt-2 flex rounded-md shadow-sm">
                      <div className="relative flex flex-grow items-stretch focus-within:z-10">
                        <input
                          type="text"
                          name="link"
                          id="link"
                          className="block w-full rounded-none rounded-l-md border-gray-300 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={link}
                          disabled
                        />
                      </div>
                      <button
                        type="button"
                        onClick={copyLink}
                        className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <ClipboardDocumentIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Copy</span>
                      </button>
                    </div>
                    {copied && (
                      <p
                        className="mt-2 text-sm text-indigo-600"
                        id="link-copied"
                      >
                        Copied to clipboard
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
