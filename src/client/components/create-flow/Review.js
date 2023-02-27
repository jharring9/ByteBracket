import React from "react";
import { BackButton, ContinueButton } from "../shared";
import { useDispatch, useSelector } from "react-redux";
import { setCreateStage } from "../../store/createStageSlice";
import { ReadOnlyBracket } from "../bracket-components/ReadOnlyBracket";
import { Transition } from "@headlessui/react";

export const Review = () => {
  const dispatch = useDispatch();
  const { bracket, champion } = useSelector((state) => state.bracket);
  const { value: createStage } = useSelector((state) => state.createStage);

  return (
    <Transition
      show={true}
      appear={true}
      enter="transition ease-out duration-[2000ms]"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      className="relative mx-auto"
    >
      <div className="mx-auto mt-4 max-w-min px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-md border border-gray-600 shadow-xl sm:overflow-hidden md:rounded-lg">
          <div className="rounded-md bg-white px-4 py-5 sm:p-6 md:rounded-lg">
            <div className="mx-auto max-w-xl space-y-4">
              <h1 className="text-center text-center text-3xl font-bold text-gray-900">
                Confirm Your Bracket
              </h1>
              <p className="text-center text-gray-600">
                Please confirm that your bracket is correct. You may go back and
                adjust your picks if you notice any errors.
                <span className="xl:hidden">
                  {" "}
                  Swipe left and right to adjust the bracket view.
                </span>
              </p>
            </div>
            <ReadOnlyBracket regions={bracket} champion={champion} />
            <div className="justify-center lg:flex">
              <div className="mt-4 flex justify-center lg:mt-2 lg:justify-start">
                <BackButton
                  onClick={() => dispatch(setCreateStage(createStage - 1))}
                />
              </div>
              <div className="flex justify-center lg:mt-2 lg:justify-start">
                <ContinueButton
                  onClick={() => dispatch(setCreateStage(createStage + 1))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};
