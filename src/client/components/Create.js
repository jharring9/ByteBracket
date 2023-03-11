import React, { useEffect } from "react";
import { SelectStats } from "./create-flow/SelectStats";
import { Top25 } from "./create-flow/Top25";
import { MakePicks } from "./create-flow/MakePicks";
import { Finalize } from "./create-flow/Finalize";
import { fetchImages, ProgressBar } from "./shared";
import { useDispatch, useSelector } from "react-redux";
import { Review } from "./create-flow/Review";
import { useParams } from "react-router-dom";

export const Create = () => {
  const dispatch = useDispatch();
  const { value: stage } = useSelector((state) => state.createStage);
  const { league } = useParams();

  /**
   * Preload all images.
   */
  useEffect(() => {
    fetchImages(dispatch);
    document.title = "Create Bracket - ByteBracket";
  }, []);

  return (
    <div className="relative overflow-hidden">
      <ProgressBar dispatch={dispatch} />
      {stage === 1 && <SelectStats />}
      {stage === 2 && <Top25 />}
      {stage === 3 && <MakePicks />}
      {stage === 4 && <Review />}
      {stage === 5 && <Finalize league={league} />}
    </div>
  );
};
