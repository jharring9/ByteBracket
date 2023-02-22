import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearTop25 } from "../../store/lambdaSlice";
import { resetBracket } from "../../store/bracketSlice";
import { resetStats } from "../../store/statsSlice";
import { BackButton, ErrorAlert, SaveButton, ValidatedInput } from "../shared";
import { setCreateStage } from "../../store/createStageSlice";
import { Transition } from "@headlessui/react";

export const Finalize = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { field, logos } = useSelector((state) => state.lambda);
  const { values: stats } = useSelector((state) => state.stats);
  const { bracket, champion } = useSelector((state) => state.bracket);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);

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
    if (name.trim().length === 0) {
      setNameError("Please enter a name for your bracket.");
      setLoading(false);
      return;
    } else setNameError(null);
    const res = await fetch(`/v1/${user.username}/bracket`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        bracket: bracket,
        champion: champion,
        name: name,
        winner: field[champion]?.name,
        stats: stats,
      }),
    });
    if (res.ok) {
      dispatch(resetStats);
      dispatch(clearTop25);
      dispatch(resetBracket);
      dispatch(setCreateStage(1));
      navigate("/account");
    } else {
      const data = await res.json();
      setError(data.error);
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
    <Transition
      show={true}
      appear={true}
      enter="transition ease-out duration-[1000ms]"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      {user.username ? (
        <div className="relative mx-auto mt-8 lg:mt-14">
          <div className="mx-auto mt-6 max-w-screen-xl px-4 pb-6 sm:px-6 lg:mt-8 lg:w-1/2 lg:px-8">
            <form className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                {error && (
                  <ErrorAlert
                    header="Error submitting bracket"
                    message={error}
                  />
                )}
                <div className="flex gap-6">
                  <div className="flex-auto">
                    <ValidatedInput
                      inputName="Bracket name"
                      value={name}
                      setValue={setName}
                      errorMsg={nameError}
                    />
                  </div>
                  <div className="flex-initial">
                    {logos[field[champion]?.name] && (
                      <img
                        src={logos[field[champion]?.name]}
                        alt="team logo"
                        className="mr-2 mb-1 h-20"
                      />
                    )}
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
                to="/login?return=create"
                className="font-medium text-indigo-600 hover:underline"
              >
                log in
              </Link>{" "}
              or{" "}
              <Link
                to="/register?return=create"
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
    </Transition>
  );
};
