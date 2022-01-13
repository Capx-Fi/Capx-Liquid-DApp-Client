import "./HomeScreen.scss";

import NextIcon from "../../assets/next.svg";
import CapxCoinIllustration from "../../assets/CapxCoinIllustration.png";
import NextBlackIcon from "../../assets/next-black.png";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { useState } from "react";
import ChooseDashboardModal from "../../components/Modal/ChooseDashboardModal/ChooseDashboardModal";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";
function HomeScreen() {
  const { t } = useTranslation();
  const [dashboardModal, setDashboardModal] = useState(false);
  const handleCloseSelectDashboard = () => {
    setDashboardModal(false);
  };
  return (
    <article
      className="homescreen"
      style={{ filter: dashboardModal ? "blur(10px)" : "none" }}
    >
      <Header hiddenNav={true} />
      <ChooseDashboardModal
        dashboardModal={dashboardModal}
        handleCloseSelectDashboard={handleCloseSelectDashboard}
      />
      <section className="homescreen_maincontainer">
        <div className="homescreen_maincontainer_herocontainer">
          <div className="homescreen_maincontainer_herocontainer_cname">
            CAPX LIQUID
          </div>
          <div className="homescreen_maincontainer_herocontainer_title">
            {t("planning_to_launch")}
          </div>
          <div className="homescreen_maincontainer_herocontainer_title">
            {t("planning_to_launch_ico")}
          </div>
          <div className="homescreen_maincontainer_herocontainer_subtitle">
            {t("start_vesting")}
          </div>
          <Link
            to="/vesting"
            className="homescreen_maincontainer_herocontainer_button_text"
          >
            <div className="homescreen_maincontainer_herocontainer_button">
              {t("get_started")}

              <img
                className="homescreen_maincontainer_herocontainer_button_icon"
                src={NextIcon}
                alt="next icon"
              />
            </div>
          </Link>
          <img
            className="homescreen_maincontainer_herocontainer_capxillustration"
            src={CapxCoinIllustration}
            alt="Capx Coin Illustration"
          />
        </div>
        <div className="homescreen_maincontainer_dashboardcontainer">
          <div className="homescreen_maincontainer_dashboardcontainer_text">
            {t("already_vested")}
          </div>
          <div
            onClick={() => {
              setDashboardModal(true);
            }}
            className="homescreen_maincontainer_dashboardcontainer_button"
          >
            <div className="homescreen_maincontainer_dashboardcontainer_button_text">
              DASHBOARD
            </div>
            <img
              className="homescreen_maincontainer_dashboardcontainer_button_icon"
              src={NextBlackIcon}
              alt="next icon"
            />
          </div>
        </div>
      </section>
      <Footer centered />
    </article>
  );
}

export default HomeScreen;
