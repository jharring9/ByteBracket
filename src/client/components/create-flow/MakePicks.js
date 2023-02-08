import React, { useEffect, useState } from "react";
import { CreateCard, ErrorAlert, smoothScrollTop, SpeedDial } from "../shared";
import { useDispatch, useSelector } from "react-redux";
import { setCreateStage } from "../../store/createStageSlice";
import { setBracket, setRegion, setWinner } from "../../store/bracketSlice";
import {
  SingleSided,
  winPercent,
} from "../bracket-components/DynamicBracket";

export const MakePicks = () => {
  const dispatch = useDispatch();
  const field = useSelector((state) => state.lambda.field);
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

  /**
   * Randomly pick winners for all matchups in the current region,
   * weighted by team's percentile.
   */
  const autoComplete = () => {
    /* Autopick all favorites in the current region */
    const copy = JSON.parse(JSON.stringify(bracket));
    for (let i = 0; i < copy[region].rounds.length - 1; i++) {
      for (let j = 0; j < copy[region].rounds[i].seeds.length; j++) {
        const matchup = copy[region].rounds[i].seeds[j];
        const p1 = field[matchup[0]].percentile;
        const p2 = field[matchup[1]].percentile;
        const teamOneOdds = winPercent(p1, p2);
        copy[region].rounds[i + 1].seeds[Math.floor(j / 2)][j % 2] =
          teamOneOdds > Math.random() * 100 ? matchup[0] : matchup[1];
      }
    }
    dispatch(setBracket(copy));

    /* Autopick the regional champion */
    const finalTeam1 =
      copy[region].rounds[copy[region].rounds.length - 1].seeds[0][0];
    const finalTeam2 =
      copy[region].rounds[copy[region].rounds.length - 1].seeds[0][1];
    dispatch(
      setWinner({
        round: copy[region].rounds.length - 1,
        matchup: 0,
        position: 0,
        seed:
          winPercent(
            field[finalTeam1].percentile,
            field[finalTeam2].percentile
          ) >
          Math.random() * 100
            ? finalTeam1
            : finalTeam2,
      })
    );
  };

  return (
    <>
      <h1 className="mt-4 text-center text-3xl text-gray-900 lg:mt-6">
        Make Your Picks: {bracket[region].name}
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
      <CreateCard onBack={handleBack} onNext={handleNext}>
        <SingleSided rounds={bracket[region].rounds} />
      </CreateCard>
      <SpeedDial action={autoComplete} />
    </>
  );
};
