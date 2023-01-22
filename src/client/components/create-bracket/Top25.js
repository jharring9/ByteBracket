import React from "react";
import { biggestMovers, mockTableData } from "../../index";
import { BackButton, ContinueButton, TrendingDown, TrendingUp } from "../icons";

export const Top25 = ({ setStage }) => {
  const handleBack = () => {
    setStage(1);
  };

  const handleNext = () => {
    setStage(3);
  };

  return (
    <div className="mt-4 sm:mt-6 md:mx-auto md:max-w-7xl md:px-4 md:px-6 lg:mt-8 lg:grid lg:grid-cols-7 lg:gap-4">
      <div className="lg:col-span-5">
        <div className="text-center">
          <h2 className="mb-4 text-2xl sm:mb-5 lg:mb-8">Your Top 25</h2>
        </div>
        <div className="relative col-span-3 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Team
                </th>
                <th scope="col" className="px-6 py-3">
                  Your Rank
                </th>
                <th scope="col" className="px-6 py-3">
                  AP Rank
                </th>
                <th scope="col" className="px-6 py-3">
                  Diff<span className="hidden sm:inline-flex">erence</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {mockTableData.map((row, i) => {
                const stylingData =
                  i % 2 === 0 ? "bg-white border-b" : "border-b bg-gray-50";
                return (
                  <tr
                    className={
                      i === mockTableData.length - 1 ? "" : stylingData
                    }
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {row.team}
                    </th>
                    <td className="px-6 py-4">{row.rank}</td>
                    <td className="px-6 py-4">{row.apRank}</td>
                    <td className="flex px-6 py-4">
                      {row.diff}
                      {row.diff >= 5 && <TrendingUp className="ml-2" />}
                      {row.diff <= -5 && <TrendingDown className="ml-2" />}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 md:mt-0 lg:col-span-2">
        <div className="text-center">
          <h2 className="mb-4 text-2xl sm:mb-5 lg:mb-8">Biggest Movers</h2>
        </div>
        <div className="relative col-span-3 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Team
                </th>
                <th scope="col" className="px-6 py-3">
                  Diff<span className="hidden sm:inline-flex">erence</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {biggestMovers.map((row, i) => {
                const stylingData =
                  i % 2 === 0 ? "bg-white border-b" : "border-b bg-gray-50";
                return (
                  <tr
                    className={
                      i === biggestMovers.length - 1 ? "" : stylingData
                    }
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {row.team}
                    </th>
                    <td className="flex px-6 py-4">
                      {row.diff}
                      {row.diff >= 5 && <TrendingUp className="ml-2" />}
                      {row.diff <= -5 && <TrendingDown className="ml-2" />}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

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
