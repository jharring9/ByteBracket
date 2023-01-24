import React, { useEffect, useState } from "react";
import {
  BackButton,
  classNames,
  ContinueButton,
  ErrorAlert,
  SpeedDial,
} from "../icons";

export const MakePicks = ({ setStage, bracket, setBracket }) => {
  const [roundNum, setRoundNum] = useState(0);
  const [error, setError] = useState(null);

  /**
   * Handle user clicking back button.
   */
  const handleBack = () => {
    if (roundNum > 0) {
      setRoundNum(roundNum - 1);
    } else setStage(2);
  };

  /**
   * Handle user clicking continue button.
   */
  const handleNext = () => {
    if (roundNum === bracket.length - 1) {
      setStage(4);
      return;
    }

    const nextRound = [];
    for (let i = 0; i < bracket[roundNum].length / 2; i++) {
      const matchup = [];
      for (let j = 0; j < 2; j++) {
        if (bracket[roundNum][i * 2 + j][0].winner) {
          let winner = bracket[roundNum][i * 2 + j][0];
          winner.winner = false;
          matchup.push(winner);
        } else {
          if (!bracket[roundNum][i * 2 + j][1].winner) {
            setError("Please select a winner for each matchup");
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
          }
          let winner = bracket[roundNum][i * 2 + j][1];
          winner.winner = false;
          matchup.push(winner);
        }
      }
      nextRound.push(matchup);
    }
    setError(null);
    const bracketCopy = [...bracket];
    bracketCopy[roundNum + 1] = nextRound;
    setBracket(bracketCopy);
    setRoundNum(roundNum + 1);
  };

  /**
   * Select all favorites in current round.
   */
  const autoComplete = () => {
    const roundCopy = [...bracket[roundNum]];
    for (let i = 0; i < roundCopy.length; i++) {
      if (roundCopy[i][0].percentile > roundCopy[i][1].percentile) {
        roundCopy[i][0].winner = true;
        roundCopy[i][1].winner = false;
      } else {
        roundCopy[i][0].winner = false;
        roundCopy[i][1].winner = true;
      }
    }
    const bracketCopy = [...bracket];
    bracketCopy[roundNum] = roundCopy;
    setBracket(bracketCopy);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  /**
   * Smooth scroll to top of page when user advances to next round.
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [roundNum]);

  const roundName = (length) => {
    switch (length) {
      case 8:
        return "Make Your Picks: Sweet Sixteen";
      case 4:
        return "Make Your Picks: Elite Eight";
      case 2:
        return "Make Your Picks: Final Four";
      case 1:
        return "Choose Your Winner";
      default:
        return "Make Your Picks: Round of " + length * 2;
    }
  };

  return (
    <>
      <div className="mx-auto mt-4 max-w-7xl px-4 px-6 sm:mt-6 lg:mt-8">
        {bracket.map(
          (round, index) =>
            roundNum === index && (
              <div key={index}>
                <h1 className="text-center text-3xl text-gray-900">
                  {roundName(round.length)}
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
                <DisplayRound
                  round={round}
                  setRound={(data) => {
                    const dataCopy = [...bracket];
                    dataCopy[index] = data;
                    setBracket(dataCopy);
                  }}
                />
              </div>
            )
        )}
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

const DisplayRound = ({ round, setRound }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {round.map((matchup, index) => (
        <MakePick
          key={index}
          matchup={matchup}
          setMatchup={(data) => {
            const dataCopy = [...round];
            dataCopy[index] = data;
            setRound(dataCopy);
          }}
        />
      ))}
    </div>
  );
};

const MakePick = ({ matchup, setMatchup }) => {
  return (
    <div className="m-2 w-full md:w-2/3">
      <dl className="mt-1 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-2 md:divide-y-0 md:divide-x">
        <div
          key={matchup[0].rank}
          className={classNames(
            matchup[0].winner
              ? "bg-green-200 hover:bg-green-300"
              : "hover:bg-green-100",
            "cursor-pointer px-4 py-5 sm:p-6"
          )}
          onClick={() => {
            const data = [...matchup];
            data[0].winner = true;
            data[1].winner = false;
            setMatchup(data);
          }}
        >
          <dt className="text-base font-normal text-gray-900">
            {matchup[0].rank}
          </dt>
          <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
            <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
              {matchup[0].name}
              <span className="ml-2 text-sm font-medium text-gray-500">
                {matchup[0].record}
              </span>
            </div>

            <div
              className={classNames(
                matchup[0].percentile >= 50
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800",
                "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0"
              )}
            >
              {matchup[0].percentile}%
            </div>
          </dd>
        </div>
        <div
          key={matchup[1].rank}
          className={classNames(
            matchup[1].winner
              ? "bg-green-200 hover:bg-green-300"
              : "hover:bg-indigo-100",
            "cursor-pointer px-4 py-5 sm:p-6"
          )}
          onClick={() => {
            const data = [...matchup];
            data[1].winner = true;
            data[0].winner = false;
            setMatchup(data);
          }}
        >
          <dt className="text-base font-normal text-gray-900">
            {matchup[1].rank}
          </dt>
          <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
            <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
              {matchup[1].name}
              <span className="ml-2 text-sm font-medium text-gray-500">
                {matchup[1].record}
              </span>
            </div>

            <div
              className={classNames(
                matchup[1].percentile >= 50
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800",
                "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0"
              )}
            >
              {matchup[1].percentile}%
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
};
