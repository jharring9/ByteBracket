import React, { useEffect, useState } from "react";
import {
  BackButton,
  ContinueButton,
  TrendingDown,
  TrendingUp,
} from "../shared";
import { useDispatch, useSelector } from "react-redux";
import { setCreateStage } from "../../store/createStageSlice";
import { Transition } from "@headlessui/react";

export const Top25 = () => {
  const dispatch = useDispatch();
  const { top25, logos } = useSelector((state) => state.lambda);
  const [loading, setLoading] = useState(false);
  const [mostOverrated, setMostOverrated] = useState([]);
  const [mostUnderrated, setMostUnderrated] = useState([]);

  /**
   * Handle user clicking the back button (return to select stats page).
   */
  const handleBack = () => {
    dispatch(setCreateStage(1));
  };

  /**
   * Handle user clicking the continue button (go to make picks page).
   */
  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(setCreateStage(3));
    }, 500);
  };

  /**
   * Capture back button event.
   */
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    handleBack();
  };

  /**
   * Smooth scroll to the top of the page when loaded.
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  /**
   * Calculate the biggest movers in the top 25.
   */
  useEffect(() => {
    const mostUnderrated = [...top25]
      .sort((a, b) => {
        return a.diff - b.diff;
      })
      .slice(-3)
      .reverse();
    setMostUnderrated(mostUnderrated);
    const mostOverrated = [...top25]
        .sort((a, b) => {
          return b.diff - a.diff;
        })
        .slice(-3)
        .reverse();
    setMostOverrated(mostOverrated);
  }, [top25]);

  return (
    <Transition
      show={true}
      appear={true}
      enter="transition ease-out duration-[2000ms]"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      className="relative mx-auto"
    >
      <div className="mx-auto mt-4 max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-md border border-gray-600 shadow-xl sm:overflow-hidden md:rounded-lg">
          <div className="rounded-md bg-white px-4 py-5 sm:p-6 md:rounded-lg lg:grid lg:grid-cols-5 lg:gap-4">
            <div className="lg:col-span-3 lg:mr-24">
              <div className="text-center">
                <h1 className="text-3xl font-bold">Your Top 25</h1>
              </div>
              <div className="mt-2 flex flex-col lg:mt-5">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block w-full min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="w-full divide-y divide-gray-300">
                        <thead className="border-b-2 border-gray-500">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-2 pr-2 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Your Rank
                            </th>
                            <th
                              scope="col"
                              className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900 sm:px-3"
                            >
                              Team
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 pl-2 pr-6 text-center text-sm font-semibold text-gray-900 sm:px-3"
                            >
                              AP Rank
                            </th>
                            <th
                              scope="col"
                              className="hidden pl-3 pr-4 text-center text-sm font-semibold text-gray-900 sm:table-cell sm:pr-6"
                            >
                              Difference
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {top25.map((row, index) => (
                            <tr key={row.team}>
                              <td className="whitespace-nowrap py-4 pl-2 pr-3 text-sm sm:pl-6">
                                <div className="flex justify-center">
                                  <h1 className="text-center text-3xl font-bold">
                                    {index + 1}
                                  </h1>
                                </div>
                              </td>
                              <td className="max-w-[200px] whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <div className="w-10 flex-shrink-0">
                                    <img
                                      className="h-auto max-h-16 w-10"
                                      src={logos[row.team]}
                                      alt="team logo"
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-center font-medium text-gray-900">
                                      {row.team}
                                    </div>
                                    <div className="text-gray-500">
                                      {row.W}-{row.L}
                                    </div>
                                  </div>
                                  <div className="ml-2 h-10 w-10 flex-shrink-0">
                                    {row.diff >= 5 && (
                                      <TrendingUp className="h-5 w-5 sm:h-8 sm:w-8" />
                                    )}
                                    {row.diff <= -5 && (
                                      <TrendingDown className="h-5 w-5 sm:h-8 sm:w-8" />
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-2 py-4 text-center text-lg text-gray-500 sm:border-l-2 sm:border-gray-500">
                                {row.apRank}
                              </td>
                              <td className="hidden whitespace-nowrap px-2 py-4 text-center text-lg text-gray-500 sm:table-cell">
                                {row.diff}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 lg:col-span-2 lg:mt-0">
              <div className="text-center">
                <h1 className="text-3xl font-bold"> Most Underrated Teams</h1>
              </div>
              <div className="mt-2 flex flex-col lg:mt-5 pb-16">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="w-full divide-y divide-gray-300">
                        <thead className="border-b-2 border-gray-500">
                          <tr>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Team
                            </th>
                            <th
                              scope="col"
                              className="pl-3 pr-4 text-center text-sm font-semibold text-gray-900 sm:pr-6"
                            >
                              Difference
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {mostUnderrated.map((row) => (
                            <tr key={row.team}>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <div className="w-10 flex-shrink-0">
                                    <img
                                      className="h-auto max-h-16 w-10"
                                      src={logos[row.team]}
                                      alt="team logo"
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-center font-medium text-gray-900">
                                      {row.team}
                                    </div>
                                    <div className="text-gray-500">
                                      {row.W}-{row.L}
                                    </div>
                                  </div>
                                  <div className="ml-2 h-10 w-10 flex-shrink-0">
                                    {row.diff >= 0 && (
                                      <TrendingUp className="h-5 w-5 sm:h-8 sm:w-8" />
                                    )}
                                    {row.diff <= 0 && (
                                      <TrendingDown className="h-5 w-5 sm:h-8 sm:w-8" />
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-2 py-4 text-center text-lg text-gray-500 sm:border-l-2 sm:border-gray-500">
                                {row.diff}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold"> Most Overrated Teams</h1>
              </div>
              <div className="mt-2 flex flex-col lg:mt-5">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="w-full divide-y divide-gray-300">
                        <thead className="border-b-2 border-gray-500">
                        <tr>
                          <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Team
                          </th>
                          <th
                              scope="col"
                              className="pl-3 pr-4 text-center text-sm font-semibold text-gray-900 sm:pr-6"
                          >
                            Difference
                          </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                        {mostOverrated.map((row) => (
                            <tr key={row.team}>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <div className="w-10 flex-shrink-0">
                                    <img
                                        className="h-auto max-h-16 w-10"
                                        src={logos[row.team]}
                                        alt="team logo"
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-center font-medium text-gray-900">
                                      {row.team}
                                    </div>
                                    <div className="text-gray-500">
                                      {row.W}-{row.L}
                                    </div>
                                  </div>
                                  <div className="ml-2 h-10 w-10 flex-shrink-0">
                                    {row.diff >= 0 && (
                                        <TrendingUp className="h-5 w-5 sm:h-8 sm:w-8" />
                                    )}
                                    {row.diff <= 0 && (
                                        <TrendingDown className="h-5 w-5 sm:h-8 sm:w-8" />
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-2 py-4 text-center text-lg text-gray-500 sm:border-l-2 sm:border-gray-500">
                                {row.diff}
                              </td>
                            </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-center lg:col-span-5 lg:flex">
              <div className="mt-4 flex justify-center lg:mt-2 lg:justify-start">
                <BackButton onClick={handleBack} />
              </div>
              <div className="flex justify-center lg:mt-2 lg:justify-start">
                <ContinueButton onClick={handleNext} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};
