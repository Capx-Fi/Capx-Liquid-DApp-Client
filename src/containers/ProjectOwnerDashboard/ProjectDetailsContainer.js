import "./ProjectOwnerDashboardScreen.scss";

import { useEffect, useState } from "react";
import ProjectDetailsLoading from "./ProjectDetailsLoading";
import Web3 from "web3";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CopyIcon from "../../assets/copy-icon.svg";
import { Tooltip } from "@material-ui/core";
import useWindowSize from "../../utils/windowSize";
import useCapxWalletConnection from "../../useCapxWalletConnection";

const currentDate = new Date();
let datetime = currentDate.toLocaleString("en-US");
const web3 = new Web3(Web3.givenProvider);

function getCheckSumAddress(_address) {
  return web3.utils.toChecksumAddress(_address);
}
function ProjectDetailsContainer({ projectOverviewData, projectDisplayID }) {
  useEffect(() => {
    displayProjectDetails();
  }, [projectDisplayID, projectOverviewData]);

  const [contractAddressCopied, setContractAddressCopied] = useState(false);
  const [creatorAddressCopied, setCreatorAddressCopied] = useState(false);
  const windowWidth = useWindowSize().width;

  const { chainId } = useCapxWalletConnection();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (contractAddressCopied) {
      setTimeout(() => {
        setContractAddressCopied(false);
      }, 2000);
    }
  }, [contractAddressCopied]);

  useEffect(() => {
    if (creatorAddressCopied) {
      setTimeout(() => {
        setCreatorAddressCopied(false);
      }, 2000);
    }
  }, [creatorAddressCopied]);

  const displayProjectDetails = async () => {
    if (projectOverviewData.length > 0) {
      let description = "N/A";
      let currentProject = projectOverviewData[projectDisplayID];
      // console.log("Current Project", currentProject);
      try {
        const res = await fetch(
          `https://capx-liquid.mypinata.cloud/ipfs/${currentProject?.projectDocHash}`
        );
        const desc = await res.json();
        description = desc.description;
      } catch (error) {
        console.log(error);
      }
      setProject({
        projectName: currentProject?.projectName,
        tokenTicker: currentProject?.projectTokenTicker,
        contractAddress: getCheckSumAddress(
          currentProject?.projectTokenAddress
        ),
        projectOwnerAddress: getCheckSumAddress(
          currentProject?.projectOwnerAddress
        ),
        projectDescription: description,
      });
    }
  };
  return project ? (
    <section className="projectdetailscontainer">
      <div className="projectdetailscontainer_title">DETAILS</div>
      <hr className="border-greyborder opacity-50 -mx-6 h-2"></hr>
      <div className="projectdetailscontainer_innercontainer">
        <div className="flex justify-between">
          <div className="projectdetailscontainer_innercontainer_detailbox">
            <div className="projectdetailscontainer_innercontainer_detailbox_key">
              PROJECT NAME
            </div>
            <div className="projectdetailscontainer_innercontainer_detailbox_value">
              {project?.projectName}
            </div>
          </div>
          <div className="projectdetailscontainer_innercontainer_detailbox">
            <div className="projectdetailscontainer_innercontainer_detailbox_key">
              TOKEN TICKER
            </div>
            <div className="projectdetailscontainer_innercontainer_detailbox_value">
              {project?.tokenTicker}
            </div>
          </div>
        </div>
        <div className="projectdetailscontainer_innercontainer_detailbox">
          <div className="projectdetailscontainer_innercontainer_detailbox_key">
            CONTRACT ADDRESS
          </div>
          <div className="projectdetailscontainer_innercontainer_detailbox_value">
            {windowWidth >= 1700
              ? project?.contractAddress
              : `${project?.contractAddress?.substr(
                  0,
                  8
                )}...${project?.contractAddress?.substr(-6)}`}
            <CopyToClipboard
              text={project?.contractAddress}
              onCopy={() => setContractAddressCopied(true)}
            >
              <button className="inline-block">
                <Tooltip
                  title={
                    <span className="text-caption-2 block p-1 font-medium">
                      Copied
                    </span>
                  }
                  open={contractAddressCopied}
                  arrow
                >
                  <img
                    src={CopyIcon}
                    className="w-4 ml-2 -mt-0.5"
                    alt="Copy Icon"
                  />
                </Tooltip>
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <div className="projectdetailscontainer_innercontainer_detailbox">
          <div className="projectdetailscontainer_innercontainer_detailbox_key">
            CREATOR ADDRESS
          </div>
          <div className="projectdetailscontainer_innercontainer_detailbox_value">
            {windowWidth >= 1700
              ? project?.projectOwnerAddress
              : `${project?.projectOwnerAddress?.substr(
                  0,
                  8
                )}...${project?.projectOwnerAddress?.substr(-6)}`}
            <CopyToClipboard
              text={project?.projectOwnerAddress}
              onCopy={() => setCreatorAddressCopied(true)}
            >
              <button className="inline-block">
                <Tooltip
                  title={
                    <span className="text-caption-2 block p-1 font-medium">
                      Copied
                    </span>
                  }
                  open={creatorAddressCopied}
                  arrow
                >
                  <img
                    src={CopyIcon}
                    className="w-4 ml-2 -mt-0.5"
                    alt="Copy Icon"
                  />
                </Tooltip>
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <div className="projectdetailscontainer_innercontainer_detailbox">
          <div className="projectdetailscontainer_innercontainer_detailbox_key">
            PROJECT DESCRIPTION
          </div>
          <div
            className="projectdetailscontainer_innercontainer_detailbox_value projectdetailscontainer_innercontainer_detailbox_value_description"
            dangerouslySetInnerHTML={{ __html: project?.projectDescription }}
          ></div>
        </div>
        <hr className="border-greyborder opacity-50 -mx-6 mt-7 h-2"></hr>
      </div>
    </section>
  ) : (
    <ProjectDetailsLoading />
  );
}

export default ProjectDetailsContainer;
