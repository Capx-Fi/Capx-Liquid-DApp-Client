import "./VestingOverview.scss";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import ETHDropIllustration from "../../../assets/ETHDropIllustration.png";
import MetamaskButton from "../../../assets/MetamaskButton.png";
import NextIcon from "../../../assets/next-black.png";
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";
function VestingOverview({ setShowSteps }) {
  const { t } = useTranslation();
  const FirstThreeSteps = [
    `${t("vest_token_step_1")}`,
    `${t("vest_token_step_2")}`,
    `${t("vest_token_step_3")}`,
  ];
  const LastThreeSteps = [
    `${t("vest_token_step_4")}`,
    `${t("vest_token_step_5")}`,
    `${t("vest_token_step_6")}`,
  ];
  return (
    <article className="vestingoverviewscreen">
      <Header hiddenNav />
      <section className="vestingoverviewscreen_maincontainer">
        <div className="vestingoverviewscreen_maincontainer_herocontainer">
          <div className="vestingoverviewscreen_maincontainer_herocontainer_title">
            {t("vest_token_steps")}
          </div>
          <div className="vestingoverviewscreen_maincontainer_herocontainer_stepscontainer">
            <div className="vestingoverviewscreen_maincontainer_herocontainer_stepscontainer_dleft">
              {FirstThreeSteps.map((stepName) => {
                return (
                  <div className="vestingoverviewscreen_maincontainer_herocontainer_stepscontainer_textcontainer">
                    {stepName}
                  </div>
                );
              })}
            </div>
            <div className="vestingoverviewscreen_maincontainer_herocontainer_stepscontainer_dright">
              {LastThreeSteps.map((stepName) => {
                return (
                  <div className="vestingoverviewscreen_maincontainer_herocontainer_stepscontainer_textcontainer">
                    {stepName}
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="vestingoverviewscreen_maincontainer_herocontainer_button"
            onClick={() => setShowSteps(false)}
          >
            <div className="vestingoverviewscreen_maincontainer_herocontainer_button_text">
              {t("begin_vesting")}
            </div>
            <img
              className="vestingoverviewscreen_maincontainer_herocontainer_button_icon"
              src={NextIcon}
              alt="next icon"
            />
          </div>
          <img
            className="vestingoverviewscreen_maincontainer_herocontainer_ethdropillustration"
            src={ETHDropIllustration}
            alt="ETH Illustration"
          />
        </div>
      </section>
      <Footer />
    </article>
  );
}

export default VestingOverview;
