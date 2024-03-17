import { PieChart } from "react-minimal-pie-chart";
import React, { useState } from "react";
import {
  ContinueButton,
  ErrorAlert,
  InfoPopover,
  normalTransition,
} from "../shared";
import { useDispatch, useSelector } from "react-redux";
import { setField, setTop25 } from "../../store/lambdaSlice";
import { resetBracket } from "../../store/bracketSlice";
import { setCreateStage } from "../../store/createStageSlice";
import { setStats } from "../../store/statsSlice";
import { Transition } from "@headlessui/react";
import ReactGA from "react-ga4";

export const SelectStats = () => {
  const dispatch = useDispatch();
  const { values: stats } = useSelector((state) => state.stats);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const chartData = [
    { title: "W-L%", value: stats.wl, color: "#ffc300" },
    { title: "SOS", value: stats.sos, color: "#FDDA0D" },
    { title: "PPG", value: stats.ppg, color: "#add45c" },
    { title: "OPPG", value: stats.oppg, color: "#56c785" },
    { title: "AST", value: stats.ast, color: "#00baad" },
    { title: "3P%", value: stats.tpm, color: "#2b7b9b" },
    { title: "FTM", value: stats.ft, color: "#3e3d6b" },
    { title: "TO", value: stats.to, color: "#c70039" },
    { title: "TOF", value: stats.stlblk, color: "#ff5833" },
    { title: "REB", value: stats.reb, color: "#ff8c19" },
  ];

  /**
   * Send stats to Lambda function. Collect top 25 teams and set bracket.
   */
  const handleSubmit = async () => {
    setLoading(true);
    let res = await fetch("/v1/lambda", {
      body: JSON.stringify({
        "WL%": stats.wl,
        SOS: stats.sos,
        PPG: stats.ppg,
        OPPG: stats.oppg,
        AST: stats.ast,
        "3PM": stats.tpm,
        FTM: stats.ft,
        TO: stats.to,
        "STL/BLK": stats.stlblk,
        REB: stats.reb,
      }),
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.ok) {
      ReactGA.event({ action: "selectstats", category: "bracket" });
      const data = await res.json();
      dispatch(setField(data.field));
      const top25WithDiff = data.top25.map((team) => {
        return {
          ...team,
          diff: team.diff < 0 ? team.diff : `+${team.diff}`,
        };
      });
      dispatch(setTop25(top25WithDiff));
      dispatch(resetBracket());
      dispatch(setCreateStage(2));
    } else {
      setError("This is most likely a server issue. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <Transition
      show={true}
      appear={true}
      enter="transition ease-out duration-[1000ms]"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      className="relative mx-auto"
    >
      <div className="mx-auto mt-4 max-w-max px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-md border border-gray-600 shadow-xl sm:overflow-hidden md:rounded-lg">
          <div className="rounded-md bg-white px-4 py-5 sm:p-6 md:rounded-lg lg:grid lg:grid-cols-3 lg:gap-4">
            <Transition
              show={!!error}
              {...normalTransition}
              className="mx-auto mt-3 max-w-full lg:col-span-3 lg:m-4"
            >
              <ErrorAlert
                header="There was an error processing your statistics."
                message={error}
              />
            </Transition>
            <div className="mx-auto mb-4 max-w-2xl space-y-4 sm:mb-0 lg:col-span-3">
              <h1 className="text-center text-4xl font-bold text-gray-900">
                Build Your Algorithm
              </h1>
              <p className="text-center text-gray-600">
                Choose how important each statistic will be in your algorithm.
                Each team will receive a cumulative grade based on their
                performance within each statistic.
              </p>
            </div>
            <div className="order-1">
              <StatSelection
                name="Win-Loss %"
                details="The ratio of a team’s wins to their losses. Their winning percentage."
                value={stats.wl}
                setValue={(val) => dispatch(setStats({ ...stats, wl: val }))}
              />
              <StatSelection
                name="Strength of Schedule"
                details="Average record of opponents. Quantifies how difficult their schedule has been based on the teams they have played."
                value={stats.sos}
                setValue={(val) => dispatch(setStats({ ...stats, sos: val }))}
              />
              <StatSelection
                name="Points per Game"
                details="The average number of points they score each game, or how good their offense is. "
                value={stats.ppg}
                setValue={(val) => dispatch(setStats({ ...stats, ppg: val }))}
              />
              <StatSelection
                name="Opponent Points per Game"
                details="The average number of points their opponents score per game, or how good their defense is."
                value={stats.oppg}
                setValue={(val) => dispatch(setStats({ ...stats, oppg: val }))}
              />
              <StatSelection
                name="Assists"
                details="A team's assists per game. This statistic is a good indicator of how well a team moves the ball and works together."
                value={stats.ast}
                setValue={(val) => dispatch(setStats({ ...stats, ast: val }))}
              />
            </div>
            <div className="md:order-2 lg:order-3">
              <StatSelection
                name="3-Point %"
                details="The percentage of 3 pointers that a team makes."
                value={stats.tpm}
                setValue={(val) => dispatch(setStats({ ...stats, tpm: val }))}
              />
              <StatSelection
                name="Free Throw Makes"
                details="The number of free throws that a team makes. Accounts both for teams that shoot a lot and for teams make a lot."
                value={stats.ft}
                setValue={(val) => dispatch(setStats({ ...stats, ft: val }))}
              />
              <StatSelection
                name="Turnovers"
                details="The cumulative number of turnovers from a team over the course of a season. Placing high importance on this statistic favors teams with fewer turnovers."
                value={stats.to}
                setValue={(val) => dispatch(setStats({ ...stats, to: val }))}
              />
              <StatSelection
                name="Turnovers Forced"
                details="The cumulative number of the combined steals and blocks per game."
                value={stats.stlblk}
                setValue={(val) =>
                  dispatch(setStats({ ...stats, stlblk: val }))
                }
              />
              <StatSelection
                name="Rebounds"
                details="Rebounds per game. This statistic is a good indicator of how well a team controls the boards."
                value={stats.reb}
                setValue={(val) =>
                  dispatch(setStats({ ...stats, reb: val }))
                }
              />
            </div>
            <div className="align-middle md:order-3 lg:order-2">
              <PieChart
                style={{ height: "380px" }}
                data={chartData}
                label={({ dataEntry }) =>
                  dataEntry.value === 0 ? "" : dataEntry.title
                }
                labelStyle={{
                  fill: "white",
                  fontSize: "3px",
                  fontWeight: "bold",
                  fontfamily: "inter",
                }}
                radius={42}
                labelPosition={80}
                lineWidth={40}
              />
            </div>
            <div className="justify-center lg:order-4 lg:col-span-3 lg:flex">
              <div className="flex justify-center lg:mt-2">
                <ContinueButton loading={loading} onClick={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

/**
 * Component for selection of individual stat. Includes a slider, a popover, and a disable button.
 */
const StatSelection = ({ name, value, setValue, details }) => {
  return (
    <div className="md:my-3">
      <InfoPopover name={name} details={details} />
      <input
        type="range"
        min={0}
        max={10}
        value={value}
        onChange={(val) => setValue(parseInt(val.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-indigo-700"
      />
    </div>
  );
};
