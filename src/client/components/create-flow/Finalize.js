import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearTop25 } from "../../store/lambdaSlice";
import { resetBracket } from "../../store/bracketSlice";
import { resetStats } from "../../store/statsSlice";
import {
  BackButton,
  ErrorAlert,
  normalTransition,
  SaveButton,
  ValidatedInput,
} from "../shared";
import { setCreateStage } from "../../store/createStageSlice";
import { Transition } from "@headlessui/react";
import ReactGA from "react-ga4";
import { addLeague } from "../../store/userSlice";

export const Finalize = ({ league }) => {
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
    const submitResponse = await fetch(`/v1/${user.username}/bracket`, {
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
    if (!submitResponse.ok) {
      const data = await submitResponse.json();
      setError(data.error);
      return;
    }
    if (league) {
      dispatch(addLeague(league));
      const bracketId = (await submitResponse.json()).id;
      const enterBracketResponse = await fetch(`/v1/league/${league}`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          bracketId: bracketId,
          username: user.username,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (enterBracketResponse.ok) {
        ReactGA.event({ action: "createbracket", category: "bracket" });
        dispatch(resetStats);
        dispatch(clearTop25);
        dispatch(resetBracket);
        dispatch(setCreateStage(1));
        navigate(`/leagues/${league}`);
        return;
      }
    }
    if (submitResponse.ok) {
      const data = await submitResponse.json();
      ReactGA.event({ action: "createbracket", category: "bracket" });
      dispatch(resetStats);
      dispatch(clearTop25);
      dispatch(resetBracket);
      dispatch(setCreateStage(1));
      navigate(`/bracket/${user.username}/${data.id}`);
    } else {
      const data = await submitResponse.json();
      setError(data.error);
    }
    setLoading(false);
  };

  /**
   * Handle user clicking the back button (return to picking matches).
   */
  const handleBack = () => {
    dispatch(setCreateStage(4));
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
        <div className="mx-auto mt-4 max-w-2xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="rounded-md border border-gray-600 shadow-xl sm:overflow-hidden md:rounded-lg">
            <div className="rounded-md bg-white px-4 py-5 sm:p-6 md:rounded-lg">
              <Transition
                show={!!error}
                {...normalTransition}
                className="mx-auto mt-3 max-w-full lg:col-span-3 lg:m-4"
              >
                <ErrorAlert
                  header="There was an error submitting your bracket."
                  message={error}
                />
              </Transition>
              <div className="mx-auto mb-6 max-w-xl space-y-4">
                <h1 className="text-center text-center text-3xl font-bold text-gray-900">
                  Submit Your Bracket
                </h1>
              </div>
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
              <div className="justify-center lg:flex">
                <div className="mt-4 flex justify-center lg:mt-2 lg:justify-start">
                  <BackButton onClick={handleBack} />
                </div>
                <div className="flex justify-center lg:mt-2 lg:justify-start">
                  <SaveButton onClick={onFinalize} loading={loading} />
                </div>
              </div>
            </div>
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
                to={`/login?return=create${league ? `%2F${league}` : ""}`}
                className="font-medium text-indigo-600 hover:underline"
              >
                log in
              </Link>{" "}
              or{" "}
              <Link
                to={`/register?return=create${league ? `%2F${league}` : ""}`}
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
