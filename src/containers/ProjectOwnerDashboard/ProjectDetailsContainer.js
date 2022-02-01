import "./ProjectOwnerDashboardScreen.scss";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProjectDetailsLoading from "./ProjectDetailsLoading";
import { useWeb3React } from "@web3-react/core";

function ProjectDetailsContainer({ projectOverviewData, projectDisplayID }) {
  useEffect(() => {
    displayProjectDetails();
  }, [projectDisplayID, projectOverviewData]);

  const { chainId } = useWeb3React();
  const [project, setProject] = useState(null);
  const displayProjectDetails = async () => {
    if (projectOverviewData.length > 0) {
      let description = "N/A";
      let currentProject = projectOverviewData[projectDisplayID];
      try {
        const res = await fetch(
          `https://capx-liquid.mypinata.cloud/ipfs/${currentProject.projectDocHash}`
        );
        const desc = await res.json();
        description = desc.description;
      } catch (error) {
        console.log(error);
      }
      setProject({
        projectName: currentProject.projectName,
        tokenTicker: currentProject.projectTokenTicker,
        contractAddress: currentProject.projectTokenAddress,
        projectOwnerAddress: currentProject.projectOwnerAddress,
        projectDescription: description,
      });
    }
  };
  return project ? (
    <section className="projectdetailscontainer">
      <div className="projectdetailscontainer_title">DETAILS</div>
      <hr className="border-dark-200 px-2 h-2"></hr>
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
            {project?.contractAddress}
          </div>
        </div>
        <div className="projectdetailscontainer_innercontainer_detailbox">
          <div className="projectdetailscontainer_innercontainer_detailbox_key">
            CREATOR ADDRESS
          </div>
          <div className="projectdetailscontainer_innercontainer_detailbox_value">
            {project?.projectOwnerAddress}
          </div>
        </div>
        <div className="projectdetailscontainer_innercontainer_detailbox">
          <div className="projectdetailscontainer_innercontainer_detailbox_key">
            PROJECT DESCRIPTION
          </div>
          <div
            className="projectdetailscontainer_innercontainer_detailbox_value projectdetailscontainer_innercontainer_detailbox_value_description"
            dangerouslySetInnerHTML={{ __html: project?.projectDescription }}
          >
          </div>
        </div>
      </div>
    </section>
  ) : (
    <ProjectDetailsLoading />
  );
}

export default ProjectDetailsContainer;
