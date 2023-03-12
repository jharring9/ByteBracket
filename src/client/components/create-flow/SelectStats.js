import { PieChart } from "react-minimal-pie-chart";
import React, { Fragment, useRef, useState } from "react";
import {
  ContinueButton,
  ErrorAlert,
  DisableStat,
  InfoPopover,
  normalTransition,
} from "../shared";
import { useDispatch, useSelector } from "react-redux";
import { setField, setTop25 } from "../../store/lambdaSlice";
import { resetBracket } from "../../store/bracketSlice";
import { setCreateStage } from "../../store/createStageSlice";
import { setStats } from "../../store/statsSlice";
import { Dialog, Transition } from "@headlessui/react";
import ReactGA from "react-ga4";
import { LinkIcon } from "@heroicons/react/20/solid";

export const SelectStats = () => {
  const dispatch = useDispatch();
  const { values: stats } = useSelector((state) => state.stats);
  const [celebModal, setCelebModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const chartData = [
    { title: "W-L%", value: stats.wl, color: "#ffc300" },
    { title: "SOS", value: stats.sos, color: "#FDDA0D" },
    { title: "PPG", value: stats.ppg, color: "#add45c" },
    { title: "OPPG", value: stats.oppg, color: "#56c785" },
    { title: "Big Wins", value: stats.Quad1, color: "#00baad" },
    { title: "3P%", value: stats.tpm, color: "#2b7b9b" },
    { title: "FTM", value: stats.ft, color: "#3e3d6b" },
    { title: "TO", value: stats.to, color: "#c70039" },
    { title: "TOF", value: stats.stlblk, color: "#ff5833" },
    { title: "KenPom Eff", value: stats.kenpom, color: "#ff8c19" },
  ];

  const celebStats = {
    "ByteBracket Recommendations": {
      wl: 10,
      sos: 10,
      ppg: 3,
      oppg: 3,
      ft: 5,
      tpm: 6,
      stlblk: 2,
      to: 1,
      Quad1: 9,
      kenpom: 10,
    },
    "Snapback Jack": {
      wl: 3,
      sos: 8,
      ppg: 6,
      oppg: 8,
      ft: 6,
      tpm: 5,
      stlblk: 5,
      to: 7,
      Quad1: 9,
      kenpom: 8,
    },
  };

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
        Quad1: stats.Quad1,
        "3PM": stats.tpm,
        FTM: stats.ft,
        TO: stats.to,
        "STL/BLK": stats.stlblk,
        "kenpom": stats.kenpom,
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

  const handleCelebStats = (stats) => {
    dispatch(setStats(stats));
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
      <CelebModal
        statList={celebStats}
        setStats={handleCelebStats}
        isOpen={celebModal}
        setOpen={setCelebModal}
      />
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
              <h1 className="text-center text-center text-4xl font-bold text-gray-900">
                Build Your Algorithm
              </h1>
              <p className="text-center text-gray-600">
                Choose how important each statistic will be in your algorithm.
                Each team will receive a cumulative grade based on their
                performance within each statistic.
              </p>
              <div className="flex justify-center">
                <button
                  className="m-2 h-10 w-full rounded-lg border border-black bg-gray-300 px-5 font-medium text-black shadow-xl transition-colors duration-150 hover:bg-gray-400 lg:w-auto"
                  onClick={() => setCelebModal(true)}
                >
                  <span className="w-24">Autofill Weights</span>
                </button>
              </div>
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
                name="Big Wins"
                details="The total number of significant (Quad 1) wins that a team has."
                value={stats.Quad1}
                setValue={(val) => dispatch(setStats({ ...stats, Quad1: val }))}
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
                details="The cumulative number of the combined steals and blocks of a team over the season."
                value={stats.stlblk}
                setValue={(val) =>
                  dispatch(setStats({ ...stats, stlblk: val }))
                }
              />
              <StatSelection
                name="Advanced: KenPom Efficiency"
                details="Ken Pomeroy adjusted efficiency margin, a combination of how efficient a team's offense and defense is."
                value={stats.kenpom}
                setValue={(val) =>
                  dispatch(setStats({ ...stats, kenpom: val }))
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
            type="range"
            min={1}
            max={10}
            value={value}
            onChange={(val) => setValue(parseInt(val.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-indigo-700"
            disabled={disabledValue !== 0}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Modal to select celeb statistics.
 */
const CelebModal = ({ statList, setStats, isOpen, setOpen }) => {
  const [templateName, setTemplateName] = useState(Object.keys(statList)[0]);
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500 sm:mx-0 sm:h-10 sm:w-10">
                    <LinkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Select Statistics Template
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Copy a premade set of statistic weights for your
                        bracket.
                      </p>
                    </div>
                    <select
                      id="template"
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                      className="mt-2 block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-700 focus:ring-indigo-700"
                    >
                      {Object.keys(statList).map((name) => (
                        <option value={name}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setStats(statList[templateName]);
                      setOpen(false);
                    }}
                  >
                    Autofill
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
