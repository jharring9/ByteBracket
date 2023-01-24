import { PieChart } from "react-minimal-pie-chart";
import React, { useState } from "react";
import { ContinueButton, ErrorAlert, XIcon } from "../icons";

export const SelectStats = ({ stats, setStats, setStage, setResponse }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const chartData = [
    { title: "WL%", value: stats.wl, color: "#E38627" },
    { title: "SOS", value: stats.sos, color: "#C13C37" },
    { title: "PPG", value: stats.ppg, color: "#6A2135" },
    { title: "OPPG", value: stats.oppg, color: "#4d195c" },
    { title: "FG%", value: stats.fg, color: "#2e216a" },
    { title: "FTM", value: stats.ft, color: "#253c91" },
    { title: "3PM", value: stats.tpm, color: "#003afa" },
    { title: "TR", value: stats.trb, color: "#2d9b9d" },
    { title: "AST", value: stats.ast, color: "#14bd82" },
    { title: "STL/BLK", value: stats.stlblk, color: "#14bd2b" },
    { title: "TO", value: stats.to, color: "#8dbd14" },
    { title: "PF", value: stats.pf, color: "#bd9b14" },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    let res = await fetch("/v1/lambda", {
      body: JSON.stringify(stats),
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.ok) {
      setResponse(await res.json());
      setStage(2);
    } else {
      setError(JSON.stringify(await res.json()));
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
      <div className="mx-auto mt-4 max-w-7xl px-4 px-6 sm:mt-6 lg:mt-8 lg:grid lg:grid-cols-3 lg:gap-4">
        <div className="order-1">
          <InfoModal
            name="Win-Loss %"
            details="Details"
            value={stats.wl}
            setValue={(val) => setStats({ ...stats, wl: val })}
          />
          <InfoModal
            name="Strength of Schedule"
            details="Details"
            value={stats.sos}
            setValue={(val) => setStats({ ...stats, sos: val })}
          />
          <InfoModal
            name="Points per Game"
            details="Details"
            value={stats.ppg}
            setValue={(val) => setStats({ ...stats, ppg: val })}
          />
          <InfoModal
            name="Opponent Points per Game"
            details="Details"
            value={stats.oppg}
            setValue={(val) => setStats({ ...stats, oppg: val })}
          />
          <InfoModal
            name="Field Goal %"
            details="Details"
            value={stats.fg}
            setValue={(val) => setStats({ ...stats, fg: val })}
          />
          <InfoModal
            name="3-Point Makes"
            details="Details"
            value={stats.tpm}
            setValue={(val) => setStats({ ...stats, tpm: val })}
          />
        </div>
        <div className="md:order-2 lg:order-3">
          <InfoModal
            name="Free Throw Makes"
            details="Details"
            value={stats.ft}
            setValue={(val) => setStats({ ...stats, ft: val })}
          />
          <InfoModal
            name="Total Rebounds"
            details="Details"
            value={stats.trb}
            setValue={(val) => setStats({ ...stats, trb: val })}
          />
          <InfoModal
            name="Assists"
            details="Details"
            value={stats.ast}
            setValue={(val) => setStats({ ...stats, ast: val })}
          />
          <InfoModal
            name="Steals & Blocks"
            details="Details"
            value={stats.stlblk}
            setValue={(val) => setStats({ ...stats, stlblk: val })}
          />
          <InfoModal
            name="Turnovers"
            details="Details"
            value={stats.to}
            setValue={(val) => setStats({ ...stats, to: val })}
          />
          <InfoModal
            name="Personal Fouls"
            details="Details"
            value={stats.pf}
            setValue={(val) => setStats({ ...stats, pf: val })}
          />
        </div>
        <div className="align-middle md:order-3 lg:order-2">
          <PieChart
            style={{ height: "380px" }}
            data={chartData}
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={() => ({
              fill: "black",
              fontSize: "3px",
            })}
            radius={42}
            labelPosition={112}
          />
        </div>
        <div className="order-last">
          <div className="mt-4 flex justify-center lg:mt-2 lg:justify-start">
            <ContinueButton onClick={handleSubmit} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
};

const InfoModal = ({ name, value, setValue, details }) => {
  let [x, setX] = useState(0);
  return (
   <div>
      <label
        htmlFor="minmax-range"
        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {name}
      </label>
      <div className="grid grid-cols-10">
        <div className="col-span-1">
          <button type="button"
                  onClick={() => {
                    setX(value);
                    return setValue(x);}}
                  className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800">
            <svg aria-hidden="true" className="w-3 h-3" fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 352 512">
              <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
            </svg>
          </button>
        </div>
        <div className="col-span-9 flex items-center">
          <input
            id="minmax-range"
            type="range"
            min={0}
            max={10}
            value={value}
            onChange={(val) => setValue(parseInt(val.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-300"
            disabled={x}
          />
         </div>
      </div>
    </div>
  );
};
