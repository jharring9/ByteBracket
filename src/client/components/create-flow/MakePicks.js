import React from "react";
import { BackButton, ContinueButton } from "../icons";

export const MakePicks = ({ setStage }) => {
  const handleBack = () => {
    setStage(2);
  };

  const handleNext = () => {
    setStage(1);
  };

  return (
    <div className="mx-auto mt-4 max-w-7xl px-4 px-6 sm:mt-6 lg:mt-8">
      <div className="lg:col-span-4 lg:flex">
        <div className="mt-4 flex justify-center lg:mt-2 lg:justify-start">
          <BackButton onClick={handleBack} />
        </div>
        <div className="flex justify-center lg:mt-2 lg:justify-start">
          <ContinueButton onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};
