import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../../translations/i18n";
import CapxLogo from "../../assets/capxliquid-logo.svg";
import BackIcon from "../../assets/previous-cyan.png";
import "./VestingForm.scss";

function VestingForm({InnerForm}) {
  return (
    <div className="vesting_form flex flex-wrap h-screen">
      <Header vesting={true} showSteps={true} />
      <div className="left_div bg-vesting">
        <div className="mx-auto z-50">
          <img
            className="cursor-pointer hidden mx-auto mt-5 tablet:flex h-8 laptop:h-10"
            src={CapxLogo}
            alt="capx logo"
          />
        </div>
      </div>
      <div className="left_div_psuedo" />
      <div className="w-65v bg-dark-400">
        <div className="vesting_container">
          <div className="nav-pane pb-4 flex justify-between pt-4 text-blizzard items-baseline text-caption-3 leading-caption-3 laptop:text-paragraph-2 laptop:leading-paragraph-2">
            <div className={`flex flex-row cursor-pointer items-baseline`}>
              <div>
                <img className="w-3 mr-3 mt-2" src={BackIcon} alt="next icon" />
              </div>
              <div>Back</div>
            </div>
            <div>{1}/4</div>
          </div>
          {InnerForm}
        </div>
      </div>
      <Footer vesting={true} className="bg-transparent w-full" />
    </div>
  );
}

export default VestingForm;
