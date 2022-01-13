import React from "react";
import Level3CTA from "../../components/CTA/Level3CTA";
import { totalVested } from "../../utils/totalVested";
import { convertToInternationalCurrencySystem } from "../../utils/convertToInternationalCurrencySystem";

import "./customScrollbar.css";
import ReviewTableContainer from "./ReviewTableContainer";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";
import "./VestingScreen.scss";

function Review({
  setStep,
  vestingArray,
  tokenTicker,
  setVestingDataSellable,
  setVestingDataWrapped,

}) {
  const { t } = useTranslation();
  return (
    <div className="pt-10 reviewDiv">
      <div className="flex flex-row justify-between items-center">
        <p className="vesting_pages_title">{t("review")}</p>
        <div className="desktop:text-paragraph-2 flex flex-col tablet:flex-row justify-center items-center laptop:text-caption-1 tablet:text-caption-3 text-caption-4 font-normal mb-3">
          <p className="w-full text-right tablet:mr-4 tablet:text-center tablet:w-fit-content">{t("total_amount")}</p>
          <div className="tablet:ring-1 ml-3 h-fit-content rounded-lg laptop:rounded-xl desktop:text-paragraph-2 flex flex-row laptop:text-caption-1 tablet:text-caption-3 text-caption-4 text-primary-green-300 font-semibold  tablet:ring-primary-green-300 tablet:px-4 py-2">
            {convertToInternationalCurrencySystem(totalVested(vestingArray))} {tokenTicker}
          </div>
        </div>
      </div>

      <div className="bg-dark-300  h-fit-content rounded-xl flex-grow overflow-auto w-full">
        <ReviewTableContainer
          reviewData={vestingArray}
          setVestingDataSellable={setVestingDataSellable}
          setVestingDataWrapped={setVestingDataWrapped}
        />
      </div>
      <hr className="border-dark-200 mt-10 h-2"></hr>
      <div className="flex flex-row-reverse mt-8">
        <Level3CTA text="Next" icon={true} onClick={() => setStep(6)} />
      </div>
    </div>
  );
}

export default Review;