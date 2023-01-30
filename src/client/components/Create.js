import React from "react";
import { SelectStats } from "./create-flow/SelectStats";
import { Top25 } from "./create-flow/Top25";
import { MakePicks } from "./create-flow/MakePicks";
import { Finalize } from "./create-flow/Finalize";
import { ProgressBar } from "./icons";
import { useSelector } from "react-redux";

export const Create = () => {
  const { value: stage } = useSelector((state) => state.createStage);

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
        <ProgressBar />
        {stage === 1 && <SelectStats />}
        {stage === 2 && <Top25 />}
        {stage === 3 && <MakePicks />}
        {stage === 4 && <Finalize />}
      </div>
    </div>
  );
};
