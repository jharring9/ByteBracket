import React, { useEffect, useState } from "react";
import { EyeIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { WarnModal } from "../shared";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import { Transition } from "@headlessui/react";

export const Brackets = ({ user }) => {
  const navigate = useNavigate();
  const [brackets, setBrackets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logos } = useSelector((state) => state.lambda);

  useEffect(() => {
    getBrackets();
  }, [user]);

  const getBrackets = async () => {
    let res = await fetch(`/v1/${user.username}/brackets`, {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      setBrackets(data);
    } else {
      navigate("/login");
    }
    setLoading(false);
  };

  const deleteBracket = async (id) => {
    let res = await fetch(`/v1/${user.username}/bracket/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.ok) {
      getBrackets();
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="divide-y divide-gray-200 lg:col-span-9">
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <div>
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Brackets
          </h2>
          <p className="mt-1 text-sm text-gray-500">See your ByteBrackets.</p>
        </div>
        <Transition
          as={React.Fragment}
          show={!loading}
          enter="ease-out duration-500"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className="mt-6 flex flex-col">
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {brackets.map((bracket) => (
                <BracketGridItem
                  user={user}
                  bracket={bracket}
                  logos={logos}
                  deleteBracket={deleteBracket}
                />
              ))}
              <li
                key="new"
                className="h-40 w-full divide-y divide-gray-200 rounded-lg bg-white"
              >
                <button
                  type="button"
                  onClick={() => navigate("/create")}
                  className="relative block h-full w-full rounded-lg border-2 border-dashed border-gray-300 text-center text-gray-300 hover:border-gray-400 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <DocumentPlusIcon
                    className="mx-auto h-12 w-12"
                    aria-hidden="true"
                  />
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Create a new bracket
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </div>
  );
};

const BracketGridItem = ({ user, bracket, logos, deleteBracket }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <li
      key={bracket.id}
      className="col-span-1 w-full divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <WarnModal
        open={showModal}
        setOpen={setShowModal}
        header="Delete bracket"
        content="Are you sure you want to delete this bracket? The bracket, including the statistics you used to create it, will be deleted permanently."
        cta="Delete"
        onComplete={() => deleteBracket(bracket.id)}
      />
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex justify-between">
          <div>
            <h3 className="truncate text-sm font-medium text-gray-900">
              {bracket.name}
            </h3>
            <p className="mt-1 truncate text-sm text-gray-500">
              {bracket.winnerName}
            </p>
          </div>
        </div>
        <img src={logos[bracket.winnerName]} alt="team logo" className="h-16" />
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <Link
              to={`/bracket/${user.username}/${bracket.id}`}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              <EyeIcon
                className="h-5 w-5 text-gray-700 hover:text-gray-500"
                aria-hidden="true"
              />
              <span className="ml-3">View</span>
            </Link>
          </div>
          <div className="flex w-0 flex-1">
            <div
              onClick={() => setShowModal(true)}
              className="relative -mr-px inline-flex w-0 flex-1 cursor-pointer items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-red-700 hover:text-red-500"
            >
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
              <span className="ml-3">Delete</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
