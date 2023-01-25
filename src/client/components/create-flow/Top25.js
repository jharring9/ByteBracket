import React, { useEffect, useState } from "react";
import { BackButton, ContinueButton, TrendingDown, TrendingUp } from "../icons";

export const Top25 = ({ setStage, top25 }) => {
  const [loading, setLoading] = useState(false);
  const [biggestMovers, setBiggestMovers] = useState([]);

  /**
   * Handle user clicking the back button (return to select stats page).
   */
  const handleBack = () => {
    setStage(1);
  };

  /**
   * Handle user clicking the continue button (go to make picks page).
   */
  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setStage(3);
    }, 500);
  };

  /**
   * Smooth scroll to the top of the page when loaded.
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /**
   * Calculate the biggest movers in the top 25.
   */
  useEffect(() => {
    const biggestMovers = top25
      .sort((a, b) => {
        return Math.abs(a.diff) - Math.abs(b.diff);
      })
      .slice(-5)
      .reverse();
    setBiggestMovers(biggestMovers);
  }, [top25]);

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
              {top25.map((row, i) => {
                return (
                  <tr
                    className={
                      i === top25.length - 1
                        ? ""
                        : i % 2 === 0
                        ? "border-b bg-white"
                        : "border-b bg-gray-50"
                    }
                    key={i}
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
                      {row.diff >= 10 && <TrendingUp className="ml-2" />}
                      {row.diff <= -10 && <TrendingDown className="ml-2" />}
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
                    key={i}
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
                      {row.diff > 0 && <TrendingUp className="ml-2" />}
                      {row.diff < 0 && <TrendingDown className="ml-2" />}
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
          <ContinueButton onClick={handleNext} loading={loading} />
        </div>
      </div>
    </div>
  );
};