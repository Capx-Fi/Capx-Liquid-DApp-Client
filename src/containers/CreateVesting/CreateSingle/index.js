import { FormControl, MenuItem, Select, Switch } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import TokenModal from "../TokenModal";
import ProjectDropDown from "../../../components/ProjectDropdown/ProjectDropdown";
import "./index.scss";
import useWagmi from "../../../useWagmi";
import WalletModal from "../../../components/Modal/WalletModal/WalletModal";

const CreateSingle = () => {
  let [num, setNum] = useState(0);
  let incNum = () => {
    if (num < 10) {
      setNum(Number(num) + 1);
    }
  };
  let decNum = () => {
    if (num > 0) {
      setNum(num - 1);
    }
  };
  let handleChange = (e) => {
    setNum(e.target.value);
  };
  const { active } = useWagmi();
  const [modalMode, setModalMode] = useState(0);
  return active ? (
    <article className="m-auto flex">
      <Header />
      <div className="createvesting-wrapper">
        <Link to="/vesting" className="back-link">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            width="24"
            height="24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            ></path>
          </svg>
          Create Vesting
        </Link>
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  General Details
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Furo allows for creating a vested stream <br /> using your
                  BentoBox balance.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6 sm:pt-1">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <TokenModal />
                    </div>

                    <div className="col-span-6">
                      <div className="form-item">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Start Date
                        </label>
                        <input type="datetime-local" className="formfeilds" />
                      </div>
                    </div>

                    <div className="col-span-6">
                      <div className="form-item">
                        <label
                          htmlFor="recipient"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Recipient
                        </label>
                        <input
                          className="formfeilds"
                          placeholder="Address or ENS Name"
                        />
                      </div>
                    </div>

                    <div className="col-span-6">
                      <div className="form-item">
                        <label
                          htmlFor="cfs"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Change Funds Source
                        </label>
                        <div className="fundsource-items">
                          <div className="cards">
                            <input
                              id="betoboxRadio"
                              name="push-notifications"
                              type="radio"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            />
                            <label htmlFor="betoboxRadio">
                              <div className="label-inner bg-grayFill">
                                <p>BentoBox</p>
                                <div>
                                  Available Balance <br /> 0.00
                                </div>
                              </div>
                            </label>
                          </div>
                          <div className="cards">
                            <input
                              id="walletRadio"
                              name="push-notifications"
                              type="radio"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            />
                            <label htmlFor="walletRadio">
                              <div className="label-inner bg-grayFill">
                                <p>Wallet</p>
                                <div>
                                  Available Balance <br /> 0.00
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Cliff details
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Optionally provide cliff details for your vesting
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <div className="form-item">
                        <label
                          htmlFor="enable-cliff"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Enable Cliff
                        </label>
                        <Switch color="primary" />
                      </div>
                    </div>
                    <div className="col-span-6">
                      <div className="form-item">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Cliff End Date
                        </label>
                        <input
                          type="datetime-local"
                          className="formfeilds"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-span-6">
                      <div className="form-item">
                        <label
                          htmlFor="recipient"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Cliff Amount
                        </label>
                        <div className="cliff-amount-col formfeilds" disabled>
                          <input placeholder="0.00" />
                          <div className="bottom-label">Balance</div>
                        </div>
                      </div>
                      <small className="hint-text">
                        cliffAmount must be a `number` type, but the final value
                        was: `NaN` (cast from the value `""`).
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Graded Vesting Details
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Optionally provide graded vesting details
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-12">
                      <div className="form-item">
                        <label
                          htmlFor="enable-cliff"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Payout per Period
                        </label>
                        <input className="formfeilds" placeholder="0.00" />
                        <small className="hint-text">
                          The amount the recipient receives after every period.
                          For a value of and a weekly period length, the user
                          will receive weekly.
                        </small>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <div className="form-item">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Amount of Periods
                        </label>
                        <div class="formfeilds amount-number">
                          <div class="input-group-prepend">
                            <button
                              class="btn btn-outline-primary"
                              type="button"
                              onClick={decNum}
                            >
                              -
                            </button>
                          </div>
                          <input
                            type="text"
                            class="form-control"
                            value={num}
                            onChange={handleChange}
                          />
                          <div class="input-group-prepend">
                            <button
                              class="btn btn-outline-primary"
                              type="button"
                              onClick={incNum}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <div className="form-item">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Period Length
                        </label>
                        {/* <select
                                                    id="country"
                                                    name="country"
                                                    className="formfeilds">
                                                    <option>Weekly</option>
                                                    <option>Bi-weekly</option>
                                                    <option>Monthly</option>
                                                    <option>Quarterly</option>
                                                    <option>Yearly</option>
                                                </select> */}
                        <ProjectDropDown></ProjectDropDown>
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-12 lg:col-span-12">
                      <div className="form-item">
                        <label className="block text-sm font-medium text-gray-700">
                          Total Amount
                        </label>
                        <h4>0.00000</h4>
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-12 lg:col-span-12">
                      <div className="form-item">
                        <label className="block text-sm font-medium text-gray-700">
                          End Date
                        </label>
                        <h4>Not Available</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </article>
  ) : (
    <WalletModal modalMode={modalMode} setModalMode={setModalMode} />
  );
};

export default CreateSingle;
