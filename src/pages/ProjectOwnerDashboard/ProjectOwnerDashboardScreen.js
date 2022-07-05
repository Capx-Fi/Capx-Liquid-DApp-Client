import "./ProjectOwnerDashboardScreen.scss";

import NextIcon from "../../assets/next.svg";
import CapxCoinIllustration from "../../assets/CapxCoinIllustration.png";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import OwnedProjectToken from "../../assets/OwnedProjectToken.svg";
import Redirect from "../../assets/Redirect.svg";
import ProjectDetailsContainer from "../../containers/ProjectOwnerDashboard/ProjectDetailsContainer";
import TokensReleasedGraphContainer from "../../containers/ProjectOwnerDashboard/TokensReleasedGraphContainer";
import AllocationTableContainer from "../../containers/ProjectOwnerDashboard/AllocationTableContainer";
import ProjectDropDown from "../../components/ProjectDropdown/ProjectDropdown";

import MetamaskModal from "../../components/Modal/MetamaskModal/MetamaskModal";
import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";

import { useEffect, useState } from "react";
import { fetchProjectDetails } from "../../utils/fetchProjectDetails";
import { fetchOwnerID } from "../../utils/fetchOwnerID";
// import { fetchInvestorID } from "../../utils/fetchVestedInvestorID";
import { fetchWrappedInvestorID } from "../../utils/fetchWrappedInvestorID";
import { fetchVestedInvestorID } from "../../utils/fetchVestedInvestorID";
import ProjectDetailsLoading from "../../containers/ProjectOwnerDashboard/ProjectDetailsLoading";
import TokensReleasedGraphLoading from "../../containers/ProjectOwnerDashboard/TokenReleaseGraphLoading";
import { fetchAcalaProjectDashboard } from "../../utils/acalaEVM/fetchProjectDashboard";

import LoadingScreen from "../../containers/LoadingScreen";
import WalletModal from "../../components/Modal/WalletModal/WalletModal";

import NothingHereProjectOwner from "../NothingHere/NothingHereProjectOwner";
import { fetchVestedProjectDetails } from "../../utils/fetchVestedProjectDetails";
import { fetchWrappedProjectDetails } from "../../utils/fetchWrappedProjectDetails";
import { getGraphURL } from "../../constants/getChainConfig";
import { ACALA_CHAIN_ID } from "../../constants/config";
import { Dropdown } from "antd";
import useWagmi from "../../useWagmi";
import { fetchProjectOverviewDetails } from "../../utils/graphFetch/fetchProjectOverviewDetails";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function ProjectOwnerDashboardScreen() {
  const { active, account, chainId } = useWagmi();
  const [modalMode, setModalMode] = useState(0);
  const [projectDisplayID, setProjectDisplayID] = useState(0);
  const [projectOverviewData, setProjectOverviewData] = useState(null);
  const [wrappedProjectData, setWrappedProjectData] = useState([]);
  const [vestedProjectData, setVestedProjectData] = useState([]);

  const graphURL = chainId && getGraphURL(chainId);
  useEffect(() => {
    setProjectOverviewData(null);
    loadProjectData();
  }, [account, chainId]);

  const loadProjectData = async () => {
    if (account) {
      if (chainId === parseInt(ACALA_CHAIN_ID)) {
        const [projectOwnerData, wrappedProjectDetails, vestedProjectDetails] =
          await fetchAcalaProjectDashboard(account, graphURL);
        setProjectOverviewData(projectOwnerData);
        setWrappedProjectData(wrappedProjectDetails);
        setVestedProjectData(vestedProjectDetails);
      } else {
        const [projectOwnerData, wrappedProjectDetails, vestedProjectDetails] =
          await fetchProjectOverviewDetails(account, graphURL);
        setProjectOverviewData(projectOwnerData);
        setWrappedProjectData(wrappedProjectDetails);
        setVestedProjectData(vestedProjectDetails);
      }
    }
  };

  return (
    <>
      {!active ? (
        <WalletModal modalMode={modalMode} setModalMode={setModalMode} />
      ) : /*  !projectOverviewData ? (
        <LoadingScreen />
      ) : */ projectOverviewData?.length === 0 ? (
        <NothingHereProjectOwner />
      ) : (
        <article className="projectownerdashboardscreen">
          <Header hiddenSwitch={true} />
          <section className="projectownerdashboardscreen_maincontainer">
            <div className="projectownerdashboardscreen_maincontainer_titlecontainer">
              <div className="projectownerdashboardscreen_maincontainer_titlecontainer_title">
                {window.innerWidth > 1279
                  ? "PROJECT OVERVIEW DASHBOARD"
                  : "PROJECT OVERVIEW"}
              </div>
              <ProjectDropDown
                className="projectownerdashboardscreen_maincontainer_titlecontainer_projectsdropdown"
                name="selectList"
                id="selectList"
                projectOverviewData={
                  projectOverviewData ? projectOverviewData : []
                }
                projectDisplayID={projectDisplayID}
                setProjectDisplayID={setProjectDisplayID}
              ></ProjectDropDown>
            </div>
            <div className="projectownerdashboardscreen_maincontainer_innercontainer">
              <div className="projectownerdashboardscreen_maincontainer_topcontainer">
                {projectOverviewData ? (
                  <ProjectDetailsContainer
                    projectOverviewData={projectOverviewData}
                    projectDisplayID={projectDisplayID}
                  />
                ) : (
                  <ProjectDetailsLoading />
                )}
                {projectOverviewData ? (
                  <TokensReleasedGraphContainer
                    projectOverviewData={projectOverviewData}
                    projectDisplayID={projectDisplayID}
                    wrappedProjectData={wrappedProjectData}
                    vestedProjectData={vestedProjectData}
                  />
                ) : (
                  <TokensReleasedGraphLoading />
                )}
              </div>
              <div className="projectownerdashboardscreen_maincontainer_bottomcontainer">
                <AllocationTableContainer
                  projectOverviewData={
                    projectOverviewData ? projectOverviewData : []
                  }
                  projectDisplayID={projectDisplayID}
                  wrappedProjectData={wrappedProjectData}
                  vestedProjectData={vestedProjectData}
                />
              </div>
            </div>
          </section>
          <Footer />
        </article>
      )}
    </>
  );
}

export default ProjectOwnerDashboardScreen;
