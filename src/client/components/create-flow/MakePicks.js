import React, { useEffect, useState } from "react";
import {
  BackButton,
  ContinueButton,
  ErrorAlert,
  normalTransition,
  smoothScrollTop,
} from "../shared";
import { useDispatch, useSelector } from "react-redux";
import { setCreateStage } from "../../store/createStageSlice";
import { setRegion } from "../../store/bracketSlice";
import { SingleSided } from "../bracket-components/DynamicBracket";
import { Transition } from "@headlessui/react";
import { BEFORE_OPEN, AFTER_START } from "../App";

export const MakePicks = () => {
  const dispatch = useDispatch();
  const { bracket, region, champion } = useSelector((state) => state.bracket);
  const [error, setError] = useState(null);

  /**
   * Smooth scroll to top of page when user advances to next region.
   */
  useEffect(() => {
    smoothScrollTop();
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, [region]);

  /**
   * Handle user clicking back button.
   */
  const handleBack = () => {
    if (region > 0) {
      dispatch(setRegion(region - 1));
    } else dispatch(setCreateStage(2));
  };

  /**
   * Handle user clicking continue button.
   */
  const handleNext = () => {
    /* Validate that all matchups have been selected. */
    for (let i = 0; i < bracket[region].rounds.length; i++) {
      for (let j = 0; j < bracket[region].rounds[i].seeds.length; j++) {
        if (
          bracket[region].rounds[i].seeds[j][0] === -1 ||
          bracket[region].rounds[i].seeds[j][1] === -1
        ) {
          setError("You must select a winner for each matchup.");
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }
    }

    /* Validate that a team has been selected to the final four */
    if (
      region !== 4 &&
      bracket[4].rounds[0].seeds[Math.floor(region / 2)][region % 2] === -1
    ) {
      setError("You must select a team to advance to the final four.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    /* Validate that a champion has been selected */
    if (region === 4 && champion === -1) {
      setError("You must select a champion.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    /* If we're on the last region, advance to the next stage */
    if (region === 4) {
      dispatch(setCreateStage(4));
      return;
    }
    setError(null);
    dispatch(setRegion(region + 1));
  };

  /**
   * Capture back button event.
   */
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    handleBack();
  };

  return BEFORE_OPEN || AFTER_START ? (
    <BracketNotActive before={BEFORE_OPEN} />
  ) : (
    <Transition
      show={true}
      appear={true}
      enter="transition ease-out duration-[2000ms]"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      className="relative mx-auto"
    >
      <div className="mx-auto mt-4 max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-md border border-gray-600 shadow-xl sm:overflow-hidden md:rounded-lg">
          <div className="rounded-md bg-white px-4 py-5 sm:p-6 md:rounded-lg">
            <Transition
              show={!!error}
              {...normalTransition}
              className="mx-auto mt-3 max-w-full lg:col-span-3 lg:m-4"
            >
              <ErrorAlert
                header="There was an error with your picks."
                message={error}
              />
            </Transition>
            <div className="mx-auto max-w-xl space-y-4">
              <h1 className="text-center text-3xl font-bold text-gray-900">
                Make Your Picks: {bracket[region].name}
              </h1>
              <p className="text-center text-gray-600">
                Select a winner for each matchup. Alternatively, you may choose
                to simulate the matchups in this region using your head-to-head
                algorithm.
                <span className="xl:hidden">
                  {" "}
                  Swipe left and right to adjust the bracket view.
                </span>
              </p>
            </div>
            <SingleSided rounds={bracket[region].rounds} />
            <div className="justify-center lg:flex">
              <div className="mt-4 flex justify-center lg:mt-2 lg:justify-start">
                <BackButton onClick={handleBack} />
              </div>
              <div className="flex justify-center lg:mt-2 lg:justify-start">
                <ContinueButton onClick={handleNext} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export const BracketNotActive = ({ before }) => {
  return (
    <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <p className="mt-1 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
          The bracket creation window is not open.
        </p>
        <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
          {before
            ? "The bracket creation window will open after Selection Sunday. Check back then to make your picks! Until then, you can still select stats to use in your future brackets."
            : "The bracket creation window has closed. Check back next year to make your picks! You can still view your existing brackets, view leagues, and modify stats."}
        </p>
      </div>
    </div>
  );
};
