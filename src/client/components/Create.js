import React, { useState } from "react";
import { SelectStats } from "./create-bracket/SelectStats";
import { Top25 } from "./create-bracket/Top25";
import { MakePicks } from "./create-bracket/MakePicks";
import { Carrot } from "./icons";

export const Create = () => {
  const [stage, setStage] = useState(1);
  const [response, setResponse] = useState(null);
  const [state, setState] = useState({
    wl: 5,
    sos: 5,
    ppg: 5,
    oppg: 5,
    fg: 5,
    ft: 5,
    tpm: 5,
    trb: 5,
    ast: 5,
    stlblk: 5,
    to: 5,
    pf: 5,
  });

  return (
    <div className="relative overflow-hidden bg-white py-8 pb-4">
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-prose text-lg">
          <h1>
            <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Build Your Bracket
            </span>
          </h1>
        </div>

        <ol className="mx-auto mt-4 flex w-full max-w-7xl items-center justify-evenly space-x-2 rounded-lg border border-gray-200 bg-white p-3 px-4 px-6 text-center text-sm font-medium text-gray-500 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:space-x-4 sm:p-4 sm:text-base">
          <li className={`flex items-center text-indigo-700`}>
            <span className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-indigo-700 text-xs dark:border-blue-500">
              1
            </span>
            <span className="hidden sm:mr-1 sm:inline-flex">Select</span>Stats
          </li>
          <Carrot pos={1} stage={stage} />
          <li
            className={`flex items-center ${stage >= 2 && "text-indigo-700"}`}
          >
            <span
              className={`mr-2 flex h-5 w-5 items-center justify-center border text-xs border-${
                stage >= 2 ? "indigo-700" : "gray-700"
              } shrink-0 rounded-full dark:border-gray-400`}
            >
              2
            </span>
            <span className="hidden sm:mr-1 sm:inline-flex">Your</span> Top 25
          </li>
          <Carrot pos={2} stage={stage} />
          <li
            className={`flex items-center ${stage >= 3 && "text-indigo-700"}`}
          >
            <span
              className={`mr-2 flex h-5 w-5 items-center justify-center border text-xs border-${
                stage >= 3 ? "indigo-700" : "gray-700"
              } shrink-0 rounded-full dark:border-gray-400`}
            >
              3
            </span>
            <span className="hidden sm:mr-1 sm:inline-flex">Make Your</span>{" "}
            Picks
          </li>
        </ol>

        {stage === 1 && (
          <SelectStats
            stats={state}
            setStats={setState}
            setStage={setStage}
            setResponse={setResponse}
          />
        )}

        {stage === 2 && (
          <Top25
            stats={state}
            setStats={setState}
            setStage={setStage}
            setResponse={setResponse}
          />
        )}

        {stage === 3 && (
          <MakePicks
            stats={state}
            setStats={setState}
            setStage={setStage}
            setResponse={setResponse}
          />
        )}
      </div>
    </div>
  );
};
