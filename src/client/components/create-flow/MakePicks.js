import React, { useEffect, useState } from "react";
import { BackButton, ContinueButton, ErrorAlert, SpeedDial } from "../icons";
import { useDispatch, useSelector } from "react-redux";
import { setCreateStage } from "../../store/createStageSlice";
import { RegionBracket } from "../bracket-components/RegionBracket";
import { setRegion } from "../../store/bracketSlice";

export const MakePicks = () => {
  const dispatch = useDispatch();
  const bracket = useSelector((state) => state.bracket.bracket);
  const region = useSelector((state) => state.bracket.region);
  const finalFour = useSelector((state) => state.bracket.finalFour);
  const [error, setError] = useState(null);

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
    // Validate that all matchups have been selected.
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

    // Validate that a team has been selected to the final four.
    if (finalFour[0][Math.floor(region / 2)][region % 2] === -1) {
      setError("You must select a team to advance to the final four.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // If we're on the last region, advance to the next stage.
    if (region === 3) {
      dispatch(setCreateStage(4));
      return;
    }
    setError(null);
    dispatch(setRegion(region + 1));
  };

  /**
   * Select all favorites in current region.
   */
  const autoComplete = () => {
    // TODO
  };

  /**
   * Smooth scroll to top of page when user advances to next region.
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [region]);

  return (
    <>
      <div className="mx-auto mt-4 max-w-7xl px-4 px-6 sm:mt-6 lg:mt-8">
        <h1 className="text-center text-3xl text-gray-900">
          Make Your Picks: {bracket[region].name} Region
        </h1>
        {error && (
          <div className="flex flex-col items-center justify-center">
            <div className=" mt-3 w-full md:w-2/3 lg:m-4">
              <ErrorAlert
                header="There was a problem with your picks"
                message={error}
              />
            </div>
          </div>
        )}
        <RegionBracket rounds={bracket[region].rounds} />
        <div className="justify-center lg:col-span-4 lg:flex ">
          <div className="mt-4 flex justify-center lg:mt-2">
            <BackButton onClick={handleBack} />
          </div>
          <div className="flex justify-center lg:mt-2">
            <ContinueButton onClick={handleNext} />
          </div>
        </div>
      </div>
      <SpeedDial action={autoComplete} />
    </>
  );
};
