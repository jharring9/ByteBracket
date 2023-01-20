import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectStats } from "./create-bracket/SelectStats";
import { Top25 } from "./create-bracket/Top25";

export const Create = ({ user }) => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(1);
  const [response, setResponse] = useState(null);
  const [state, setState] = useState({
    name: "",
    wl: 5,
    sos: 5,
    ppg: 5,
    oppg: 5,
    fg: 5,
    ft: 5,
    tpm: 5,
    trb: 5,
    ast: 5,
    stlblk: 5,
    to: 5,
    pf: 5,
  });

  /**
   * Send user home if they are not logged in.
   */
  useEffect(() => {
    if (!user) {
      navigate("/home");
    }
  }, [navigate, user]);

  return (
    <React.Fragment>
      <section className="banner-section inner-banner soccer-bets currency-bet create-currency">
        <div className="overlay">
          <div className="shape-area">
            <img
              src="/assets/images/winner-cup.png"
              className="obj-1"
              alt="image"
            />
            <img
              src="/assets/images/coin-5.png"
              className="obj-2"
              alt="image"
            />
            <img
              src="/assets/images/coin-3.png"
              className="obj-3"
              alt="image"
            />
            <img
              src="/assets/images/coin-6.png"
              className="obj-4"
              alt="image"
            />
            <img
              src="/assets/images/bracket.png"
              className="chart-illu"
              alt="image"
            />
          </div>
          <div className="banner-content">
            <div className="container">
              <div className="content-shape">
                <img
                  src="/assets/images/coin-1.png"
                  className="obj-8"
                  alt="image"
                />
                <img
                  src="/assets/images/time-circle.png"
                  className="obj-9"
                  alt="image"
                />
              </div>
              <div className="row">
                <div className="col-lg-9 col-md-10">
                  <div className="main-content">
                    <h1>Create Bracket</h1>
                    <div className="breadcrumb-area">
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb d-flex align-items-center">
                          <li className="breadcrumb-item">Build Bracket</li>
                          <li
                            className="breadcrumb-item active"
                            aria-current="page"
                          >
                            Select Statistics
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {stage === 1 && (
        <SelectStats
          stats={state}
          setStats={setState}
          setStage={setStage}
          setResponse={setResponse}
        />
      )}

      {stage === 2 && (
        <Top25 stats={state} setStage={setStage} response={response} />
      )}
    </React.Fragment>
  );
};
