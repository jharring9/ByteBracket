import React, { useEffect, useState } from "react";
import { SelectStats } from "./create-flow/SelectStats";
import { Top25 } from "./create-flow/Top25";
import { MakePicks } from "./create-flow/MakePicks";
import { Finalize } from "./create-flow/Finalize";
import { ProgressBar } from "./icons";

let steps = [];

export const Create = ({ user }) => {
  const [stage, setStage] = useState(1);
  const [bracket, setBracket] = useState([]);
  const [top25, setTop25] = useState([]);
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

  useEffect(() => {
    steps = [
      { id: "01", name: "Select Stats", stage: 1, status: "current" },
      { id: "02", name: "Your Top 25", stage: 2, status: "upcoming" },
      { id: "03", name: "Make Your Picks", stage: 3, status: "upcoming" },
      { id: "04", name: "Finalize Bracket", stage: 4, status: "upcoming" },
    ];
  }, []);

  /**
   * Update the status of the progress bar steps.
   */
  const updateStage = (newStage) => {
    setStage(newStage);
    switch (newStage) {
      case 1:
        steps[0].status = "current";
        steps[1].status = "upcoming";
        steps[2].status = "upcoming";
        steps[3].status = "upcoming";
        break;
      case 2:
        steps[0].status = "complete";
        steps[1].status = "current";
        steps[2].status = "upcoming";
        steps[3].status = "upcoming";
        break;
      case 3:
        steps[0].status = "complete";
        steps[1].status = "complete";
        steps[2].status = "current";
        steps[3].status = "upcoming";
        break;
      case 4:
        steps[0].status = "complete";
        steps[1].status = "complete";
        steps[2].status = "complete";
        steps[3].status = "current";
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
            setBracket={setBracket}
            setTop25={setTop25}
          />
        )}

        {stage === 2 && <Top25 setStage={updateStage} top25={top25} />}

        {stage === 3 && (
          <MakePicks
            setStage={updateStage}
            bracket={bracket}
            setBracket={setBracket}
          />
        )}

        {stage === 4 && (
          <Finalize
            user={user}
            bracket={bracket}
            stats={state}
            setStage={updateStage}
          />
        )}
      </div>
    </div>
  );
};
