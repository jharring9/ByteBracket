import React, { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";

export const Create = ({ user }) => {
  let navigate = useNavigate();

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
                    <h1>Create New Bracket</h1>
                    <div className="breadcrumb-area">
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb d-flex align-items-center">
                          <li className="breadcrumb-item">
                            <Link to="/home">Home</Link>
                          </li>
                          <li className="breadcrumb-item">
                            <Link to="/profile">Your Portal</Link>
                          </li>
                          <li
                            className="breadcrumb-item active"
                            aria-current="page"
                          >
                            Create New Bracket
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

      <section className="create-future-currency">
        <div className="overlay">
          <div className="container">
            <div className="main-content">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-text text-center">
                    <h3>Create a Bracket</h3>
                    <p>You can create unlimited brackets.</p>
                  </div>
                  <form action="#">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="single-input">
                          <label for="nickname">
                            Bracket Nickname
                          </label>
                          <input
                            type="text"
                            id="nickname"
                            placeholder="Please create a name for the bracket"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="invite-friends">
                          <div className="row">
                            <div className="col-lg-12">
                              <label className="checkbox-single d-flex align-items-center">
                                <span className="left-area">
                                  <span className="checkbox-area d-flex">
                                    <input type="checkbox" checked="checked" />
                                    <span className="checkmark"></span>
                                  </span>
                                  <span className="item-title d-flex align-items-center">
                                    <span>Invite friends to your bet</span>
                                  </span>
                                </span>
                              </label>
                            </div>
                            <div className="col-lg-6">
                              <div className="single-input">
                                <label for="invited-name">Invited Name</label>
                                <input
                                  type="text"
                                  id="invited-name"
                                  placeholder="Name of the invited person"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="single-input">
                                <label for="invited-email">Invited Email</label>
                                <input
                                  type="text"
                                  id="invited-email"
                                  placeholder="Email of the invited person"
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="single-input">
                                <label for="message">Your message</label>
                                <textarea
                                  id="message"
                                  cols="30"
                                  rows="10"
                                  placeholder="Your message to user"
                                ></textarea>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="single-btn">
                                <button className="cmn-btn">
                                  <i className="fas fa-plus"></i>
                                  Add Another
                                </button>
                                <button className="cmn-btn clear">
                                  <i className="fas fa-trash-alt"></i>
                                  Clear
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="single-input">
                          <label for="bet-amount">Bet Amount</label>
                          <div className="input-items d-flex">
                            <input
                              type="text"
                              id="bet-amount"
                              placeholder="For example: 0.1"
                            />
                            <input
                              type="text"
                              disabled
                              value="Available 1.00 BTC"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input">
                          <label for="currency">Choose The Currency</label>
                          <input
                            type="text"
                            id="currency"
                            placeholder="Select Currency"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input d-grid">
                          <label for="price">
                            In the expiration date, price will be
                          </label>
                          <div className="input-select d-flex">
                            <select>
                              <option>Below</option>
                              <option value="2">Below 1</option>
                              <option value="3">Below 2</option>
                              <option value="4">Below 3</option>
                            </select>
                            <input
                              type="text"
                              id="price"
                              placeholder="write future price"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input">
                          <label for="closing-date">
                            Bet Closing date/Time
                          </label>
                          <input
                            type="text"
                            id="closing-date"
                            placeholder="Choose Closing Date"
                          />
                          <p className="mdr">
                            (No player can join this bet after this date)
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input">
                          <label for="finish-date">
                            Bet Expiration date/Time
                          </label>
                          <input
                            type="text"
                            id="finish-date"
                            placeholder="Choose Finish Date"
                          />
                          <p className="mdr">
                            (Date we select the winner, based on the currency
                            price)
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <span className="btn-border">
                          <a href="javascript:void(0)" className="cmn-btn">
                            Create Currency Bet
                          </a>
                        </span>
                      </div>
                      <div className="col-lg-12">
                        <div className="more-info">
                          <ul>
                            <li>
                              You can cancel any time, as long no one join your
                              bet.
                            </li>
                            <li>Base market is bitcoin</li>
                            <li>
                              Future currency results are based on binance
                              exchange
                            </li>
                          </ul>
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
    </React.Fragment>
  );
};
