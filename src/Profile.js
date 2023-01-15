import React from "react";

export const Profile = () => {
  return (
    <section className="dashboard-content pt-120">
      <div className="overlay">
        <div className="dashboard-heading">
          <div className="container">
            <div className="row justify-content-lg-end justify-content-between">
              <div className="col-xl-9 col-lg-12">
                <ul className="nav" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="dashboard-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#dashboard"
                      type="button"
                      role="tab"
                      aria-controls="dashboard"
                      aria-selected="false"
                    >
                      Your Dashboard
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="withdraw-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#withdraw"
                      type="button"
                      role="tab"
                      aria-controls="withdraw"
                      aria-selected="false"
                    >
                      withdraw
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="buy-crypto-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#buy-crypto"
                      type="button"
                      role="tab"
                      aria-controls="buy-crypto"
                      aria-selected="false"
                    >
                      buy crypto
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="affiliate-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#affiliate"
                      type="button"
                      role="tab"
                      aria-controls="affiliate"
                      aria-selected="false"
                    >
                      affiliate
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="setting-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#setting"
                      type="button"
                      role="tab"
                      aria-controls="setting"
                      aria-selected="true"
                    >
                      Profile
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="dashboard-sidebar">
                <div className="single-item">
                  <h5>Philip Dunn</h5>
                  <p>ID: 32315145</p>
                </div>
                <div className="dashboard-sidebar">
                  <div className="single-item">
                    <img
                      src="/assets/images/icon/dashboard-sidebar-icon-1.png"
                      alt="images"
                    />
                    <h5>$5135.00</h5>
                    <p>Available Balance</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="tab-content">
                <div
                  className="tab-pane fade"
                  id="dashboard"
                  role="tabpanel"
                  aria-labelledby="dashboard-tab"
                >
                  <div className="row">
                    <div className="col-xl-4 col-lg-6">
                      <div className="single-info">
                        <img
                          src="/assets/images/icon/user-info-icon-1.png"
                          alt="icon"
                        />
                        <div className="text-area">
                          <h4>678</h4>
                          <p className="mdr">Total Match</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6">
                      <div className="single-info">
                        <img
                          src="/assets/images/icon/user-info-icon-2.png"
                          alt="icon"
                        />
                        <div className="text-area">
                          <h4>91%</h4>
                          <p className="mdr">Win Ratio</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6">
                      <div className="single-info">
                        <img
                          src="/assets/images/icon/user-info-icon-3.png"
                          alt="icon"
                        />
                        <div className="text-area">
                          <h4>22</h4>
                          <p className="mdr">Achievements</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <h5 className="title">Recent Activity</h5>
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Date/Time</th>
                              <th scope="col">Type</th>
                              <th scope="col">Currency</th>
                              <th scope="col">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">2021-01-07 16:33:53</th>
                              <td>Deposit</td>
                              <td>BTC</td>
                              <td>
                                <img
                                  src="/assets/images/icon/dashboard-coin-icon-1.png"
                                  alt="icon"
                                />
                                0.00016556
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">2021-01-07 16:33:53</th>
                              <td>Withdrawal</td>
                              <td>BTC</td>
                              <td>
                                <img
                                  src="/assets/images/icon/dashboard-coin-icon-1.png"
                                  alt="icon"
                                />
                                0.00016556
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">2021-01-07 16:33:53</th>
                              <td>Refer com.</td>
                              <td>USDT</td>
                              <td>
                                <img
                                  src="/assets/images/icon/dashboard-coin-icon-2.png"
                                  alt="icon"
                                />
                                13.1072000
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">2021-01-07 16:33:53</th>
                              <td>Withdrawal</td>
                              <td>BTC</td>
                              <td>
                                <img
                                  src="/assets/images/icon/dashboard-coin-icon-1.png"
                                  alt="icon"
                                />
                                0.00016556
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">2021-01-07 16:33:53</th>
                              <td>Deposit</td>
                              <td>TRX</td>
                              <td>
                                <img
                                  src="/assets/images/icon/dashboard-coin-icon-3.png"
                                  alt="icon"
                                />
                                368.033428
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">2021-01-07 16:33:53</th>
                              <td>Refer com.</td>
                              <td>BTC</td>
                              <td>
                                <img
                                  src="/assets/images/icon/dashboard-coin-icon-1.png"
                                  alt="icon"
                                />
                                0.00016556
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="withdraw"
                  role="tabpanel"
                  aria-labelledby="withdraw-tab"
                >
                  <div className="deposit-with-tab withdraw">
                    <div className="row">
                      <div className="col-xxl-4 col-xl-5">
                        <div className="balance-area">
                          <div className="head-area d-flex align-items-center justify-content-between">
                            <p className="mdr">Current Balance</p>
                            <select>
                              <option value="1">BTC</option>
                              <option value="2">ETH</option>
                              <option value="3">LTC</option>
                            </select>
                          </div>
                          <h6>
                            0.1018183873 <span>BTC</span>
                          </h6>
                          <p className="mdr">1BTC = 49,345.50 USD</p>
                        </div>
                      </div>
                      <div className="col-xxl-8 col-xl-7">
                        <div className="right-area">
                          <h5>Withdraw BITCOIN</h5>
                          <p className="para-area">
                            You may switch to other currencies in the Left side
                            option.
                          </p>
                          <div className="address-bar">
                            <form action="#">
                              <div className="input-single">
                                <label>Amount</label>
                                <div className="input-area">
                                  <input
                                    type="text"
                                    placeholder="Enter Amount"
                                  />
                                </div>
                              </div>
                              <div className="input-single">
                                <label>Payment Address</label>
                                <div className="input-area">
                                  <input
                                    type="text"
                                    placeholder="Enter Payment Address"
                                  />
                                </div>
                              </div>
                              <span className="btn-border">
                                <a
                                  href="javascript:void(0)"
                                  className="cmn-btn"
                                >
                                  Get Start Now
                                </a>
                              </span>
                            </form>
                          </div>
                          <div className="bottom-area">
                            <div className="single-item">
                              <h6>Transaction fee:</h6>
                              <p>
                                Your withdrawal will also have 0.0006 BTC
                                subtracted to cover the transaction fee.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="buy-crypto"
                  role="tabpanel"
                  aria-labelledby="buy-crypto-tab"
                >
                  <div className="buy-crypto">
                    <div className="row">
                      <div className="col-12">
                        <div className="main-content">
                          <h5>
                            Buy cryptocurrency directly to your Bitbetio Account
                          </h5>
                          <p>
                            Once payment is completed, your cryptocurrency will
                            be available in your Jugaro account within minutes
                          </p>
                          <div className="form-box">
                            <p>
                              1. Choose the crypto you wish to buy, enter the
                              amount, and choose your favorite payment method.
                            </p>
                            <form action="#">
                              <div className="row">
                                <div className="col-6">
                                  <div className="input-single">
                                    <label>Buy</label>
                                    <div className="input-area">
                                      <select>
                                        <option value="1">BTC</option>
                                        <option value="2">ETH</option>
                                        <option value="3">LTC</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="input-single">
                                    <label>Payment Methods</label>
                                    <div className="input-area">
                                      <select>
                                        <option value="1">Visa</option>
                                        <option value="2">Credit</option>
                                        <option value="3">Master</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="input-single">
                                    <label>Amount</label>
                                    <div className="input-select d-flex align-items-center">
                                      <input type="text" placeholder="100" />
                                      <select>
                                        <option value="1">USD</option>
                                        <option value="2">SGD</option>
                                        <option value="3">AUD</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="table-area">
                            <p>
                              2. Choose the best offer from our payment
                              partners, and complete your purchase.
                            </p>
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th scope="col">Channels</th>
                                    <th scope="col">Arrival Time</th>
                                    <th scope="col">You will get</th>
                                    <th scope="col">Rate ( Fee Included)</th>
                                    <th scope="col">Trade</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">
                                      <img
                                        src="/assets/images/icon/buy-crypto-logo-1.png"
                                        alt="icon"
                                      />
                                    </th>
                                    <td>5-15 mins</td>
                                    <td>0.003091 BTC</td>
                                    <td>39254.59 USD</td>
                                    <td>
                                      <a
                                        href="javascript:void(0)"
                                        className="cmn-btn"
                                      >
                                        BUY
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row">
                                      <img
                                        src="/assets/images/icon/buy-crypto-logo-1.png"
                                        alt="icon"
                                      />
                                    </th>
                                    <td>5-15 mins</td>
                                    <td>0.003091 BTC</td>
                                    <td>39254.59 USD</td>
                                    <td>
                                      <a
                                        href="javascript:void(0)"
                                        className="cmn-btn"
                                      >
                                        BUY
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row">
                                      <img
                                        src="/assets/images/icon/buy-crypto-logo-1.png"
                                        alt="icon"
                                      />
                                    </th>
                                    <td>5-15 mins</td>
                                    <td>0.003091 BTC</td>
                                    <td>39254.59 USD</td>
                                    <td>
                                      <a
                                        href="javascript:void(0)"
                                        className="cmn-btn"
                                      >
                                        BUY
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="affiliate"
                  role="tabpanel"
                  aria-labelledby="affiliate-tab"
                >
                  <div className="affiliate-tab">
                    <div className="row">
                      <div className="col-12">
                        <h5>Affiliate Program</h5>
                        <p>
                          Get a lifetime reward up to 15% for inviting new
                          people!
                        </p>
                        <div className="referral-bar">
                          <p>My Referral Link</p>
                          <div className="input-area">
                            <input
                              type="text"
                              value="bc1quxahsy9s7h99q5q4xykmmmh"
                            />
                            <img
                              src="/assets/images/icon/copy-icon.png"
                              alt="icon"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-6">
                            <div className="single-info">
                              <img
                                src="/assets/images/icon/earned-referral-icon-1.png"
                                alt="icon"
                              />
                              <div className="text-area">
                                <h4>$2956.00</h4>
                                <p className="mdr">Earned Referral</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="single-info">
                              <img
                                src="/assets/images/icon/earned-referral-icon-2.png"
                                alt="icon"
                              />
                              <div className="text-area">
                                <h4>$208.00</h4>
                                <p className="mdr">Last Month</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="table-area">
                          <div className="head-area d-flex justify-content-between align-items-center">
                            <h5>Referral History</h5>
                            <div className="input-area d-flex align-items-center">
                              <input
                                type="text"
                                id="dateSelect"
                                placeholder="015/08/2020 - 025/01/2021"
                              />
                              <img
                                src="/assets/images/icon/date-icon.png"
                                className="max-un"
                                alt="icon"
                              />
                            </div>
                          </div>
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">Date</th>
                                  <th scope="col">Level</th>
                                  <th scope="col">Username</th>
                                  <th scope="col">Earned</th>
                                  <th scope="col">E-mail</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">16 APR</th>
                                  <td>Level01</td>
                                  <td>Maxine24</td>
                                  <td>0.00000000BTC</td>
                                  <td>Maxine24@gmail.com</td>
                                </tr>
                                <tr>
                                  <th scope="row">16 APR</th>
                                  <td>Level01</td>
                                  <td>Maxine24</td>
                                  <td>0.00000000BTC</td>
                                  <td>Maxine24@gmail.com</td>
                                </tr>
                                <tr>
                                  <th scope="row">16 APR</th>
                                  <td>Level01</td>
                                  <td>Maxine24</td>
                                  <td>0.00000000BTC</td>
                                  <td>Maxine24@gmail.com</td>
                                </tr>
                                <tr>
                                  <th scope="row">16 APR</th>
                                  <td>Level01</td>
                                  <td>Maxine24</td>
                                  <td>0.00000000BTC</td>
                                  <td>Maxine24@gmail.com</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade show active"
                  id="setting"
                  role="tabpanel"
                  aria-labelledby="setting-tab"
                >
                  <div className="setting-tab">
                    <div className="setting-personal-details">
                      <h5>Your Personal Details</h5>
                      <form action="#">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="single-input">
                              <label htmlFor="perFname">First Name</label>
                              <input
                                type="text"
                                id="perFname"
                                placeholder="Enter First Name"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="single-input">
                              <label htmlFor="perLname">Last Name</label>
                              <input
                                type="text"
                                id="perLname"
                                placeholder="Enter Last Name"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="single-input">
                              <label htmlFor="birth">Date Of Birth</label>
                              <input
                                type="text"
                                id="birth"
                                placeholder="Enter Date Of Birth"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="single-input">
                              <label htmlFor="phone">Phone</label>
                              <input
                                type="text"
                                id="phone"
                                placeholder="Enter Phone Number"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="single-input">
                              <label htmlFor="address">Address</label>
                              <input
                                type="text"
                                id="address"
                                placeholder="Enter Address"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="single-input">
                              <label htmlFor="postalcode">Postal Code</label>
                              <input
                                type="text"
                                id="postalcode"
                                placeholder="Enter Postal Code"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="single-input">
                              <label htmlFor="country">Country</label>
                              <input
                                type="text"
                                id="country"
                                placeholder="Enter Country"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="single-input">
                              <label htmlFor="city">City</label>
                              <input
                                type="text"
                                id="city"
                                placeholder="Enter City"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="single-input">
                              <label htmlFor="state">State</label>
                              <input
                                type="text"
                                id="state"
                                placeholder="Enter State"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="single-input">
                              <label>Select ID Type</label>
                              <select>
                                <option value="1">Passport</option>
                                <option value="2">Nation ID Card</option>
                                <option value="3">Driving License</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6 d-flex align-items-end">
                            <div className="single-input">
                              <div className="file-upload">
                                <div className="right-area">
                                  <label className="file">
                                    <input type="file" />
                                    <span className="file-custom"></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <span className="btn-border">
                              <button className="cmn-btn">
                                Begin Verification
                              </button>
                            </span>
                          </div>
                        </div>
                      </form>
                    </div>
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
