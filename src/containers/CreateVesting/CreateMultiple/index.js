import { Switch } from "@material-ui/core";
import React, { useState } from "react";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import TokenModal from "./TokenModal";
import { Link } from "react-router-dom";
import ProjectDropDown from "../../../components/ProjectDropdown/ProjectDropdown";
import "./index.scss";
import useWagmi from "../../../useWagmi";
import WalletModal from "../../../components/Modal/WalletModal/WalletModal";

const CreateMultiple = () => {
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };

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
      <div className="createvesting-wrapper px-3">
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
        <div className="upper-section px-4">
          <div className="left-section">
            <h3>Quick Import</h3>
            <p>
              Autofill your list by uploading a .csv file to save time and
              effort! Please use the demo file to check if your data is
              formatted correctly.
            </p>
            <button>
              <svg width="29.5" height="29.5" viewBox="0 0 29.5 29.5">
                <path
                  d="M4.25,29.5A4.255,4.255,0,0,1,0,25.25v-6a1.25,1.25,0,1,1,2.5,0v6A1.751,1.751,0,0,0,4.25,27h21A1.751,1.751,0,0,0,27,25.25v-6a1.25,1.25,0,1,1,2.5,0v6a4.255,4.255,0,0,1-4.25,4.25Zm10.5-9h-.092l-.023,0h-.007l-.026,0h0l-.028,0h0a1.242,1.242,0,0,1-.233-.057h0l-.025-.009,0,0-.023-.009-.007,0-.021-.009-.009,0-.018-.008-.011-.005-.016-.008-.013-.006-.014-.007-.013-.007-.013-.007-.014-.008-.012-.007-.014-.008-.013-.008-.013-.008-.014-.009-.011-.007-.016-.011-.009-.006-.018-.013-.006,0-.021-.016,0,0a1.258,1.258,0,0,1-.128-.114l-7.491-7.49a1.251,1.251,0,0,1,1.768-1.768L13.5,16.232V1.25a1.25,1.25,0,0,1,2.5,0V16.232l5.366-5.367a1.25,1.25,0,0,1,1.768,1.768l-7.49,7.49a1.257,1.257,0,0,1-.179.152h0l-.024.016,0,0-.024.015h0l-.025.015h0a1.242,1.242,0,0,1-.515.167h0l-.028,0H14.75Z"
                  fill="#fff"
                />
              </svg>
              Example
            </button>
          </div>
          <div className="right-drop">
            <div className="mt-1 flex justify-center px-6 pt-8 pb-9 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-3"
                  viewBox="0 0 35.006 43.258"
                >
                  <path d="M5.126,43.258A5.132,5.132,0,0,1,0,38.132V5.126A5.132,5.132,0,0,1,5.126,0H21.678A1,1,0,0,1,22.2.18l0,0,.012.008.01.007,0,0a1.008,1.008,0,0,1,.106.092L34.709,12.666l.039.04,0,0,.013.015.014.016v0l.029.037h0l.013.017,0,0,.011.015,0,0,.009.013.005.008.007.01.007.011,0,.007.009.015,0,0,.01.019h0a.994.994,0,0,1,.117.421v0c0,.007,0,.014,0,.021s0,.017,0,.025V38.132a5.132,5.132,0,0,1-5.125,5.126ZM2,5.126V38.132a3.129,3.129,0,0,0,3.126,3.126H29.881a3.129,3.129,0,0,0,3.126-3.126V14.378H21.629a1,1,0,0,1-1-1V2H5.126A3.129,3.129,0,0,0,2,5.126Zm20.629,7.252h8.964L22.629,3.414ZM9.252,32.944a1,1,0,1,1,0-2h16.5a1,1,0,1,1,0,2Zm0-8.252a1,1,0,1,1,0-2h16.5a1,1,0,1,1,0,2Zm0-8.251a1,1,0,1,1,0-2h4.126a1,1,0,1,1,0,2Z" />
                </svg>

                <div className="text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Select a CSV file to upload</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop it here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-section px-4">
          <h3 className="bottom-title">Vestings</h3>
          <div className="vestings-table">
            <div class="vestings-table-th">
              <div className="th-col">Currency</div>
              <div className="th-col">Recipient</div>
              <div className="th-col">Source</div>
              <div className="th-col">Start Date</div>
              <div className="th-col">Total Amount</div>
              <div className="th-col">Vesting Schedule</div>
              <div className="th-col"></div>
            </div>
            <div class="vestings-table-td">
              <div className="td-col">
                <TokenModal />
              </div>
              <div className="td-col">
                <input className="recipient-input" placeholder="0x..." />
              </div>
              <div className="td-col">
                <select className="selectsource">
                  <option>Select</option>
                  <option>Wallet</option>
                  <option>BentoBox</option>
                </select>
              </div>
              <div className="td-col">
                <input type="datetime-local" className="start-date" />
              </div>
              <div className="td-col">0.00</div>
              <div className="td-col">
                <div className="vs-edit-col" onClick={handleToggle}>
                  Weekly
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    width="16"
                    height="16"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="td-col">
                <button className="mr-2">
                  <svg
                    viewBox="0 0 20 20"
                    fill="#e74c3c"
                    aria-hidden="true"
                    width="20"
                    height="20"
                    class="text-red"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <button>
                  <svg
                    viewBox="0 0 20 20"
                    fill="#66880f"
                    aria-hidden="true"
                    width="20"
                    height="20"
                    class="text-slate-300"
                  >
                    <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"></path>
                    <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"></path>
                  </svg>
                </button>
              </div>
            </div>
            {isActive ? (
              <div className="expaned-row">
                <div className="flex flex-col flex-grow gap-6 p-6">
                  <div className="flex gap-6 items-center">
                    <div className="form-item flex items-center">
                      <label
                        htmlFor="enable-cliff"
                        className="block text-sm font-medium text-gray-700 mb-0"
                      >
                        Enable Cliff
                      </label>
                      <Switch color="primary" />
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="form-item">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Cliff End Date
                      </label>
                      <input type="datetime-local" className="formfeilds" />
                    </div>
                    <div className="form-item">
                      <label
                        htmlFor="cliff-amount"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Cliff Amount
                      </label>
                      <input className="formfeilds" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-6 md:flex-row">
                    <div className="flex flex-col gap-2">
                      <div className="form-item">
                        <label
                          htmlFor="payout-period"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Payout per Period
                        </label>
                        <input className="formfeilds" placeholder="0.00" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
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
                    <div className="flex flex-col gap-2">
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
                  </div>
                  <div className="col-span-12 sm:col-span-12 lg:col-span-12">
                    <div className="form-item">
                      <label className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <h4>Not Available</h4>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="save-btn">Save</button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="py-3">
            <button
              class="add-items-btn btn font-medium flex items-center justify-center gap-2 rounded-xl cursor-pointer text-blue hover:text-blue-300 px-3 h-[36px] text-sm rounded-lg font-semibold"
              type="button"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                width="16"
                height="16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Add Item
            </button>
          </div>
          <div className="flex justify-end">
            <button className="createvestins-btn">Create Vestings</button>
          </div>
        </div>
      </div>
      <Footer />
    </article>
  ) : (
    <WalletModal modalMode={modalMode} setModalMode={setModalMode} />
  );
};

export default CreateMultiple;
