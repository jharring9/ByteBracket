import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearTop25 } from "../../store/lambdaSlice";
import { resetBracket } from "../../store/bracketSlice";
import { resetStats } from "../../store/statsSlice";
import { BackButton, SaveButton } from "../icons";
import { setCreateStage } from "../../store/createStageSlice";

export const Finalize = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { field } = useSelector((state) => state.lambda);
  const { values: stats } = useSelector((state) => state.stats);
  const { bracket, champion } = useSelector((state) => state.bracket);
  const [name, setName] = useState("");

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  /**
   * Handle submission of bracket.
   */
  const onFinalize = async (ev) => {
    setLoading(true);
    ev.preventDefault();
    const res = await fetch(`/v1/${user.username}/bracket`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        bracket: bracket,
        champion: champion,
        complete: true,
        name: name,
        winner: field[champion]?.name,
        stats: stats,
      }),
    });
    if (res.ok) {
      dispatch(resetStats);
      dispatch(clearTop25);
      dispatch(resetBracket);
      navigate("/account");
    }
    setLoading(false);
  };

  /**
   * Handle user clicking the back button (return to picking matches).
   */
  const handleBack = () => {
    dispatch(setCreateStage(3));
  };

  /**
   * Capture back button event.
   */
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    handleBack();
  };

  return (
    <>
      {user.username ? (
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
                  <div className="justify-center lg:col-span-4 lg:flex ">
                    <div className="mt-4 flex justify-center lg:mt-2">
                      <BackButton onClick={handleBack} />
                    </div>
                    <div className="flex justify-center lg:mt-2">
                      <SaveButton onClick={onFinalize} loading={loading} />
                    </div>
                  </div>
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
