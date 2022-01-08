import Footer from "../../components/Footer/Footer";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import NotFound from "../../assets/404.svg";
import NextIcon from "../../assets/next.svg";
import Header from "../../components/Header/Header";
import ChooseDashboardModal from "../../components/Modal/ChooseDashboardModal/ChooseDashboardModal";
import "./PageNotFound.scss";
import Level3CTA from "../../components/CTA/Level3CTA";

import { useHistory } from "react-router";

function PageNotFound() {
  const { t } = useTranslation();
  const [dashboardModal, setDashboardModal] = useState(false);
  const handleCloseSelectDashboard = () => {
    setDashboardModal(false);
  };
  const history = useHistory();
  return (
    <article
      className="pagenotfound"
      style={{ filter: dashboardModal ? "blur(10px)" : "none" }}
    >
      <Header hiddenSwitch={true} />
      <ChooseDashboardModal
        dashboardModal={dashboardModal}
        handleCloseSelectDashboard={handleCloseSelectDashboard}
      />
      <section className="pagenotfound_maincontainer">
        <div className="pagenotfound_maincontainer_herocontainer">
          <img
            className="pagenotfound_maincontainer_herocontainer_notfounfillustration"
            src={NotFound}
            alt="Not Found Illustration"
          />
          <div className="pagenotfound_maincontainer_herocontainer_subtitle">
            {t("page_not_found")}
          </div>
          <Level3CTA
            onClick={() => history.push("/")}
            text="Go To Homepage"
            icon={true}
          />
        </div>
      </section>
      <Footer />
    </article>
  );
}

export default PageNotFound;
