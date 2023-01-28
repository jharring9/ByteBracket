import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearBracket, clearTop25 } from "../../store/lambdaSlice";
import { resetStats } from "../../store/statsSlice";

export const Finalize = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { bracket } = useSelector((state) => state.lambda);
  const [name, setName] = useState("");

  const onFinalize = async (ev) => {
    ev.preventDefault();
    const res = await fetch(`/v1/${user.username}/bracket`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        bracket: bracket,
        complete: true,
        name: name,
        winner: bracket[bracket.length - 1][0][0].winner
          ? bracket[bracket.length - 1][0][0].name
          : bracket[bracket.length - 1][0][1].name,
      }),
    });
    if (res.ok) {
      dispatch(clearBracket);
      dispatch(clearTop25);
      dispatch(resetStats);
      navigate("/account");
    }
  };

  return (
    <>
      {user ? (
        <div className="relative mx-auto mt-8 lg:mt-14">
          <div className="mx-auto mt-6 max-w-screen-xl px-4 pb-6 sm:px-6 lg:mt-8 lg:px-8">
            <form>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company-website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Bracket Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                        className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Create a bracket nickname"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    onClick={onFinalize}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
              Sign in to complete your bracket.
            </p>
            <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
              Please{" "}
              <Link
                to="/login?fromCreate=true"
                className="font-medium text-indigo-600 hover:underline"
              >
                log in
              </Link>{" "}
              or{" "}
              <Link
                to="/register?fromCreate=true"
                className="font-medium text-indigo-600 hover:underline"
              >
                create a free account
              </Link>{" "}
              to save your bracket. Don't worry, you won't lose your bracket
              while doing so. Just return to the{" "}
              <span className="font-bold">Create Bracket</span> tab to continue.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
