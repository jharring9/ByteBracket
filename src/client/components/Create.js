import React, { useEffect } from "react";
import { SelectStats } from "./create-flow/SelectStats";
import { Top25 } from "./create-flow/Top25";
import { MakePicks } from "./create-flow/MakePicks";
import { Finalize } from "./create-flow/Finalize";
import { fetchImages, ProgressBar } from "./shared";
import { useDispatch, useSelector } from "react-redux";
import { Review } from "./create-flow/Review";

export const Create = () => {
  const dispatch = useDispatch();
  const { value: stage } = useSelector((state) => state.createStage);

  /**
   * Preload all images.
   */
  useEffect(() => {
    fetchImages(dispatch);
    document.title = "Create Bracket - ByteBracket";
  }, []);

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
        {stage === 4 && <Review />}
        {stage === 5 && <Finalize />}
      </div>
    </div>
  );
};
