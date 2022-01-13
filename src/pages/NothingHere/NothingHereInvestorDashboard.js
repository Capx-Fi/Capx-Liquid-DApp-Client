import Footer from "../../components/Footer/Footer";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import NothingHereIcon from "../../assets/InvestorEmptyState.svg";
import Header from "../../components/Header/Header";
import ChooseDashboardModal from "../../components/Modal/ChooseDashboardModal/ChooseDashboardModal";
import "./NothingHere.scss";
import Level3CTA from "../../components/CTA/Level3CTA";

import { useHistory } from "react-router";

function NothingHereInvestorDashboard() {
  const { t } = useTranslation();
  const [dashboardModal, setDashboardModal] = useState(false);
  const handleCloseSelectDashboard = () => {
    setDashboardModal(false);
  };
  const history = useHistory();
  return (
    <article
      className="nothinghere"
      style={{ filter: dashboardModal ? "blur(10px)" : "none" }}
    >
      <Header hiddenSwitch={true} />
      <ChooseDashboardModal
        dashboardModal={dashboardModal}
        handleCloseSelectDashboard={handleCloseSelectDashboard}
      />
      <section className="nothinghere_maincontainer">
        <div className="nothinghere_maincontainer_herocontainer">
          <img
            className="nothinghere_maincontainer_herocontainer_notfounfillustration"
            src={NothingHereIcon}
            alt="Nothing Here Illustration"
          />
          <div className="nothinghere_maincontainer_herocontainer_subtitle">
            {t("nothing_here")}
          </div>
          <Level3CTA
            onClick={() => history.push("/vesting")}
            text="Start Vesting Here"
            icon={true}
          />
        </div>
      </section>
      <Footer />
    </article>
  );
}

export default NothingHereInvestorDashboard;
