import React from "react";
import Level3CTA from "../CTA/Level3CTA";
import InputField from "../InputField";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "../../translations/i18n";

import "./newUploadVesting.scss"
import CapxLogo from "../../assets/capxliquid-logo.svg";
import BackIcon from "../../assets/previous-cyan.png";
import UploadIcon from "../../assets/upload.png";

function UploadVesting() {
  return (
    <div className="newUploadVesting flex flex-wrap h-screen">
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
      <div className="w-55v bg-dark-400">
        <div className="vesting_container">
          <div className="nav-pane pb-4 flex justify-between pt-4 text-blizzard items-baseline text-caption-3 leading-caption-3 laptop:text-paragraph-2 laptop:leading-paragraph-2">
            <div className={`flex flex-row cursor-pointer items-baseline`}>
              <div>
                <img className="w-3 mr-3 mt-2" src={BackIcon} alt="next icon" />
              </div>
              <div>Back</div>
            </div>
            <div>{2}/4</div>
          </div>
          <div className="pt-10">
            <p className="font-bold mb-12 leading-heading-1 text-54px">{"Upload Vesting Sheet"}</p>
            <div className="upload-message rounded-2xl pl-6 pr-8 py-4 flex justify-between">
              <div className="p-4 flex flex-col justify-center">
                <img src={UploadIcon} className="my-auto  inline-block" alt="Upload Icon"></img>
              </div>
              <div className="p-4 text-paragraph-2 leading-paragraph-2">
                Drag & Drop your vesting sheet or Browse. Supported file type -
                .xlsx
              </div>
            </div>
            <hr className="border-dark-200 mt-20 h-2" />
            <div className="flex flex-row-reverse mt-8">
              <Level3CTA text="Next" icon={true} />
            </div>
          </div>
        </div>
      </div>
      <Footer vesting={true} className="bg-transparent w-full" />
    </div>
  );
}

export default UploadVesting;
