import { Switch } from "antd";
import { useState } from "react";
import ProjectDropDown from "../../../components/ProjectDropdown/ProjectDropdown";
import TokenModal from "../TokenModal";
import "./index.scss";

function TableListItem({ data }) {
  const [isActive, setIsActive] = useState();
  console.log(data, "TableItem");
  const handleToggle = () => {
    setIsActive(!isActive);
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
  return (
    <>
      {data?.Address ? (
        <>
          <div class="vestings-table-td">
            <div className="td-col">
              <TokenModal />
            </div>
            <div className="td-col">
              <input
                className="recipient-input"
                placeholder="0x..."
                value={data?.Address}
              />
            </div>
            <div className="td-col">
              <input type="datetime-local" className="start-date" />
            </div>
            <div className="td-col">0.00</div>
            <div className="td-col">
              <div className="vs-edit-col" onClick={handleToggle}>
                {data?.["Payout Period"]}
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
                      <ProjectDropDown />
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
        </>
      ) : (
        <>
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
                      <ProjectDropDown />
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
        </>
      )}
    </>
  );
}

export default TableListItem;
