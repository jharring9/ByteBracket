import { PieChart } from "react-minimal-pie-chart";
import React, { useState } from "react";
import {
  ContinueButton,
  ErrorAlert,
  DisableStat,
  InfoPopover,
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
    { title: "WL%", value: stats.wl, color: "#ffc300" },
    { title: "SOS", value: stats.sos, color: "#FDDA0D" },
    { title: "PPG", value: stats.ppg, color: "#add45c" },
    { title: "OPPG", value: stats.oppg, color: "#56c785" },
    { title: "FG%", value: stats.fg, color: "#00baad" },
    { title: "FTM", value: stats.ft, color: "#2b7b9b" },
    { title: "3PM", value: stats.tpm, color: "#3e3d6b" },
    { title: "STL/BLK", value: stats.stlblk, color: "#c70039" },
    { title: "TO", value: stats.to, color: "#ff5833" },
    { title: "Big Wins", value: stats.Quad1, color: "#ff8c19" },
  ];

  /**
   * Send stats to Lambda function. Collect top 25 teams and set bracket.
   */
  const handleSubmit = async () => {
    setLoading(true);
    const statObj = {};
    chartData.forEach((stat) => (statObj[stat.title] = stat.value));
    let res = await fetch("/v1/lambda", {
      body: JSON.stringify(statObj),
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.ok) {
      ReactGA.event({
        category: "Bracket",
        action: "Stats Selected",
        label: "Stats Selected",
      });
      const data = await res.json();
      dispatch(setField(data.field));
      dispatch(setTop25(data.top25));
      dispatch(resetBracket());
      dispatch(setCreateStage(2));
    } else {
      setError(
        "There was an error processing your statistics. Please try again later."
      );
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <ErrorAlert
          header="There was an error processing your statistics."
          message={error}
        />
      )}
      <Transition
        show={true}
        appear={true}
        enter="transition ease-out duration-[1000ms]"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        className="mx-auto mt-4 max-w-7xl px-6 sm:mt-6 lg:mt-8 lg:grid lg:grid-cols-3 lg:gap-4"
      >
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
            name="Field Goal %"
            details="The percentage of their shots that go in, or how efficient they are."
            value={stats.fg}
            setValue={(val) => dispatch(setStats({ ...stats, fg: val }))}
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
            name="Steals & Blocks"
            details="The cumulative number of the combined steals and blocks of a team over the season. "
            value={stats.stlblk}
            setValue={(val) => dispatch(setStats({ ...stats, stlblk: val }))}
          />
          <StatSelection
            name="Turnovers"
            details="The cumulative number of turnovers from a team over the course of a season. Placing high importance on this statistic favors teams with fewer turnovers."
            value={stats.to}
            setValue={(val) => dispatch(setStats({ ...stats, to: val }))}
          />
          <StatSelection
            name="Big Wins"
            details="The total number of significant (Quad 1) wins that a team has."
            value={stats.Quad1}
            setValue={(val) => dispatch(setStats({ ...stats, Quad1: val }))}
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
        <div className="order-last">
          <div className="mt-4 flex justify-center lg:mt-2 lg:justify-start">
            <ContinueButton onClick={handleSubmit} loading={loading} />
          </div>
        </div>
      </Transition>
    </>
  );
};

/**
 * Component for selection of individual stat. Includes a slider, a popover, and a disable button.
 */
const StatSelection = ({ name, value, setValue, details }) => {
  const [disabledValue, setDisabledValue] = useState(0);
  return (
    <div className="md:my-3">
      <InfoPopover name={name} details={details} />
      <div className="grid grid-cols-10">
        <div className="col-span-2 md:col-span-1">
          <DisableStat
            value={value}
            disabledValue={disabledValue}
            setValue={setValue}
            setDisabledValue={setDisabledValue}
          />
        </div>
        <div className="col-span-8 flex items-center md:col-span-9">
          <input
            id="minmax-range"
            type="range"
            min={1}
            max={10}
            value={value}
            onChange={(val) => setValue(parseInt(val.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-300"
            disabled={disabledValue !== 0}
          />
        </div>
      </div>
    </div>
  );
};
