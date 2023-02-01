import React, { useEffect, useState } from "react";
import { EyeIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { classNames } from "../icons";

export const Brackets = ({ user }) => {
  const [brackets, setBrackets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
    };
    getBrackets();
  }, [user]);

  return (
    <div className="divide-y divide-gray-200 lg:col-span-9">
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <div>
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Brackets
          </h2>
          <p className="mt-1 text-sm text-gray-500">See your ByteBrackets.</p>
        </div>

        <div className="mt-6 flex flex-col">
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {brackets.map((bracket) => (
              <li
                key={bracket.id}
                className="col-span-1 w-full divide-y divide-gray-200 rounded-lg bg-white shadow"
              >
                <div className="flex w-full items-center justify-between space-x-6 p-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="truncate text-sm font-medium text-gray-900">
                        {bracket.name}
                      </h3>
                      <span
                        className={classNames(
                          bracket.complete
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-black",
                          "inline-block flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium"
                        )}
                      >
                        {bracket.complete ? "Complete" : "In Progress"}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-sm text-gray-500">
                      {bracket.winnerName}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="flex w-0 flex-1">
                      <Link
                        to={`/bracket/${user.username}/${bracket.id}`}
                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                      >
                        <EyeIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-3">View</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            <li
              key="new"
              className="h-36 w-full divide-y divide-gray-200 rounded-lg bg-white"
            >
              <button
                type="button"
                onClick={() => navigate("/create")}
                className="relative block h-full w-full rounded-lg border-2 border-dashed border-gray-300 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                  />
                </svg>
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Create a new bracket
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
