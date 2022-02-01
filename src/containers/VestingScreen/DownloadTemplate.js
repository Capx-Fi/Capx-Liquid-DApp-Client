import React from "react";
import Level3CTA from "../../components/CTA/Level3CTA";
import DownloadTemplateBox from "../../components/DownloadTemplateBox";
import { useTranslation } from "react-i18next";
import "./VestingScreen.scss";
import "../../translations/i18n";
function DownloadTemplate({ setStep }) {
  const { t } = useTranslation();
  return (
    <div className="pt-10 laptop:pt-14">
      <p className="vesting_pages_title ">{t("download_vesting_sheet")}</p>
      <p className="text-paragraph-2 leading-paragraph-2 hidden laptop:flex font-normal mb-5 ">
        {t("recommended_sheet_text")}
      </p>
      <DownloadTemplateBox />
      <hr className="border-dark-200 mt-10 h-2"></hr>
      <div className="flex flex-row-reverse mt-8">
        <Level3CTA text="Next" icon={true} onClick={() => setStep(4)} />
      </div>
    </div>
  );
}

export default DownloadTemplate;
