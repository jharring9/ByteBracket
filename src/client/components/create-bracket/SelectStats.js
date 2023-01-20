import { PieChart } from "react-minimal-pie-chart";
import React, { useState } from "react";
import { Drawer, Slider } from "rsuite";

export const SelectStats = ({ stats, setStats, setStage, setResponse }) => {
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
    let res = await fetch("/v1/lambda", {
      body: JSON.stringify({
        wl: stats.wl,
        sos: stats.sos,
        ppg: stats.ppg,
        oppg: stats.oppg,
        fg: stats.fg,
        ft: stats.ft,
        tpm: stats.tpm,
        trb: stats.trb,
        ast: stats.ast,
        stlblk: stats.stlblk,
        to: stats.to,
        pf: stats.pf,
      }),
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    setResponse(JSON.stringify(data));
    setStage(2);
  };

  return (
    <section className="create-future-currency">
      <div className="overlay">
        <div className="container">
          <div className="main-content">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-text text-center">
                  <h3>Build Your Bracket</h3>
                  <p>Click the title of any statistic for more information.</p>
                </div>
                <form action="#">
                  <div className="row">
                    <div className="col-lg-3">
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
                    <div className="col-lg-6 mt-1">
                      <PieChart
                        style={{ height: "400px" }}
                        data={chartData}
                        label={({ dataEntry }) => dataEntry.title}
                        labelStyle={() => ({
                          fill: "white",
                          fontSize: "3px",
                        })}
                        radius={42}
                        labelPosition={112}
                      />
                    </div>
                    <div className="col-lg-3">
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
                    <div className="col-lg-12">
                      <div className="row justify-content-center mt-1">
                        <span className="btn-border">
                          <div
                            className="cmn-btn"
                            onClick={handleSubmit}
                            style={{ cursor: "pointer" }}
                          >
                            Create Bracket
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoModal = ({ name, value, setValue, details }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="single-input mt-4 mb-4">
        <label style={{ cursor: "pointer" }} onClick={() => setOpen(true)}>
          {name}
        </label>
        <Slider
          defaultValue={5}
          min={0}
          step={1}
          max={10}
          graduated
          progress
          value={value}
          onChange={(value) => setValue(value)}
        />
      </div>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>
            What is the <i>{name}</i> stat?
          </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <p style={{ color: "black" }}>{details}</p>
        </Drawer.Body>
      </Drawer>
    </>
  );
};
