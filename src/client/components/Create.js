import React, { useState } from "react";
import { SelectStats } from "./create-bracket/SelectStats";
import { Top25 } from "./create-bracket/Top25";
import { MakePicks } from "./create-bracket/MakePicks";
import { CheckIcon } from "@heroicons/react/24/solid";

const steps = [
  { id: "01", name: "Select Stats", stage: 1, status: "current" },
  { id: "02", name: "Your Top 25", stage: 2, status: "upcoming" },
  { id: "03", name: "Make Your Picks", stage: 3, status: "upcoming" },
];

export const Create = () => {
  const [stage, setStage] = useState(1);
  const [lamdbaResponse, setLamdbaResponse] = useState(null);
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

  const updateStage = (newStage) => {
    setStage(newStage);
    switch (newStage) {
      case 1:
        steps[0].status = "current";
        steps[1].status = "upcoming";
        steps[2].status = "upcoming";
        break;
      case 2:
        steps[0].status = "complete";
        steps[1].status = "current";
        steps[2].status = "upcoming";
        break;
      case 3:
        steps[0].status = "complete";
        steps[1].status = "complete";
        steps[2].status = "current";
        break;
    }
  };

  return (
    <div className="relative overflow-hidden py-8 pb-4">
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-prose text-lg">
          <h1>
            <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Build Your Bracket
            </span>
          </h1>
        </div>

        <ProgressBar steps={steps} setStage={updateStage} />

        {stage === 1 && (
          <SelectStats
            stats={state}
            setStats={setState}
            setStage={updateStage}
            setResponse={setLamdbaResponse}
          />
        )}

        {stage === 2 && <Top25 stats={state} setStage={updateStage} />}

        {stage === 3 && <MakePicks stats={state} setStage={updateStage} />}
      </div>
    </div>
  );
};

const ProgressBar = ({ steps }) => {
  return (
    <div
      aria-label="Progress"
      className="mx-auto mt-4 flex w-full max-w-7xl justify-evenly space-x-2 p-3 px-4 px-6 "
    >
      <ol
        role="list"
        className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
      >
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative md:flex md:flex-1">
            {step.status === "complete" ? (
              <div className="group flex w-full items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                    <CheckIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-900">
                    {step.name}
                  </span>
                </span>
              </div>
            ) : step.status === "current" ? (
              <div
                className="flex items-center px-6 py-4 text-sm font-medium"
                aria-current="step"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                  <span className="text-indigo-600">{step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-indigo-600">
                  {step.name}
                </span>
              </div>
            ) : (
              <div className="group flex items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                    <span className="text-gray-500 group-hover:text-gray-900">
                      {step.id}
                    </span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                    {step.name}
                  </span>
                </span>
              </div>
            )}
            {stepIdx !== steps.length - 1 ? (
              <>
                <div
                  className="absolute top-0 right-0 hidden h-full w-5 md:block"
                  aria-hidden="true"
                >
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 22 80"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
};
