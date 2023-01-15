import React from "react";

export default function Home() {
  return (
    <div>
      {/*Banner section - background image in assets/css/style.css*/}
      <section className="banner-section">
        <div className="overlay">
          <div className="shape-area">
            <img src="assets/images/coin-2.png" className="obj-1" alt="image" />
            <img
              src="assets/images/winner-cup.png"
              className="obj-2"
              alt="image"
            />
          </div>
          <div className="banner-content">
            <div className="container">
              <div className="content-shape">
                <img
                  src="assets/images/coin-1.png"
                  className="obj-1"
                  alt="image"
                />
                <img
                  src="assets/images/coin-3.png"
                  className="obj-2"
                  alt="image"
                />
                <img
                  src="assets/images/coin-3.png"
                  className="obj-3"
                  alt="image"
                />
                <img
                  src="assets/images/coin-4.png"
                  className="obj-4"
                  alt="image"
                />
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-10">
                  <div className="main-content">
                    <div className="top-area section-text">
                      <h4 className="sub-title">Bet & Win Today!</h4>
                      <h1 className="title">Sports Escrow Bets Peer 2 Peer</h1>
                      <p className="xlr">
                        The fastest, easiest way to bet on sports. NBA, Tennis &
                        Soccer, Choose on which team to bet and win
                      </p>
                    </div>
                    <div className="bottom-area">
                      <span className="btn-border">
                        <button
                          type="button"
                          className="cmn-btn reg"
                          data-bs-toggle="modal"
                          data-bs-target="#loginMod"
                        >
                          Get Started Now
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="counter-section">
          <div className="container">
            <div className="row cus-mar">
              <div className="col-xl-4 col-md-6">
                <div className="single-area d-flex align-items-center">
                  <div className="img-area">
                    <img
                      src="assets/images/icon/counter-icon-1.png"
                      alt="image"
                    />
                  </div>
                  <div className="text-area">
                    <h3 className="m-none">
                      <span>$</span>
                      <span className="counter">1304,941</span>
                    </h3>
                    <p>Paid Out Prize in Total</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div className="single-area d-flex align-items-center">
                  <div className="img-area">
                    <img
                      src="assets/images/icon/counter-icon-2.png"
                      alt="image"
                    />
                  </div>
                  <div className="text-area">
                    <h3 className="m-none">
                      <span className="counter">76,752</span>
                    </h3>
                    <p>Winners</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div className="single-area d-flex align-items-center">
                  <div className="img-area">
                    <img
                      src="assets/images/icon/counter-icon-3.png"
                      alt="image"
                    />
                  </div>
                  <div className="text-area">
                    <h3 className="m-none">
                      <span className="counter">4,392</span>
                    </h3>
                    <p>Players online</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
