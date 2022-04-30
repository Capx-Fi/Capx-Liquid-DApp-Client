import React from "react";
import Level3CTA from "../../components/CTA/Level3CTA";

import ErrorIcon from "../../assets/errorFilled.png";
import ErrorOutlineIcon from "../../assets/ErrorOutline.svg";

import "./customScrollbar.css";
import "./VestingScreen.scss";

function Errors({ setStep, error, resetUploadData }) {
  return (
    <div className="pt-4 errorDiv w-max-content mx-auto">
      <div className="flex flex-row justify-between items-center mb-5">
        <p className="error_page_title">
          {error.length} {error.length > 1 ? "Errors" : "Error"} Found
        </p>
        <div
          onClick={() => {
            setStep(2);
          }}
          className="desktop:text-paragraph-2 item-center cursor-pointer laptop:text-caption-1 flex flex-row tablet:text-caption-3 text-caption-4 ring-1 ml-8 h-fit-content rounded-lg laptop:rounded-xl  text-error-color-400 font-semibold  ring-error-color-400 px-1.5 py-1.5 tablet:px-2 tablet:py-2 "
        >
          <div className="flex justify-center items-center">
            <img
              alt="error"
              src={ErrorOutlineIcon}
              className="w-3 tablet:w-4 ml-2 desktop:w-6 mr-2 "
            />
          </div>
          <div className="mr-2">Close</div>
        </div>
      </div>

      <div className="bg-dark-300 max-h-35v h-fit-content rounded-xl flex-grow overflow-auto w-full">
        {error.map(function (e) {
          return (
            <>
              <div className="flex flex-row w-full px-4 py-3">
                <div>
                  <img
                    alt="error"
                    src={ErrorIcon}
                    className="w-3 tablet:w-4 desktop:w-5 mr-1 tablet:mr-3 laptop:mr-3 "
                  />
                </div>
                <div
                  className="pl-3 desktop:text-caption-1 laptop:text-caption-1 tablet:text-caption-3 text-caption-4"
                  dangerouslySetInnerHTML={{ __html: e }}
                />
              </div>
              <hr className="border-dark-200  mx-auto"></hr>
            </>
          );
        })}
      </div>
      <hr className="border-dark-200 mt-10 h-2"></hr>
      <div className="flex flex-row-reverse mt-8">
        <Level3CTA
          text="Reupload Vesting Sheet"
          onClick={() => {
            resetUploadData();
            setStep(2);
          }}
        />
      </div>
    </div>
  );
}

export default Errors;
