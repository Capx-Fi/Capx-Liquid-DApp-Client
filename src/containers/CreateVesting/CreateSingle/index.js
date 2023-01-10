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
import Web3 from "web3";
import dayjs from "dayjs";

const periodLengths = [
  { id: 0, projectName: "Weekly", days: 7 },
  { id: 1, projectName: "Bi-Weekly", days: 14 },
  { id: 2, projectName: "Monthly", days: 30 },
  { id: 3, projectName: "Quarterly", days: 91 },
  { id: 4, projectName: "Yearly", days: 365 },
];

const CreateSingle = () => {
  let [num, setNum] = useState(1);
  const { active } = useWagmi();
  const [modalMode, setModalMode] = useState(0);
  const [isCliffEnable, setIsCliffEnable] = useState(false);
  const [periodLength, setPeriodLength] = useState(periodLengths[0].id);
  const [selectedToken, setSelectedToken] = useState(null);
  const [payoutPerPeriod, setPayoutPerPeriod] = useState("");
  const [startDate, setStartDate] = useState(null);

  // all handlers

  const handlePeriodAmount = (type) => {
    if (type === "increment") {
      if (num < 10) {
        setNum(Number(num) + 1);
      }
    } else if (type === "decrement") {
      if (num > 1) {
        setNum(num - 1);
      }
    }
  };

  let handleChange = (e) => {
    setNum(e.target.value);
  };

  const handleCliff = (e) => {
    setIsCliffEnable(e.target.checked);
  };

  const handlePayoutPerPeriod = (e) => {
    console.log(e.target.value);
    const regEx = /^[0-9\b]+$/;
    if (e.target.value === "" || regEx.test(e.target.value)) {
      setPayoutPerPeriod(e.target.value);
    }
  };

  const handleRecipientChange = (e) => {};

  console.log(
    Web3.utils.isAddress("0x9E28b729c1D572F45f3E85239A5f939Ef341590c")
  );

  const handleStartDateChange = (e) => {
    // if (dayjs(new Date()).unix() + 300 <= dayjs(e.target.value).unix()) {

    // }
    setStartDate(e.target.value);
  };

  const daysCalculator = () => {
    const startUnix = dayjs(startDate).unix();
    let calculatedDate;
    periodLengths.forEach((element) => {
      if (element.id === periodLength) {
        calculatedDate = dayjs
          .unix(startUnix + element.days * 1440 * 60)
          .format("DD MMM YYYY, HH:mm A");
        // calculatedDate = startUnix + element.days * 1440 * 60;
        console.log(element.days);
      }
    });
    console.log(startUnix);
    console.log(calculatedDate);
    return calculatedDate;
  };

  console.log(periodLength);

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
                      <TokenModal setSelectedToken={setSelectedToken} />
                    </div>

                    <div className="col-span-6">
                      <div className="form-item">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Start Date*
                        </label>
                        <input
                          type="datetime-local"
                          className="formfeilds"
                          value={startDate}
                          onChange={handleStartDateChange}
                        />
                      </div>
                    </div>

                    <div className="col-span-6">
                      <div className="form-item">
                        <label
                          htmlFor="recipient"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Recipient*
                        </label>
                        <input
                          className="formfeilds"
                          placeholder="Address or ENS Name"
                          onChange={handleRecipientChange}
                        />
                      </div>
                    </div>

                    <div className="col-span-6">
                      <div className="form-item">
                        <label
                          htmlFor="cfs"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Change Funds Source*
                        </label>
                        <div className="fundsource-items">
                          {/* <div className="cards">
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
                          </div> */}
                          <div className="cards">
                            <input
                              id="walletRadio"
                              name="push-notifications"
                              type="radio"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              checked={selectedToken}
                            />
                            <label htmlFor="walletRadio">
                              <div className="label-inner bg-grayFill">
                                <p>Wallet</p>
                                <div>
                                  Available Balance <br />{" "}
                                  {selectedToken?.balance
                                    ? selectedToken?.balance
                                    : "0.00"}
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
                        <Switch
                          color="primary"
                          onChange={handleCliff}
                          checked={isCliffEnable}
                        />
                      </div>
                    </div>
                    {isCliffEnable && (
                      <>
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
                              disabled={!isCliffEnable}
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
                            <div
                              className="cliff-amount-col formfeilds"
                              disabled={!isCliffEnable}
                            >
                              <input placeholder="0.00" />
                              <div className="bottom-label">Balance</div>
                            </div>
                          </div>
                          {/* <small className="hint-text">
                            cliffAmount must be a `number` type, but the final
                            value was: `NaN` (cast from the value `""`).
                          </small> */}
                        </div>
                      </>
                    )}
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
                          Payout per Period*
                        </label>
                        <input
                          className="formfeilds"
                          placeholder="0.00"
                          type="text"
                          value={payoutPerPeriod}
                          onChange={handlePayoutPerPeriod}
                        />
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
                          Amount of Periods*
                        </label>
                        <div class="formfeilds amount-number">
                          <div class="input-group-prepend">
                            <button
                              class="btn btn-outline-primary"
                              type="button"
                              onClick={() => {
                                handlePeriodAmount("decrement");
                              }}
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
                              onClick={() => {
                                handlePeriodAmount("increment");
                              }}
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
                          Period Length*
                        </label>

                        <ProjectDropDown
                          projectOverviewData={periodLengths}
                          projectDisplayID={periodLength}
                          setProjectDisplayID={setPeriodLength}
                        />
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-12 lg:col-span-12">
                      <div className="form-item">
                        <label className="block text-sm font-medium text-gray-700">
                          Total Amount
                        </label>
                        <h4>
                          {payoutPerPeriod
                            ? num !== 0
                              ? payoutPerPeriod * num
                              : payoutPerPeriod
                            : "0.00000"}
                        </h4>
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-12 lg:col-span-12">
                      <div className="form-item">
                        <label className="block text-sm font-medium text-gray-700">
                          End Date
                        </label>
                        <h4>
                          {startDate ? daysCalculator() : "Not Available"}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className=" flex justify-end mt-4">
                    <button class="submit-btn desable-btn text-white font-bold py-2 px-4 rounded">
                      Review Vesting
                    </button>
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
