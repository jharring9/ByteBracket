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
    </React.Fragment>
  );
}
