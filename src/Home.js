import React from "react";
import { Link } from "react-router-dom";

export default function Home({ user }) {
  return (
    <React.Fragment>
      <section className="banner-section">
        <div className="overlay">
          <div className="shape-area">
            <img
              src="/assets/images/clip/icons8-basketball-100.png"
              className="obj-1"
              alt="image"
            />
            <img
              src="/assets/images/winner-cup.png"
              className="obj-2"
              alt="image"
            />
          </div>
          <div className="banner-content">
            <div className="container">
              <div className="content-shape">
                <img
                  src="/assets/images/clip/icons8-soccer-ball-90.png"
                  className="obj-1"
                  alt="image"
                />
                <img
                  src="/assets/images/clip/icons8-soccer-ball-90.png"
                  className="obj-2"
                  alt="image"
                />
                <img
                  src="/assets/images/clip/american-football-helmet--v2.png"
                  className="obj-3"
                  alt="image"
                />
                <img
                  src="/assets/images/clip/icons8-basketball-100.png"
                  className="obj-4"
                  alt="image"
                />
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-10">
                  <div className="main-content">
                    <div className="top-area section-text">
                      <h4 className="sub-title">Create Your Bracket Today!</h4>
                      <h1 className="title">Data-driven sports</h1>
                      <p className="xlr">
                        Create a bracket for any sport. Let the data do the
                        work.
                      </p>
                    </div>
                    <div className="bottom-area">
                      <span className="btn-border">
                        {user ? (
                          <Link to="/profile">
                            <button type="button" className="cmn-btn reg">
                              Your Portal
                            </button>
                          </Link>
                        ) : (
                          <button
                            type="button"
                            className="cmn-btn reg"
                            data-bs-toggle="modal"
                            data-bs-target="#loginMod"
                          >
                            Get Started Now
                          </button>
                        )}
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
                      src="/assets/images/icon/more-features-icon-1.png"
                      alt="image"
                    />
                  </div>
                  <div className="text-area">
                    <h3 className="m-none">
                      <span className="counter">4321</span>
                    </h3>
                    <p>Brackets Created</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div className="single-area d-flex align-items-center">
                  <div className="img-area">
                    <img
                      src="/assets/images/icon/counter-icon-2.png"
                      alt="image"
                    />
                  </div>
                  <div className="text-area">
                    <h3 className="m-none">
                      <span className="counter">81</span>%
                    </h3>
                    <p>Cumulative Win %</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div className="single-area d-flex align-items-center">
                  <div className="img-area">
                    <img
                      src="/assets/images/icon/counter-icon-3.png"
                      alt="image"
                    />
                  </div>
                  <div className="text-area">
                    <h3 className="m-none">
                      <span className="counter">1234</span>
                    </h3>
                    <p>Users Registered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*<section className="about-bytebracket">*/}
      {/*  <div className="overlay pt-120 pb-120">*/}
      {/*    <div className="container">*/}
      {/*      <div className="row d-flex align-items-end">*/}
      {/*        <div className="col-lg-6">*/}
      {/*          <div className="image-area d-rtl left-side">*/}
      {/*            <img src="/assets/images/about-bitbetio-image.png" alt="images" className="max-un"/>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div className="col-lg-6">*/}
      {/*          <div className="section-text">*/}
      {/*            <h5 className="sub-title">A Next-Level Sports Betting</h5>*/}
      {/*            <h2 className="title">A Revolution in Online Betting</h2>*/}
      {/*            <p>Bitbetio is a user-friendly, decentralised, peer-to-peer betting platform.</p>*/}
      {/*          </div>*/}
      {/*          <div className="row cus-mar">*/}
      {/*            <div className="col-sm-6 col-6">*/}
      {/*              <div className="single-item">*/}
      {/*                <img src="/assets/images/icon/about-icon-1.png" alt="images"/>*/}
      {/*                  <h5>Peer-to-peer</h5>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*            <div className="col-sm-6 col-6">*/}
      {/*              <div className="single-item">*/}
      {/*                <img src="/assets/images/icon/about-icon-2.png" alt="images"/>*/}
      {/*                  <h5>No limits</h5>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*            <div className="col-sm-6 col-6">*/}
      {/*              <div className="single-item">*/}
      {/*                <img src="/assets/images/icon/about-icon-3.png" alt="images"/>*/}
      {/*                  <h5>Decentralised</h5>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*            <div className="col-sm-6 col-6">*/}
      {/*              <div className="single-item">*/}
      {/*                <img src="/assets/images/icon/about-icon-4.png" alt="images"/>*/}
      {/*                  <h5>Community-powered</h5>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
      
      {/*<section className="amazing-features">*/}
      {/*  <div className="overlay pt-120">*/}
      {/*    <div className="container">*/}
      {/*      <div className="row justify-content-center">*/}
      {/*        <div className="col-lg-6">*/}
      {/*          <div className="section-header text-center">*/}
      {/*            <h5 className="sub-title">Leading the Crypto bets escrow services</h5>*/}
      {/*            <h2 className="title">An Exhaustive list of Amazing Features</h2>*/}
      {/*            <p>Bitbetio is the most advanced sports crypto beting platform and highest stakes across*/}
      {/*              multiple bookmakers and exchanges.</p>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="features-carousel">*/}
      {/*        <div className="single-slide">*/}
      {/*          <div className="slide-content">*/}
      {/*            <div className="icon-area">*/}
      {/*              <img src="/assets/images/icon/amazing-features-icon-1.png" alt="icon" />*/}
      {/*            </div>*/}
      {/*            <h5>Safety</h5>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div className="single-slide">*/}
      {/*          <div className="slide-content">*/}
      {/*            <div className="icon-area">*/}
      {/*              <img src="/assets/images/icon/amazing-features-icon-2.png" alt="icon" />*/}
      {/*            </div>*/}
      {/*            <h5>Transparency</h5>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div className="single-slide">*/}
      {/*          <div className="slide-content">*/}
      {/*            <div className="icon-area">*/}
      {/*              <img src="/assets/images/icon/amazing-features-icon-3.png" alt="icon" />*/}
      {/*            </div>*/}
      {/*            <h5>Low Commissions</h5>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div className="single-slide">*/}
      {/*          <div className="slide-content">*/}
      {/*            <div className="icon-area">*/}
      {/*              <img src="/assets/images/icon/amazing-features-icon-4.png" alt="icon" />*/}
      {/*            </div>*/}
      {/*            <h5>Player is king</h5>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div className="single-slide">*/}
      {/*          <div className="slide-content">*/}
      {/*            <div className="icon-area">*/}
      {/*              <img src="/assets/images/icon/amazing-features-icon-3.png" alt="icon" />*/}
      {/*            </div>*/}
      {/*            <h5>Low Commissions</h5>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

    </React.Fragment>
  );
}
