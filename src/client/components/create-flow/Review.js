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
      <h1 className="mt-4 text-center text-3xl text-gray-900 lg:mt-6">
        Confirm Your Picks
      </h1>
      <p className="mt-4 text-center text-lg text-gray-900 lg:mt-6 xl:hidden">
        Swipe left or right to move the bracket.
      </p>
      <div className="mx-auto mt-2 max-w-max px-4 pb-6 sm:px-6 lg:mt-4 lg:px-8">
        <div className="rounded-md shadow sm:overflow-hidden md:rounded-lg">
          <div className="space-y-6 bg-gray-200 px-4 py-5 sm:p-6">
            <ReadOnlyBracket regions={bracket} champion={champion} />
          </div>
          <div className="bg-gray-50 py-3 text-right sm:px-8">
            <div className="justify-center lg:col-span-4 lg:flex ">
              <div className="mt-4 flex justify-center lg:mt-2">
                <BackButton
                  onClick={() => dispatch(setCreateStage(createStage - 1))}
                />
              </div>
              <div className="flex justify-center lg:mt-2">
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
