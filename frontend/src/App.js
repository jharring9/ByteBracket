import React, { useState } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { NotFound } from "./NotFound";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Header user={currentUser} />
        <LoginModal />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home user={currentUser} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

const Header = ({ user }) => (
  <header className="header-section">
    <div className="overlay">
      <div className="container">
        <div className="row d-flex header-area">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Link className="navbar-brand" to="index.html">
              <img src="/assets/logo.png" className="logo" alt="logo" />
            </Link>
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar-content"
            >
              <i className="fas fa-bars"></i>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbar-content"
            >
              <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="index.html"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item dropdown main-navbar">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="javascript:void(0)"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    Dashboard
                  </Link>
                  <ul className="dropdown-menu main-menu shadow">
                    <li>
                      <Link className="nav-link" to="dashboard.html">
                        Dashboard
                      </Link>
                    </li>
                    <li className="dropend sub-navbar">
                      <Link
                        to="javascript:void(0)"
                        className="dropdown-item dropdown-toggle"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                      >
                        Setting
                      </Link>
                      <ul className="dropdown-menu sub-menu shadow">
                        <li>
                          <Link
                            className="nav-link"
                            to="personal-details-setting.html"
                          >
                            Personal Details
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="nav-link"
                            to="modify-login-password.html"
                          >
                            Change Password
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown main-navbar">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="javascript:void(0)"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    Sports
                  </Link>
                  <ul className="dropdown-menu main-menu shadow">
                    <li>
                      <Link className="nav-link" to="soccer-bets-2.html">
                        Tennis
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="soccer-bets-1.html">
                        Soccer
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="soccer-bets-2.html">
                        NBA
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown main-navbar">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="javascript:void(0)"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    Currency
                  </Link>
                  <ul className="dropdown-menu main-menu shadow">
                    <li>
                      <Link className="nav-link" to="escrow-bets-fee.html">
                        Escrow Bets Fee
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="currency-bet.html">
                        Currency Bet
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="betting-details.html">
                        Betting Details
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="create-new-currency.html">
                        Create Currency
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown main-navbar">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="javascript:void(0)"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    Pages
                  </Link>
                  <ul className="dropdown-menu main-menu shadow">
                    <li className="dropend sub-navbar">
                      <Link
                        to="javascript:void(0)"
                        className="dropdown-item dropdown-toggle"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                      >
                        Tournaments
                      </Link>
                      <ul className="dropdown-menu sub-menu shadow">
                        <li>
                          <Link className="nav-link" to="tournaments.html">
                            Tournaments
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="nav-link"
                            to="tournaments-details.html"
                          >
                            Tournaments Details
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="dropend sub-navbar">
                      <Link
                        to="javascript:void(0)"
                        className="dropdown-item dropdown-toggle"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                      >
                        Blog
                      </Link>
                      <ul className="dropdown-menu sub-menu shadow">
                        <li>
                          <Link className="nav-link" to="blog.html">
                            Blog
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link" to="blog-details.html">
                            Blog Details
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link className="nav-link" to="affiliate.html">
                        Affiliate
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="faqs.html">
                        Faqs
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="privacy-policy.html">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="terms-conditions.html">
                        Terms Conditions
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="error.html">
                        Error
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="contact.html">
                    Contact
                  </Link>
                </li>
              </ul>

              {user ? (
                <div className="right-area header-action d-flex align-items-center max-un">
                  <button
                    type="button"
                    className="cmn-btn reg"
                    data-bs-toggle="modal"
                    data-bs-target="#loginMod"
                  >
                    {user.name}'s Profile
                  </button>
                </div>
              ) : (
                <div className="right-area header-action d-flex align-items-center max-un">
                  <button
                    type="button"
                    className="login"
                    data-bs-toggle="modal"
                    data-bs-target="#loginMod"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="cmn-btn reg"
                    data-bs-toggle="modal"
                    data-bs-target="#loginMod"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="footer-section">
    <div className="container pt-120">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="newsletter">
            <div className="section-text text-center">
              <h5 className="sub-title">Subscribe to hear from us</h5>
              <h3 className="title">Our Newsletter</h3>
              <p>
                Subscribe to our newsletter to receive the latest news and
                updates
              </p>
            </div>
            <form action="#">
              <div className="form-group d-flex align-items-center">
                <input type="text" placeholder="Enter your email Address" />
                <button>
                  <img src="assets/images/icon/arrow-right-2.png" alt="icon" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-bottom-area pt-120">
        <div className="row">
          <div className="col-xl-12">
            <div className="menu-item">
              <Link to="index.html" className="logo">
                <img src="assets/logo.png" alt="logo" />
              </Link>
              {/*<ul className="footer-link">*/}
              {/*    <li><Link to="contact.html">Contact</Link></li>*/}
              {/*    <li><Link to="terms-conditions.html">Terms of Services</Link></li>*/}
              {/*    <li><Link to="privacy-policy.html">Privacy</Link></li>*/}
              {/*</ul>*/}
            </div>
          </div>
          <div className="col-12">
            <div className="copyright">
              <div className="copy-area">
                <p>
                  {" "}
                  Copyright © <Link to="/">ByteBracket</Link>
                </p>
              </div>
              {/*<div className="social-link d-flex align-items-center">*/}
              {/*    <Link to="javascript:void(0)"><i className="fab fa-facebook-f"></i></Link>*/}
              {/*    <Link to="javascript:void(0)"><i className="fab fa-twitter"></i></Link>*/}
              {/*    <Link to="javascript:void(0)"><i className="fab fa-linkedin-in"></i></Link>*/}
              {/*    <Link to="javascript:void(0)"><i className="fab fa-instagram"></i></Link>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const LoginModal = () => (
  <div className="log-reg">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="modal fade" id="loginMod">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header justify-content-center">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <ul className="nav log-reg-btn justify-content-around">
                  <li className="bottom-area" role="presentation">
                    <button
                      className="nav-link"
                      id="regArea-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#regArea"
                      type="button"
                      role="tab"
                      aria-controls="regArea"
                      aria-selected="false"
                    >
                      SIGN UP
                    </button>
                  </li>
                  <li className="bottom-area" role="presentation">
                    <button
                      className="nav-link active"
                      id="loginArea-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#loginArea"
                      type="button"
                      role="tab"
                      aria-controls="loginArea"
                      aria-selected="true"
                    >
                      LOGIN
                    </button>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="loginArea"
                    role="tabpanel"
                    aria-labelledby="loginArea-tab"
                  >
                    <div className="login-reg-content">
                      <div className="modal-body">
                        <div className="head-area">
                          <h6 className="title">Login With</h6>
                          <div className="social-link d-flex align-items-center">
                            <a href="javascript:void(0)" className="active">
                              <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="javascript:void(0)">
                              <i className="fab fa-twitter"></i>
                            </a>
                            <a href="javascript:void(0)">
                              <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="javascript:void(0)">
                              <i className="fab fa-google"></i>
                            </a>
                          </div>
                        </div>
                        <div className="form-area">
                          <form action="#">
                            <div className="row">
                              <div className="col-12">
                                <div className="single-input">
                                  <label form="logemail">Email</label>
                                  <input
                                    type="text"
                                    id="logemail"
                                    placeholder="Email Address"
                                  />
                                </div>
                                <div className="single-input">
                                  <label form="logpassword">Password</label>
                                  <input
                                    type="text"
                                    id="logpassword"
                                    placeholder="Email Password"
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="remember-me">
                                  <label className="checkbox-single d-flex align-items-center">
                                    <span className="left-area">
                                      <span className="checkbox-area d-flex">
                                        <input
                                          type="checkbox"
                                          // checked="checked"
                                        />
                                        <span className="checkmark"></span>
                                      </span>
                                      <span className="item-title d-flex align-items-center">
                                        <span>Remember Me</span>
                                      </span>
                                    </span>
                                  </label>
                                  <a href="javascript:void(0)">
                                    Forgot Password
                                  </a>
                                </div>
                              </div>
                              <span className="btn-border w-100">
                                <button className="cmn-btn w-100">LOGIN</button>
                              </span>
                            </div>
                          </form>
                          <div className="bottom-area text-center">
                            <p>
                              Not a member?{" "}
                              <a href="javascript:void(0)" className="reg-btn">
                                Register
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="regArea"
                    role="tabpanel"
                    aria-labelledby="regArea-tab"
                  >
                    <div className="login-reg-content regMode">
                      <div className="modal-body">
                        <div className="head-area">
                          <h6 className="title">Register With</h6>
                          <div className="social-link d-flex align-items-center">
                            <a href="javascript:void(0)" className="active">
                              <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="javascript:void(0)">
                              <i className="fab fa-twitter"></i>
                            </a>
                            <a href="javascript:void(0)">
                              <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="javascript:void(0)">
                              <i className="fab fa-google"></i>
                            </a>
                          </div>
                        </div>
                        <div className="form-area">
                          <form action="#">
                            <div className="row">
                              <div className="col-12">
                                <div className="single-input">
                                  <label form="regemail">Email</label>
                                  <input
                                    type="text"
                                    id="regemail"
                                    placeholder="Email Address"
                                  />
                                </div>
                                <div className="single-input">
                                  <label form="regpassword">Password</label>
                                  <input
                                    type="text"
                                    id="regpassword"
                                    placeholder="Account Password"
                                  />
                                </div>
                                <div className="single-input">
                                  <label>Country</label>
                                  <select>
                                    <option value="1">United States</option>
                                    <option value="2">United Kingdom</option>
                                    <option value="3">Canada</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="remember-me">
                                  <a href="javascript:void(0)">
                                    Have a referral code?
                                  </a>
                                </div>
                              </div>
                              <span className="btn-border w-100">
                                <button className="cmn-btn w-100">
                                  SIGN UP
                                </button>
                              </span>
                            </div>
                          </form>
                          <div className="bottom-area text-center">
                            <p>
                              Already have an member?{" "}
                              <a href="javascript:void(0)" className="log-btn">
                                Login
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
