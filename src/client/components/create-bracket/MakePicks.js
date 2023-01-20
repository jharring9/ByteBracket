import React, { useEffect } from "react";

export const MakePicks = ({ matchups, setStage }) => {
  useEffect(() => {
    window.scrollTo({top: 250, behavior: 'smooth'});
  }, [])

  return (
    <section className="create-future-currency">
      <div className="overlay">
        <div className="container">
          <div className="main-content">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-text text-center">
                  <h3>Make Your Picks</h3>
                  <p>Round of {matchups.length * 2}</p>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <span className="btn-border m-2">
                      <div
                        className="cmn-btn"
                        onClick={() => setStage(2)}
                        style={{ cursor: "pointer" }}
                      >
                        Go Back
                      </div>
                    </span>
                    <span className="btn-border m-2">
                      <div className="cmn-btn" style={{ cursor: "pointer" }}>
                        Complete Bracket
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
